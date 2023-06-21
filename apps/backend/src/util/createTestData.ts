import { prisma } from "../prisma";
import { Prisma } from '.prisma/client';
import { faker } from '@faker-js/faker';
import modules from './testData/modules.json';

export const createGeneralTestData = async () => {
	// creating how am i phrases for the user
	const howAmIPhrases = [...Array(5)].map(() => {
		return {
			id: faker.string.uuid(),
			phrase: [...Array(5)].map(() => faker.word.sample()).join(" "),
		};
	});
	
	await prisma.howAmIPhrase.createMany({
		data: howAmIPhrases,
	});

	// creating brand words for the user
	const brandWords = [...Array(5)].map(() => {
		return {
			id: faker.string.uuid(),
			word: faker.word.sample(),
		};
	});

	await prisma.brandWords.createMany({
		data: brandWords,
	});

	const modulesToInsert = modules.map((module) => {
		return {
			id: faker.string.uuid(),
			name: `${module.tag} : ${module.name}`,
			year: faker.number.int({min: 1, max: 4}).toString(),
		};
	});

	// inserting modules into the database
	await prisma.modules.createMany({
		data: modulesToInsert,
	});


};


export const createUserTestData = async () => {
	// creating a user, the password is always "yeet"
	const user = await prisma.users.create({
		data: {
			id: faker.string.uuid(),
			email: faker.internet.email(),
			password: "1427baf8dd99aa0505a8591d82d2cac18d03d3108f6028499d4d4392fdeafc9cf4422228334e5e13ee34794b9e415ee742cfb14ec5d11547b3cf1cf88fa485d0",
      password_salt: "hOp92qeW8McE6ms1RTj340MNxujK33eC0utl6295EVCpv913TKM062DNgGMVgAvRAafGl4VkmsPwYxZhHBioDkvW1XFpq11f5qlnnKwd4UsPzxJO8dNykkcLYCH35dbn",
			brands: {
				create: {
					id: faker.string.uuid(),
					brand_word_entries: {
						create: {
							id: faker.string.uuid(),
							brand_word: {
								create: {
									id: faker.string.uuid(),
									word: faker.word.sample(),
								}
							}
						}
					}
				}
			}
		},
	});

	console.log(user.email);
	
	// creating mental energy entries for the user
	const mentalEnergies = [...Array(15)].reduce((acc, _) => {
		const lastAcc = (acc.length > 0 ? acc[acc.length - 1].level : faker.number.float({min: 0, max: 1}));
		// last date is the last date + 1 day, or 15 days ago if it's the first entry
		const lastDate = (acc.length > 0 ? acc[acc.length - 1].date : new Date(Date.now() - 15 * 24 * 60 * 60 * 1000));

		const min = lastAcc - 0.1;
		const max = lastAcc + 0.1;
		acc.push({
			id: faker.string.uuid(),
			user_id: user.id,
			// the level should be the last level +/- 0.05, but not less than 0 or more than 1
			level: faker.number.float({
				min: min < 0 ? 0 : min, 
				max: max > 1 ? 1 : max
			}),
			date: faker.date.between({
				from: lastDate.getTime() + (6 * 60 * 60 * 1000), // from 6 hours after the last date
				to: lastDate.getTime() + (1 * 24 * 60 * 60 * 1000) // to 1 day after the last date
			}),
		});
		return acc;
	}, []);
	
	await prisma.mentalEnergy.createMany({
		data: mentalEnergies,
	});

	
	// creating some brands 
	
};

// this function is used to clear the database, it may need re-ordering if the database is changed
export const nukeDatabase = async () => {

	await prisma.brandWordEntry.deleteMany({});
	await prisma.brandWords.deleteMany({});
	await prisma.brand.deleteMany({});
	
	await prisma.assignments.deleteMany({});
	await prisma.userModules.deleteMany({});
	await prisma.modules.deleteMany({});

	await prisma.mentalEnergy.deleteMany({});

	await prisma.userHowAmIPhrase.deleteMany({});
	await prisma.howAmIPhrase.deleteMany({});

	await prisma.users.deleteMany({});
};