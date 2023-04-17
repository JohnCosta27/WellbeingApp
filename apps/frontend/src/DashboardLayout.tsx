import { FC, ReactNode, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export const DashboardLayout: FC = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="w-full h-screen bg-base-100 flex flex-col overflow-hidden">
      <div className="w-full min-h-12 bg-secondary-focus shadow-md flex justify-between items-center px-4 text-white">
        <div className="w-full flex items-center gap-4">
          <div className="flex md:hidden">
            <button type="button" onClick={() => setOpenSidebar(!openSidebar)}>
              <HamburgerIcon />
            </button>
          </div>
          <h1 className="text-xl">Wellbeing App</h1>
        </div>
      </div>
      <div className="w-full h-full flex">
        {openSidebar && (
          <div className="w-64 flex-col bg-white px-2 py-8 shadow-xl border-r-2">
            <TopbarItem onNav="/how">How</TopbarItem>
            <TopbarItem onNav="/who">Who</TopbarItem>
            <TopbarItem onNav="/how">What</TopbarItem>
          </div>
        )}
        <div className="w-full h-full overflow-y-auto bg-[#F6F8FA]">
          <div className="w-full h-full p-6">
            <Outlet />
          </div>
        </div>
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
    className="w-full p-4 flex justify-center items-center text-3xl text-slate-800 hover:bg-primary hover:text-primary-content rounded-xl transition-all"
  >
    {children}
  </Link>
);
