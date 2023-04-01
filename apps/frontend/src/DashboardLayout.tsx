import { FC } from "react";
import { Outlet, useNavigate } from "react-router";

export const DashboardLayout: FC = () => {
  const nav = useNavigate();

  return (
    <div className="w-full h-screen bg-base-100 flex flex-col text-5xl p-16 gap-8">
      <div className="w-full flex justify-between gap-8">
        <div
          className="w-full h-48 bg-secondary rounded-xl shadow-md shadow-secondary-focus flex justify-center items-center text-base-content"
          onClick={() => nav("/how")}
        >
          How
        </div>
        <div className="w-full h-48 bg-secondary rounded-xl shadow-md shadow-secondary-focus flex justify-center items-center text-base-content">
          Who
        </div>
        <div className="w-full h-48 bg-secondary rounded-xl shadow-md shadow-secondary-focus flex justify-center items-center text-base-content">
          IBrand
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
