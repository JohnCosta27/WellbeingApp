import { FC, ReactNode } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export const DashboardLayout: FC = () => (
  <div className="w-full h-screen bg-base-100 flex">
    <div className="w-64 flex-col bg-white px-2 py-8 shadow-xl border-r-2 hidden md:flex">
      <TopbarItem onNav="/how">How</TopbarItem>
      <TopbarItem onNav="/who">Who</TopbarItem>
      <TopbarItem onNav="/how">What</TopbarItem>
    </div>
    <div className="w-full h-full p-6 overflow-y-scroll bg-[#F6F8FA]">
      <Outlet />
    </div>
  </div>
);

interface TopBarItemProps {
  onNav: string;
  children: ReactNode;
}

export const TopbarItem: FC<TopBarItemProps> = ({ onNav, children }) => (
  <Link
    to={onNav}
    className="w-full p-4 flex justify-center items-center text-3xl text-slate-800 hover:bg-primary hover:text-primary-content rounded-xl transition-all"
  >
    {children}
  </Link>
);
