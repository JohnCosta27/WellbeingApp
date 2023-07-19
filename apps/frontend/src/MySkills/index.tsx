/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
import { FC, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  namedOperations,
  useAddSkillMutation,
  useCurrentUserQuery,
} from "@wellbeing/graphql-types";
import { Card } from "../ui";
import { DraggableSkill } from "./DraggableSkill";
import { DroppableSkill } from "./DroppableSkill";

const globalSkills = [
  [
    "COMPUTER LITERATE",
    "Develop, Organize and Complete Tasks and Projects Using Software Programs Such as Word, Excel and PowerPoint.",
  ],
  [
    "PLAN, ORGANIZE",
    "Define Goals and Objectives, Schedule and Develop Projects or Programs.",
  ],
  [
    "OBSERVE",
    "Study, Scrutinize, Examine Data, People, or Things Scientifically.",
  ],
  [
    "MAINTAIN RECORDS",
    "Keep Accurate and Up-to-Date Records, Log, Record, Itemize, Collate, Tabulate Data.",
  ],
  [
    "TEACH, TRAIN",
    "Inform, Explain, Give Instruction to Students, Employees, or Customers.",
  ],
  [
    "INTERVIEW FOR INFORMATION",
    "Draw Out Subjects Through Incisive Questioning.",
  ],
  [
    "CUSTOMER SERVICE",
    "Effectively Solve Problems and Challenges That Satisfy Customers.",
  ],
  [
    "ADAPT TO CHANGE",
    "Easily and Quickly Respond to Changing Assignments, Work Settings and Priorities.",
  ],
  [
    "WORK WITH NUMBERS",
    "Easily Calculate, Compute, Organize Understand and Solve Numerical and Quantitative Problems.",
  ],
  ["CONCEPTUALIZE", "Conceive and Internally Develop Concepts and Ideas."],
  ["MEDIATE", "Manage Conflict, Reconcile Differences."],
  ["CLASSIFY", "Group, Categorize, Systematize Data, People, or Things."],
  ["MAKE ARRANGEMENTS", "Coordinate Events, Handle Logistics."],
  ["BUDGET", "Economize, Save, Stretch Money or Other Sources."],
  [
    "ENTERTAIN-PERFORM",
    "Amuse, Sing, Dance, Art, Play Music for, Give a Demonstration to, Speak to an Audience.",
  ],
  [
    "READ FOR INFORMATION",
    "Research Written Resources Efficiently and Exhaustively.",
  ],
  [
    "INITIATE CHANGE",
    "Exert Influence on Changing the Status Quo, Exercise Leadership in Bringing About New Directions.",
  ],
  [
    "DEAL WITH AMBIGUITY",
    "Be Comfortable and Effective with Issues That Lack Clarity, Structure or Certainty.",
  ],
  ["DELEGATE", "Achieve Effective Results by Assigning Tasks to Others."],
  ["MONITOR", "Keep Track of the Movement of Data, People, or Things."],
  ["PERCEIVE INTUITIVELY", "Sense, Show Insight and Foresight."],
  [
    "PROOFREAD, EDIT",
    "Check Writings for Proper Usage and Stylistic Flair, Make Improvements.",
  ],
  ["MAKE DECISIONS", "Make Major, Complex, or Frequent Decisions."],
  [
    "SELL",
    "Promote a Person, Company Goods or Services, Convince of Merits, Raise Money.",
  ],
  ["NEGOTIATE", "Bargain for Rights or Advantages."],
  [
    "DESIGN",
    "Structure New or Innovative Practices, Programs, Products or Environments.",
  ],
  [
    "MANAGE TIME",
    "Ability to Prioritized, Structure and Schedule Tasks to Maximize Effort and Meet Deadlines.",
  ],
  [
    "COUNSEL",
    "Facilitate Insight, and Personal Growth, Guide Advice, Coach Students, Employees, or Clients.",
  ],
  [
    "DEAL WITH FEELINGS",
    "Draw Out, Listen, Accept, Empathize, Express Sensitivity, Defuse Anger, Calm, Inject Humor, Appreciate.",
  ],
  [
    "EXPEDITE",
    "Speed Up Production or Services, Trouble-Shoot Problems, Streamline Procedures.",
  ],
  ["IMPROVISE", "To Effectively Think, Speak and Act Without Preparation."],
  [
    "MOTIVATE",
    "Recruit Involvement, Mobilize Energy, Stimulate Peak Performance.",
  ],
  [
    "USE MECHANICAL ABILITIES",
    "Assemble, Tune, Repair or Operate Engines or Other Machinery.",
  ],
  ["IMPLEMENT", "Provide Detailed Follow-Through of Policies and Plans."],
  ["PORTRAY IMAGES", "Sketch, Draw, Illustrate, Paint, Photograph."],
  [
    "ACT AS LIASON",
    "Represent, Serve as a Link Between Individuals or Groups.",
  ],
  ["ANALYZE", "Break Down and Figure Out Problems Logically."],
  ["TEAM WORK", "Easily and Effectively Work With Others to Obtain Results."],
  ["SUPERVISE", "Oversee, Direct the Work of Others."],
  [
    "TEST",
    "Measure Proficiency, Quality, or Validity, Check and Double-Check.",
  ],
  ["VISUALIZE", "Imagine Possibilities, See in Mind's Eye."],
  [
    "STRATEGIZE",
    "Effectively Plan and Develop Long-Range Strategies That Successfully Accomplish Objectives.",
  ],
  [
    "INNOVATE-INVENT",
    "Create Unique Ideas or Combine Existing Ideas to Obtain a New or Unique Result.",
  ],
  ["GENERATE IDEAS", "Reflect Upon, Conceive of, Dream Up, Brainstorm Ideas."],
  [
    "WRITE",
    "Compose Reports, Letters, Articles, Ads, Stories, or Educational Materials.",
  ],
  ["EVALUATE", "Assess, Review, Critique Feasibility or Quality."],
  [
    "SYNTHESIZE",
    "Integrate Ideas and Information, Combine Diverse Elements Into a Coherent Whole.",
  ],
  ["ESTIMATE", "Appraise Value or Cost."],
  [
    "MENTOR",
    "Educate, Guide, Coach or Counsel a Less Accomplished or Junior Colleague.",
  ],
  [
    "MULTI-TASK",
    "To effectively Manage a Variety of Tasks and Projects Simultaneously.",
  ],
  [
    "RESEARCH ON-LINE",
    "Able to Use Search Engines and The World Wide Web to Gather and Organize Information and Data.",
  ],
  [
    "LEADERSHIP",
    "Organizing, motivating and providing direction to a group of people to achieve a common goal.",
  ],
];

