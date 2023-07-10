import { QueryResult } from "@apollo/client";
import {
  CurrentUserQuery,
  Exact,
  User,
  useCurrentUserQuery,
} from "@wellbeing/graphql-types";
import clsx from "clsx";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export type UserContextType = {
  data: CurrentUserQuery | undefined;
  loading: boolean;
  refetch: () => void;
  called: boolean;
};

export const UserContext = createContext<UserContextType>({
  data: undefined,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: () => {},
  called: false,
});

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
  const query = useCurrentUserQuery();

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
    <UserContext.Provider value={query}>
      <div className="w-full h-screen bg-base-100 flex flex-col overflow-y-hidden">
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
                <TopbarItem onNav="/" setSidebar={setOpenSidebar} emoji="🏠">
                  Home
                </TopbarItem>
                <TopbarItem onNav="/who" setSidebar={setOpenSidebar} emoji="🤔">
                  Who
                </TopbarItem>
                <TopbarItem onNav="/how" setSidebar={setOpenSidebar} emoji="🔍">
                  How
                </TopbarItem>
                <TopbarItem onNav="/how" setSidebar={setOpenSidebar} emoji="❓">
                  What
                </TopbarItem>
                <TopbarItem
                  onNav="/progress"
                  setSidebar={setOpenSidebar}
                  emoji="📈"
                >
                  Progress
                </TopbarItem>
                <TopbarItem
                  onNav="/community"
                  setSidebar={setOpenSidebar}
                  emoji="🏘️"
                >
                  Community
                </TopbarItem>
                <TopbarItem
                  onNav="/mycv"
                  setSidebar={setOpenSidebar}
                  emoji="📝"
                >
                  My CV
                </TopbarItem>
                <TopbarItem
                  onNav="/myskills"
                  setSidebar={setOpenSidebar}
                  emoji="🧠"
                >
                  My Skills
                </TopbarItem>
              </div>
            )}
          </div>
          <div className="w-full h-full bg-[#F6F8FA] overflow-y-auto">
            {/* Hacky way to get bottom pading to appear in mobile view (adding the margin) */}
            <div className="w-full md:p-6 mb-4 md:mb-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

interface TopBarItemProps {
  onNav: string;
  children: ReactNode;
  emoji?: string;
  setSidebar: (open: boolean) => void;
}

export const TopbarItem: FC<TopBarItemProps> = ({
  onNav,
  children,
  setSidebar,
  emoji,
}) => (
  <Link
    to={onNav}
    className="w-full p-4 flex justify-center items-center text-3xl text-slate-800 hover:bg-primary hover:text-neutral-focus rounded-md transition-all"
    onClick={() => {
      if (window.innerWidth < MD_SIZE) {
        setSidebar(false);
      }
    }}
  >
    {emoji ? (
      <div className="flex w-full">
        <div>{emoji}</div>
        <div className="text-center w-full">{children}</div>
      </div>
    ) : (
      children
    )}
  </Link>
);
