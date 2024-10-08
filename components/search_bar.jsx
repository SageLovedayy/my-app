import React, { memo } from "react";
import Link from "next/link";

const SearchBar = ({
  width,
  height,
  placeholder,
  searchIcon,
  textWidth,
  className,
  textClass,
  onChange,
  value,
}) => {
  return (
    <div
      className={`search-bar w-${width} h-${height} pl-[1.5rem] pr-2.5 py-2.5 bg-stone-50 rounded-[.5rem] justify-start items-center gap-2 inline-flex ${className}`}
      role="search"
    >
      <label className="visually-hidden"></label>
      <label htmlFor="searchInput" className="visually-hidden"></label>

      <input
        type="text"
        value={value}
        placeholder={placeholder || ""}
        className={`search-text w-${textWidth} text-neutral-700 text-sm font-normal font-['clash'] ${textClass}`}
        id="searchInput"
        aria-label="search Tverza"
        onChange={onChange}
      />

      <div className="search-container">
        {searchIcon && (
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
        )}
        {/*pass a custom SVG via the searchIcon prop */}
        {searchIcon && React.isValidElement(searchIcon) && searchIcon}
      </div>
    </div>
  );
};

SearchBar.defaultProps = {
  width: "[45rem]",
  height: "[5rem]",
  placeholder: "search products",
  searchIcon: true,
  textWidth: "[38rem]",
  className: "",
  textClass: "",
};

export default memo(SearchBar);