export const MySkills: FC = () => {
  const user = useCurrentUserQuery();
  const [addSkillMutation] = useAddSkillMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [skills, setSkills] = useState<
    Array<{ skill: string; index: undefined | number }>
  >(
    globalSkills.map(([title, text]) => ({
      skill: `${title} - ${text}`,
      index: undefined,
    }))
  );

  const [userSkills, setUserSkills] = useState<
    Array<{ skill: string; index: number }>
  >([]);

  useEffect(() => {
    if (!user.loading && user.data) {
      let index = 0;
      setUserSkills(
        user.data.currentUser.skills.map((s) => ({
          skill: s.skill,
          index: ++index,
        }))
      );
    }
  }, [user.data]);

  function onDropSkill(skill: string, index: number): void {
    const item = skills.find((s) => s.skill === skill);
    if (!item) return;

    const prev = skills.find((s) => s.index === index);
    if (prev) {
      prev.index = undefined;
    }

    item.index = index;
    setSkills([...skills]);

    addSkillMutation({
      variables: {
        skill,
      },
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <h2 className="text-3xl font-bold">My Skills</h2>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 ">
          <Card
            title="Skills"
            description="A list of skills to pick from"
            className="col-span-1 max-h-[80vh] min-h-[40vh] overflow-y-auto grid grid-cols-2 gap-4"
          >
            {skills
              .filter((s) => s.index === undefined)
              .map((s) => (
                <DraggableSkill key={s.skill} name={s.skill} />
              ))}
          </Card>
          <Card
            title="My skills"
            className="col-span-2 lg:col-span-1 h-[80vh] grid grid-cols-2 gap-4 gap-4"
            description="Skills that you feel best describe you"
          >
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={0}
              skill={userSkills.find((s) => s.index === 0)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={1}
              skill={userSkills.find((s) => s.index === 1)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={2}
              skill={userSkills.find((s) => s.index === 2)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={3}
              skill={userSkills.find((s) => s.index === 3)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={4}
              skill={userSkills.find((s) => s.index === 4)?.skill}
            />
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};
