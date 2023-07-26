/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
import { FC, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  namedOperations,
  useAddSkillMutation,
  useCurrentUserQuery,
  useDeleteSkillMutation,
} from "@wellbeing/graphql-types";
import { Card } from "../ui";
import { DraggableSkill } from "./DraggableSkill";
import { DroppableSkill } from "./DroppableSkill";

const globalSkills = {
  Innovative: ["Critical thinking", "Sense making", "Creativity", "Curiosity"],

  "Social Intelligence": [
    "Communicating",
    "Active Listening",
    "Intuition",
    "Empathy",
    "Collaborating",
    "Diplomacy",
  ],
  "Self Management": [
    "Focussing",
    "Adapting",
    "Integrity",
    "Initiative",
    "Collaborating",
    "Setting Priorities",
    "Organise",
    "Coordinate",
    "Achieve",
  ],
  Leadership: [
    "Decision-Taking",
    "Professionalism",
    "Influence",
    "Scrutiny",
    "Mentoring",
    "Mediate",
    "Motivate",
  ],
};

const DndBackend = "ontouchstart" in window ? TouchBackend : HTML5Backend;

export const MySkills: FC = () => {
  const userSkills = useCurrentUserQuery().data?.currentUser.skills;

  const [addSkillMutation] = useAddSkillMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [deleteSkillMutation] = useDeleteSkillMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  function onDropSkill(skill: string, ui_index: number): void {
    addSkillMutation({
      variables: {
        skill,
        ui_index,
      },
      refetchQueries: [namedOperations.Query.CurrentUser],
    });
  }

  function onClickSkill(skill: string) {
    if (userSkills && userSkills.length >= 5) {
      // eslint-disable-next-line no-alert
      alert("You already reached 5 skills! Remove some to add others.");
      return;
    }

    const remainingIndexes = [0, 1, 2, 3, 4].filter(
      (n) => !userSkills?.some((s) => s.ui_skill === n)
    );

    addSkillMutation({
      variables: {
        skill,
        ui_index: remainingIndexes[0],
      },
    });
  }

  function deleteSkill(skill: string) {
    const userSkill = userSkills?.find((s) => s.skill === skill);
    if (!userSkill) return;

    deleteSkillMutation({
      variables: {
        skillId: userSkill.id,
      },
    });
  }

  const availableSkills: { [key: string]: Array<string> } = useMemo(
    () =>
      Object.entries(globalSkills).reduce((prev, [category, skill]) => {
        prev[category] = skill.filter(
          (s) => !userSkills?.some((userSkill) => userSkill.skill === s)
        );
        return prev;
      }, {} as { [key: string]: Array<string> }),
    [userSkills]
  );

  return (
    <DndProvider backend={DndBackend}>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <h2 className="text-3xl font-bold">My Skills</h2>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 ">
          <Card
            title="Skills"
            description="A list of skills to pick from, just drag and drop! (or click)"
            className="col-span-1 max-h-[80vh] min-h-[40vh] overflow-y-auto grid grid-cols-2 gap-4"
          >
            {Object.entries(availableSkills).map(([skillClass, skill]) => (
              <div key={skillClass}>
                <h2 className="text-xl font-bold">{skillClass}</h2>
                <ul className="p-4">
                  {skill.map((s) => (
                    <DraggableSkill key={s} name={s} onClick={onClickSkill} />
                  ))}
                </ul>
              </div>
            ))}
          </Card>
          <Card
            title="My skills"
            className="col-span-2 lg:col-span-1 h-[80vh] grid grid-cols-2 gap-4"
            description="Skills that you feel best describe you"
          >
            <DroppableSkill
              title="Social Intelligence"
              onDropSkill={onDropSkill}
              index={0}
              skill={userSkills?.find((s) => s.ui_skill === 0)?.skill}
              onDelete={deleteSkill}
            />
            <DroppableSkill
              title="Leadership"
              onDropSkill={onDropSkill}
              index={1}
              skill={userSkills?.find((s) => s.ui_skill === 1)?.skill}
              onDelete={deleteSkill}
            />
            <DroppableSkill
              title="Innovative"
              onDropSkill={onDropSkill}
              index={2}
              skill={userSkills?.find((s) => s.ui_skill === 2)?.skill}
              onDelete={deleteSkill}
            />
            <DroppableSkill
              title="Self Management"
              onDropSkill={onDropSkill}
              index={3}
              skill={userSkills?.find((s) => s.ui_skill === 3)?.skill}
              onDelete={deleteSkill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={4}
              skill={userSkills?.find((s) => s.ui_skill === 4)?.skill}
              onDelete={deleteSkill}
            />
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};
