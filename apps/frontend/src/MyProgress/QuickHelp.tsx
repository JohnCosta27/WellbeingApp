import { FC } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export const QuickHelp: FC = () => (
  <Card title="Quick Help" className="col-span-2 lg:col-span-1 flex">
    <div className="grid grid-cols-2 gap-4 w-full text-white">
      <Link to="https://intranet.royalholloway.ac.uk/students/help-support/supporting-you-at-royal-holloway/mental-health.aspx">
        <div className="btn btn-info w-full bg-[#eb6625] text-white">
          RHUL Mental Health
        </div>
      </Link>
      <Link to="https://www.studentminds.org.uk/">
        <div className="btn btn-info w-full bg-[#14a5a8]">Student Minds</div>
      </Link>
      <Link to="https://www.mind.org.uk/">
        <div className="btn btn-info w-full bg-[#1301c0] text-white">Mind</div>
      </Link>
      <Link to="https://www.nhs.uk/oneyou/every-mind-matters/">
        <div className="btn btn-info w-full bg-[#ffcb31]">
          Every Mind Matters
        </div>
      </Link>
    </div>
  </Card>
);
