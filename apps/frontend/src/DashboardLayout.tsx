import clsx from "clsx";
import { FC, ReactNode, useEffect, useState } from "react";
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

const MD_SIZE = 768;

export const DashboardLayout: FC = () => {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth > MD_SIZE);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth > MD_SIZE);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-base-100 flex flex-col">
      <div className="w-full min-h-12 bg-secondary-focus shadow-md flex justify-between items-center px-4 text-white">
        <div className="w-full flex items-center gap-4">
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth < MD_SIZE) {
                  setOpenSidebar(!openSidebar);
                }
              }}
            >
              <HamburgerIcon />
            </button>
          </div>
          <h1 className="text-xl">Wellbeing App</h1>
        </div>
      </div>
      <div className="w-full h-full flex">
        <div
          className={clsx(
            "flex-col bg-white shadow-xl fixed h-full md:relative transition-all z-10",
            !openSidebar ? "w-0" : "w-64"
          )}
        >
          {openSidebar && (
            <div className="grid m-1">
              <TopbarItem onNav="/who">Who</TopbarItem>
              <TopbarItem onNav="/how">How</TopbarItem>
              <TopbarItem onNav="/how">What</TopbarItem>
              <TopbarItem onNav="/progress">Progress</TopbarItem>
              <TopbarItem onNav="/mycv">My CV</TopbarItem>
            </div>
          )}
        </div>
        <div className="w-full h-full overflow-y-hidden bg-[#F6F8FA]">
          <div className="w-full h-full p-2 md:p-6">
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
    className="w-full p-4 flex justify-center items-center text-3xl text-slate-800 hover:bg-primary hover:text-neutral-focus rounded-md transition-all"
  >
    {children}
  </Link>
);
