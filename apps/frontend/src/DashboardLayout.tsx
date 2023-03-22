import { FC } from "react";
import { Outlet, useNavigate } from "react-router";

export const DashboardLayout: FC = () => {
  const nav = useNavigate();

  return (
    <div className="w-full h-screen bg-base-200 flex flex-col text-5xl p-16 gap-8">
      <div className="w-full flex justify-between gap-8">
        <div
          className="w-full h-48 bg-neutral rounded-xl shadow-md flex justify-center items-center text-base-300"
          onClick={() => nav("/how")}
        >
          How
        </div>
        <div className="w-full h-48 bg-neutral rounded-xl shadow-md flex justify-center items-center text-base-300">
          Who
        </div>
        <div className="w-full h-48 bg-neutral rounded-xl shadow-md flex justify-center items-center text-base-300">
          IBrand
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
