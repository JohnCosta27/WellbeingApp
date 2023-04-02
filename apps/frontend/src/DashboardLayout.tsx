import { FC, ReactNode } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export const DashboardLayout: FC = () => {
  return (
    <div className="w-full h-screen bg-base-100 flex">
      <div className="w-64 flex flex-col bg-neutral px-2 py-8">
        <TopbarItem onNav="/how">How</TopbarItem>
        <TopbarItem onNav="/how">Who</TopbarItem>
        <TopbarItem onNav="/how">IBrand</TopbarItem>
      </div>
      <div className="w-full h-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

interface TopBarItemProps {
  onNav: string;
  children: ReactNode;
}

export const TopbarItem: FC<TopBarItemProps> = ({ onNav, children }) => (
  <Link
    to={onNav}
    className="w-full p-4 flex justify-center items-center text-3xl text-base-200 hover:bg-neutral-500 rounded-xl transition-all"
  >
    {children}
  </Link>
);
