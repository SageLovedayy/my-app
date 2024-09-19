import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect, memo, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
//import { usePreserveState } from "../hooks/preserve-state-hook";
//------------------
import {
  OverviewSVG,
  ChartsSVG,
  ExploreSVG,
  LeaderboardSVG,
  ProfileSVG,
  ProgramsSVG,
} from "./svg";
import { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import axios from "axios";

//--------------------
export default function Nav({ additionalClass }) {
  const router = useRouter();
  const session = useSession();
  const { pathname } = router;
  //const { userMode } = useContext(GeneralContext);
  //const { setMode, setSetMode } = useContext(GeneralContext); //JUST FOR TESTING
  const setMode = "user";
  //const userMode = "company";

  //console.log(pathname);
  //const preservedState = usePreserveState();
  //console.log("Preserved State:", preservedState);

  const NavLink = memo(({ href, children, svgPath, svg }) => {
    const isActive = pathname.includes(href);
    const fillColor = isActive ? "white" : "black";

    const handleClick = (event) => {
      event.preventDefault();
      router.push(href);
    };

    const linkRef = useRef(null);

    let svgContent;
    if (svg) {
      svgContent = svg;
    } else {
      svgContent = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={fillColor}
        >
          <path className="circle-nav" d={svgPath} />
        </svg>
      );
    }

    //useEffect(() => {
    //  if (isActive) {
    //    linkRef.current.focus();
    //    linkRef.current.scrollIntoView({
    //      behavior: "smooth",
    //      block: "nearest",
    //    });
    //  }
    //}, [isActive]);

    return (
      <Link
        href={href}
        //ref={linkRef}
        onClick={handleClick}
        className={`flex Quick-navigation-item ${
          isActive ? activeLink : inactiveLink
        }`}
      >
        {svgContent}
        {children}
      </Link>
    );
  });

  NavLink.displayName = "NavLink";

  const Navigation = ({ pathname, presetMode }) => {
    console.log("usermode", presetMode);
    const navLinks = useMemo(
      () =>
        presetMode === "user" ? (
          <>
            {" "}
            <NavLink
              href="overview"
              isActive={pathname.includes("overview")}
              svg={
                <OverviewSVG
                  fill={pathname.includes("overview") ? "white" : "black"}
                />
              }
            >
              Overview
            </NavLink>
            <NavLink
              href="/health-profile"
              isActive={pathname.includes("health-profile")}
              svg={
                <ProfileSVG
                  fill={pathname.includes("profile") ? "white" : "black"}
                />
              }
            >
              Profile
            </NavLink>
            <NavLink
              href="/charts"
              isActive={pathname.includes("charts")}
              svg={
                <ChartsSVG
                  fill={pathname.includes("charts") ? "white" : "black"}
                />
              }
            >
              Progress Charts
            </NavLink>
            <NavLink
              href="/training-programs"
              isActive={pathname.includes("training-programs")}
              svg={
                <ProgramsSVG
                  fill={
                    pathname.includes("training-programs") ? "white" : "black"
                  }
                />
              }
            >
              Training Programs
            </NavLink>
            <NavLink
              href="/explore"
              isActive={pathname.includes("explore")}
              svg={
                <ExploreSVG
                  fill={pathname.includes("explore") ? "white" : "black"}
                />
              }
            >
              Explore
            </NavLink>
            <NavLink
              href="/leaderboard"
              isActive={pathname.includes("leaderboard")}
              svg={
                <LeaderboardSVG
                  fill={pathname.includes("leaderboard") ? "white" : "black"}
                />
              }
            >
              Leaderboard
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              href="/wishlist"
              isActive={pathname.includes("wishlist")}
              svgPath="M20.8382 4.60987C20.3274 4.09888 19.721 3.69352 19.0535 3.41696C18.3861 3.14039 17.6707 2.99805 16.9482 2.99805C16.2257 2.99805 15.5103 3.14039 14.8428 3.41696C14.1754 3.69352 13.5689 4.09888 13.0582 4.60987L11.9982 5.66987L10.9382 4.60987C9.90647 3.57818 8.5072 2.99858 7.04817 2.99858C5.58913 2.99858 4.18986 3.57818 3.15817 4.60987C2.12647 5.64156 1.54688 7.04084 1.54688 8.49987C1.54687 9.95891 2.12647 11.3582 3.15817 12.3899L4.21817 13.4499L11.9982 21.2299L19.7782 13.4499L20.8382 12.3899C21.3492 11.8791 21.7545 11.2727 22.0311 10.6052C22.3076 9.93777 22.45 9.22236 22.45 8.49987C22.45 7.77738 22.3076 7.06198 22.0311 6.39452C21.7545 5.72706 21.3492 5.12063 20.8382 4.60987Z"
            >
              Wishlist
            </NavLink>
          </>
        ),
      [pathname, presetMode]
    );

    return <nav className="flex flex-col gap-[2rem] w-full">{navLinks}</nav>;
  };

  const inactiveLink = "bg-white";
  const activeLink = "bg-[#fea233] text-white";

  const logUserOut = async () => {
    try {
      await signOut({ redirect: false }); // `redirect: false` prevents automatic redirection
      // POST SIGN OUT ACTIONS WILL BE HANDLED HERE
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`try ${additionalClass}`}>
      <aside className="text-black p-13 left-panel">
        <nav className="flex flex-col gap-2 navigation-panel">
          <Navigation pathname={pathname} presetMode={setMode} />
          {/* WE WILL REPLACE setMode WITH userMode IN THE FUTURE  */}

          {/*-------------------------*/}
          {/*{setMode === "user" && (
            <Link
              href={"/create-company"}
              className={`mt-[4rem] w-[30rem] px-[3rem] py-3  rounded-[.5rem] justify-start items-center gap-2.5 inline-flex ${
                pathname.includes("/create-company")
                  ? "bg-blue-700 text-white border-l-gray-800 border-double"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                Create Company
              </div>
            </Link>
          )}*/}
          {/*----------------------------*/}
          {/*{setMode === "company" && (
            <Link
              href={"/"}
              className="mt-[6.4rem] w-[30rem] py-4 px-[3rem] bg-blue-700 rounded-[.5rem] justify-start items-center gap-2.5 inline-flex"
            >
              <div className="text-white sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                Merge Company
              </div>
            </Link>
          )}*/}
          {/*-----------------------------*/}

          <div className="flex flex-col w-full gap-[2rem]">
            <div className="w-full bg-[#f5f5f5]  px-[3rem] py-6 rounded-[1rem] border flex-col items-start gap-4 inline-flex">
              <div className="flex items-center gap-6">
                <div className="w-[3rem] h-[3rem] bg-zinc-300 rounded-full border border-violet-50" />
                <div className="sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                  {session.data?.username}
                </div>
              </div>
              {/*{setMode === "company" && (
                <div className="flex items-center justify-center gap-6">
                  <div className="w-[3rem] h-[3rem] bg-zinc-300 rounded-full border border-violet-50" />
                  <div className="text-white sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                    {session.data?.companyname}
                  </div>
                </div>
              )}*/}
            </div>

            <button
              onClick={logUserOut}
              className="cursor-pointer w-full px-[3rem] h-[4.2rem] rounded-[.5rem] justify-start gap-[1rem] inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
                  fill="black"
                />
              </svg>{" "}
              <div className="flex w-[19.4rem] text-black sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                Sign Out
              </div>
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
}
