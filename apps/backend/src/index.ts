import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  BrandWords,
  CommunityMessage,
  HowAmIPhrase,
  MentalEnergy,
  Module,
  Place,
  Resolvers,
  User,
} from "@wellbeing/graphql-types";
import express from "express";

import cors from "cors";
import { json } from "body-parser";

import AuthRouter from "./auth";
import { verifyJwt } from "./util/jwt";
import { GraphQLError } from "graphql";
import { prisma } from "./prisma";
import winston from "winston";
import {
  createGeneralTestData,
  nukeDatabase,
  createUserProfile,
} from "./util/createTestData";

const file = fs.readFileSync(
  path.join(__dirname, "../../../packages/graphql/schema.graphql"),
  "utf8"
);

interface Context {
  uuid: string;
}

function timestamp(date: Date): number {
  return Math.floor(new Date(date).getTime());
}

const resolvers: Resolvers<Context> = {
  Query: {
    async howAmIPhrase(): Promise<Array<HowAmIPhrase>> {
      const phrases = await prisma.howAmIPhrase.findMany();

      return phrases.map((w) => ({
        id: w.id,
        phrase: w.phrase,
      }));
    },

    async brandWords(): Promise<Array<BrandWords>> {
      return await prisma.brandWords.findMany();
    },

    async modules(): Promise<Array<Module>> {
      const modules = await prisma.modules.findMany({});

      return modules;
    },

    async currentUser(_parent, _args, context): Promise<User> {
      const user = await prisma.users.findUnique({
        where: {
          id: context.uuid,
        },
        include: {
          mental_energy: true,
          how_am_i_phrases: {
            include: {
              phrase: true,
            },
          },
          brands: {
            include: {
              brand_word_entries: {
                include: {
                  brand_word: true,
                },
              },
            },
            orderBy: {
              date_saved: "asc",
            }
          },
          user_modules: {
            include: {
              module: true,
              assignments: true,
            },
          },
          user_skills: true,
        },
      });

      if (!user) {
        throw new Error("Context user not found");
      }


      const returnUser: User = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        brands: user.brands.map((b) => ({
          id: b.id,
          name: b.name,
          date: b.date_saved ? timestamp(b.date_saved) : null,
          words: b.brand_word_entries.map((w) => ({
            id: w.id,
            word: w.brand_word.word,
          })),
        })),
        mentalEnergy: user.mental_energy.map((m) => ({
          date: timestamp(m.date),
          level: m.level,
        })),
        howAmIPhrase: user.how_am_i_phrases.map((w) => ({
          date: timestamp(w.date_added),
          phrase: w.phrase,
        })),
        modules: user.user_modules.map((m) => ({
          module: {
            id: m.module.id,
            name: m.module.name,
            year: m.module.year,
          },
          assignments: m.assignments.map((a) => ({
            name: a.name,
            date: a.date.getTime(),
            score: a.score,
            percent: a.percent,
          })),
        })),
        skills: user.user_skills.map((s) => ({
          id: s.id,
          skill: s.skill,
        })),
      };

      return returnUser;
    },

    async places(): Promise<Array<Place>> {
      const places = await prisma.place.findMany({
        include: {
          messages: {
            include: {
              replyTo: true,
              user: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
        }
      });
    
      return places.map((p) => ({
        id: p.id,
        name: p.name,
        latitude: p.latitude,
        longitude: p.longitude,
      }));
    },
    async CommunityMessage(_parent, { placeId }): Promise<Array<CommunityMessage>> {
      const place = await prisma.place.findFirst({
        where: {
          id: placeId,
        },
        include: {
          messages: {
            include: {
              replyTo: true,
              user: {
                select: {
                  first_name: true,
                  last_name: true,
                  id: true,
                },
              }
            },
            take: 200, // capped at 200 of the most recent messages
            orderBy: {
              date: "desc",
            }
          },
        },
      });

      if(!place) {
        throw new Error("Place not found in CommunityMessage query");
      }

      return place?.messages.map((m) => ({
        id: m.id,
        userId: m.userId,
        first_name: m.user.first_name,
        last_name: m.user.last_name,
        message: m.message,
        date: m.date.getTime(),
      }));
    }
  },

  Mutation: {
    async addMentalEnergy(_parent, { level }, context): Promise<MentalEnergy> {
      if (level < 0 || level > 1) {
        throw GetBadValueError();
      }

      const mentalEnergy = await prisma.mentalEnergy.create({
        data: {
          level,
          user_id: context.uuid,
        },
      });

      return {
        level: mentalEnergy.level,
        date: Math.floor(new Date(mentalEnergy.date).getTime()),
      };
    },

    async addHowAmIPhrase(_parent, { id }, context): Promise<boolean> {
      try {
        await prisma.userHowAmIPhrase.create({
          data: {
            how_am_i_phrase_id: id,
            user_id: context.uuid,
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },

    /**
     * Lets take the active brand (In the DB this is the one with no data_saved field),
     * add a date, and create a new one
     */
    async addWholeBrand(_parent, {brandName}, context): Promise<boolean> {
      try {
        const activeBrand = await prisma.brand.findMany({
          where: {
            user_id: context.uuid,
            date_saved: null,
          },
        });

        if (activeBrand.length !== 1) {
          throw new Error(
            "User has more/less than 1 brand, user has: " + activeBrand.length
          );
        }

        await prisma.brand.update({
          where: {
            id: activeBrand[0].id,
          },
          data: {
            date_saved: new Date(),
            name: brandName,
          },
        });

        await prisma.brand.create({
          data: {
            user_id: context.uuid,
            name: "Active Brand",
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },

    async addBrandWord(_parent, { wordId }, context): Promise<boolean> {
      try {
        const activeBrand = await prisma.brand.findMany({
          where: {
            user_id: context.uuid,
            date_saved: null,
          },
          include: {
            brand_word_entries: {
              include: {
                brand_word: true,
              },
            },
          },
        });

        if (activeBrand.length !== 1) {
          throw new Error(
            "User has more/less than 1 brand, user has: " + activeBrand.length
          );
        }

        if (
          activeBrand[0].brand_word_entries.find(
            (w) => w.brand_word.id === wordId
          )
        ) {
          throw new Error("User already has this word");
        }

        await prisma.brandWordEntry.create({
          data: {
            brand_id: activeBrand[0].id,
            brand_word_id: wordId,
          },
        });
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
      return true;
    },
    async removeBrandWord(_parent, { wordId }, context): Promise<boolean> {
      try {
        const activeBrand = await prisma.brand.findMany({
          where: {
            user_id: context.uuid,
            date_saved: null,
          },
          include: {
            brand_word_entries: {
              include: {
                brand_word: true,
              },
            },
          },
        });

        if (activeBrand.length !== 1) {
          throw new Error(
            "User has more/less than 1 brand, user has: " + activeBrand.length
          );
        }

        if (
          !activeBrand[0].brand_word_entries.find(
            (w) => w.brand_word.id === wordId
          )
        ) {
          throw new Error("User does not have this word");
        }

        const brandWordEntryID = activeBrand[0].brand_word_entries.find(
          (w) => w.brand_word.id === wordId
        )?.id;

        if (!brandWordEntryID) {
          throw new Error(
            "User does not have this word (brandWordEntryID is null)"
          );
        }

        await prisma.brandWordEntry.delete({
          where: {
            id: brandWordEntryID,
          },
        });
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
      return true;
    },
    async addModule(_parent, { moduleId }, context): Promise<boolean> {
      try {
        const existingModule = await prisma.userModules.findMany({
          where: {
            user_id: context.uuid,
            module_id: moduleId,
          },
        });

        if (existingModule.length > 0) {
          throw new Error("User already has this module");
        }

        await prisma.userModules.create({
          data: {
            user_id: context.uuid,
            module_id: moduleId,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },
    async removeModule(_parent, { moduleId }, context): Promise<boolean> {
      try {
        const existingModule = await prisma.userModules.findMany({
          where: {
            user_id: context.uuid,
            module_id: moduleId,
          },
        });

        if (existingModule.length !== 1) {
          throw new Error("User does not have this module");
        }

        await prisma.userModules.delete({
          where: {
            id: existingModule[0].id,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },
    async addAssignment(
      _parent,
      { moduleId, name, score, percent },
      context
    ): Promise<boolean> {
      try {
        const userModule = await prisma.userModules.findMany({
          where: {
            user_id: context.uuid,
            module_id: moduleId,
          },
        });

        if (userModule.length !== 1) {
          throw new Error("This user has a duplicated user module!");
        }

        await prisma.assignments.create({
          data: {
            user_module_id: userModule[0].id,
            name,
            score,
            percent,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },
    async createCommunityMessage(_parent, { message, placeId }, context) {
      try {
        await prisma.communityMessage.create({
          data: {
            message,
            place: {
              connect: {
                id: placeId,
              },
            },
            user: {
              connect: {
                id: context.uuid,
              },
            }
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error in createCommunityMessage "+ err);
      }
    },
    async deleteMessage(_parent, { messageId }, context) {
      try {
        const message = await prisma.communityMessage.findUnique({
          where: {
            id: messageId,
          },
          include: {
            user: true,
          },
        });

        if (!message) {
          throw new Error("Message not found");
        }

        if (message.user.id !== context.uuid) {
          throw new Error("User does not own this message");
        }

        await prisma.communityMessage.delete({
          where: {
            id: messageId,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error in deleteMessage "+ err);
      }
    },
    async createPlace(_parent, { name, latitude, longitude }) {
      try {
        await prisma.place.create({
          data: {
            name,
            latitude,
            longitude,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error in createPlace "+ err);
      }
    },
    async addSkill(
      _parent,
      { skill, replacingSkillId },
      context
    ): Promise<boolean> {
      try {
        if (replacingSkillId) {
          // Replace the skill with this ID, for the new one.
          // If not found, it throws.
          await prisma.userSkills.delete({
            where: {
              id: replacingSkillId,
            },
          });
        }

        await prisma.userSkills.create({
          data: {
            user_id: context.uuid,
            skill,
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },
    async deleteAccount(_parent, _args, context) {
      try {
        await prisma.users.delete({
          where: {
            id: context.uuid,
          },
          include: {
            brands: true,
            community_messages: true,
            how_am_i_phrases: true,
            mental_energy: true,
            user_modules: true,
            user_skills: true,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error in deleteAccount "+ err);
      }
    },
  },
};

const server = new ApolloServer<Context>({
  typeDefs: `#graphql
    ${file}
`,
  resolvers,
});

const app = express();

app.use(json());
app.use(cors());

app.use((_, res, next) => {
  res.contentType("application/json");
  next();
});

app.use("/auth", AuthRouter);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
const main = async () => {
  await server.start();
  app.use(
    "/graphql",
    cors(),
    expressMiddleware(server as any, {
      context: async ({ req }) => {
        if (!req.headers.authorization) {
          throw GetAuthorizedError();
        }
        const token = verifyJwt(req.headers.authorization);

        const timeNow = new Date().getTime() / 1000;
        if (!token || token.exp < timeNow) {
          throw GetAuthorizedError();
        }

        return {
          uuid: token.uuid,
        };
      },
    })
  );
  app.listen(process.env.PORT || 3030, () => {
    console.log("Server running");
  });
};

function GetAuthorizedError(): GraphQLError {
  return new GraphQLError("User is authorizated", {
    extensions: {
      code: "UNAUTHORIZED",
      http: {
        status: 401,
      },
    },
  });
}

function GetBadValueError(): GraphQLError {
  return new GraphQLError("Value is wrong", {
    extensions: {
      code: "INVALID",
      http: {
        status: 400,
      },
    },
  });
}

const setupTestData = async () => {
  await nukeDatabase();

  await createGeneralTestData();
  for (let i = 0; i < 10; i++) {
    await createUserProfile();
  }
};

if (process.env.NUKE_DATABASE?.toLowerCase() === "true") setupTestData();

main();

export default app;
