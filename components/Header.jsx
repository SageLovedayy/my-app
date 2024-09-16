import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./search_bar";
import Nav from "./Nav";
import { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import TrackedLink from "./TrackedLink";
import { useRouter } from "next/router";
import { NotificationsSVG, SettingsSVG } from "./svg";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const isActive = pathname.includes("collections");
  const fillColor = isActive ? "#2740CD" : "black";
  //--------------------------------
  const [menuActive, setMenuActive] = useState(false);

  const { setMode, setSetMode } = useContext(GeneralContext);
  //const setMode = "user"

  const toggleMenu = () => {
    setMenuActive(!menuActive);

    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
  };

  const handleChangeMode = () => {
    setSetMode((prevMode) => (prevMode === "user" ? "company" : "user"));
  };

  const handleSearch = (event) => {
    //I WILL ADD SEARCH LOGIC HERE ...
    // might navigate to a search page with query params
    if (event.key === 'Enter') {
      router.push(`/search_page?query=${event.target.value}`);
    }
  };

  return (
    <header className="header-cont w-full fixed">
      <div className="header">
        <div className="header__navbar__logo flex gap-4">
          {/*<button
            className={`w-[2rem] h-[2rem] rounded-full ${
              setMode === "user" ? "bg-blue-950" : "bg-orange-900"
            } text-white`}
            onClick={handleChangeMode}
          >
            {setMode === "user" ? "U" : "C"}
          </button>*/}
          <Link href="/">
            <button className="logo">
              <p className="text-[#fea233] text-[2rem] font-bold">MGFit</p>{" "}
            </button>
          </Link>
        </div>

        <div className="header__navbar__logo-text">
          <div className="header__navbar__logo-mobilecontainer">
            <div className="header__navbar__logo-mobile"></div>
          </div>
        </div>

        <ul className={`nav-menu ${menuActive ? "active" : ""}`}>
          <Nav />
        </ul>

        {/*<div className="transition sm:w-[30rem] w-fit cursor-pointer hover:shadow-md rounded-md text-[1.6rem] pl-[1.5rem] pr-2.5 py-[1rem] flex justify-between items-center bg-stone-50">
          <p className="sm:flex hidden">search products</p>
          <div className="search-container">
            <Link href="/search_page">
              <svg
                className="search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13 14"
                fill="#3B3A3A"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.82264 10.3833C7.89957 11.0841 6.74835 11.5 5.5 11.5C2.46243 11.5 0 9.03757 0 6C0 2.96243 2.46243 0.5 5.5 0.5C8.53757 0.5 11 2.96243 11 6C11 7.24835 10.5841 8.39957 9.8833 9.32264L12.7803 12.2197C13.0732 12.5126 13.0732 12.9874 12.7803 13.2803C12.4874 13.5732 12.0126 13.5732 11.7197 13.2803L8.82264 10.3833ZM9.5 6C9.5 8.20914 7.70914 10 5.5 10C3.29086 10 1.5 8.20914 1.5 6C1.5 3.79086 3.29086 2 5.5 2C7.70914 2 9.5 3.79086 9.5 6Z"
                  fill="#3B3A3A"
                />
              </svg>
            </Link>
          </div>
        </div>*/}
        <div className="transition sm:w-[30rem] w-fit  text-[1.6rem]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for users, plans e.t.c"
              onKeyDown={handleSearch}
              className="w-full pl-[4rem] pr-2 py-[1rem] text-[1.6rem] rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fea233]"
            />
            <SearchIcon
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500"
              style={{ fontSize: "2.5rem" }}
            />
          </div>
        </div>

        <div className="header__navbar__navbuttons">
          <button className="contact-info-btn">
            <SettingsSVG fill="#333" />
          </button>

          <button className={`menu-btn`}>
            <TrackedLink href="/collections">
              <NotificationsSVG fill="#333" />
            </TrackedLink>
          </button>

          {/*HAMBURGER FOR PHONES/ SMALL SCREENS===================*/}
          <button className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          {/*------------------------------------------------------*/}
        </div>
      </div>
    </header>
  );
};

export default Header;
