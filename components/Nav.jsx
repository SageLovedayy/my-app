import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect, memo, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
//import { usePreserveState } from "../hooks/preserve-state-hook";
//------------------
import {
  NegotiationsSVG,
  TransactionsSVG,
  ContentsSVG,
  CompanyMembershipSVG,
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
  const { setMode, setSetMode } = useContext(GeneralContext); //JUST FOR TESTING
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
    const navLinks = useMemo(
      () =>
        presetMode === "user" ? (
          <>
            {" "}
            <NavLink
              href="/profile"
              isActive={pathname.includes("/profile")}
              svgPath="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z"
            >
              Profile
            </NavLink>
            <NavLink
              href="/settings"
              isActive={pathname.includes("settings")}
              svgPath="M21.1688 13.176C21.2182 12.792 21.2552 12.408 21.2552 12C21.2552 11.592 21.2182 11.208 21.1688 10.824L23.7719 8.844C24.0063 8.664 24.068 8.34 23.9199 8.076L21.4526 3.924C21.3416 3.732 21.1318 3.624 20.9098 3.624C20.8358 3.624 20.7617 3.636 20.7001 3.66L17.6282 4.86C16.9867 4.38 16.2959 3.984 15.5433 3.684L15.0745 0.504C15.0375 0.216 14.7785 0 14.4701 0H9.5354C9.22698 0 8.96791 0.216 8.9309 0.504L8.46211 3.684C7.70957 3.984 7.01872 4.392 6.37722 4.86L3.30539 3.66C3.23137 3.636 3.15735 3.624 3.08334 3.624C2.87361 3.624 2.66389 3.732 2.55286 3.924L0.0855318 8.076C-0.0748444 8.34 -0.00082446 8.664 0.233572 8.844L2.8366 10.824C2.78726 11.208 2.75025 11.604 2.75025 12C2.75025 12.396 2.78726 12.792 2.8366 13.176L0.233572 15.156C-0.00082446 15.336 -0.0625078 15.66 0.0855318 15.924L2.55286 20.076C2.66389 20.268 2.87361 20.376 3.09567 20.376C3.16969 20.376 3.24371 20.364 3.30539 20.34L6.37722 19.14C7.01872 19.62 7.70957 20.016 8.46211 20.316L8.9309 23.496C8.96791 23.784 9.22698 24 9.5354 24H14.4701C14.7785 24 15.0375 23.784 15.0745 23.496L15.5433 20.316C16.2959 20.016 16.9867 19.608 17.6282 19.14L20.7001 20.34C20.7741 20.364 20.8481 20.376 20.9221 20.376C21.1318 20.376 21.3416 20.268 21.4526 20.076L23.9199 15.924C24.068 15.66 24.0063 15.336 23.7719 15.156L21.1688 13.176ZM18.7262 11.124C18.7755 11.496 18.7879 11.748 18.7879 12C18.7879 12.252 18.7632 12.516 18.7262 12.876L18.5535 14.232L19.6514 15.072L20.9838 16.08L20.1202 17.532L18.5535 16.92L17.2705 16.416L16.1602 17.232C15.6297 17.616 15.1239 17.904 14.6181 18.108L13.3104 18.624L13.113 19.98L12.8663 21.6H11.1392L10.7074 18.624L9.39969 18.108C8.86922 17.892 8.37575 17.616 7.88229 17.256L6.75965 16.416L5.45197 16.932L3.88522 17.544L3.02165 16.092L4.35401 15.084L5.45197 14.244L5.27926 12.888C5.24225 12.516 5.21757 12.24 5.21757 12C5.21757 11.76 5.24225 11.484 5.27926 11.124L5.45197 9.768L4.35401 8.928L3.02165 7.92L3.88522 6.468L5.45197 7.08L6.73498 7.584L7.84528 6.768C8.37575 6.384 8.88155 6.096 9.38736 5.892L10.695 5.376L10.8924 4.02L11.1392 2.4H12.854L13.2857 5.376L14.5934 5.892C15.1239 6.108 15.6174 6.384 16.1108 6.744L17.2335 7.584L18.5411 7.068L20.1079 6.456L20.9715 7.908L19.6514 8.928L18.5535 9.768L18.7262 11.124ZM12.0027 7.2C9.27633 7.2 7.06807 9.348 7.06807 12C7.06807 14.652 9.27633 16.8 12.0027 16.8C14.7291 16.8 16.9374 14.652 16.9374 12C16.9374 9.348 14.7291 7.2 12.0027 7.2ZM12.0027 14.4C10.6457 14.4 9.5354 13.32 9.5354 12C9.5354 10.68 10.6457 9.6 12.0027 9.6C13.3598 9.6 14.4701 10.68 14.4701 12C14.4701 13.32 13.3598 14.4 12.0027 14.4Z"
            >
              Settings
            </NavLink>
            <NavLink
              href="/negotiations"
              isActive={pathname.includes("negotiations")}
              svg={
                <NegotiationsSVG
                  fill={pathname.includes("negotiations") ? "white" : "black"}
                />
              }
            >
              Negotiations
            </NavLink>
            <NavLink
              href="/transactions"
              isActive={pathname.includes("transactions")}
              svg={
                <TransactionsSVG
                  fill={pathname.includes("transactions") ? "white" : "black"}
                />
              }
            >
              Transactions
            </NavLink>
            <NavLink
              href="/wishlist"
              isActive={pathname.includes("wishlist")}
              svgPath="M20.8382 4.60987C20.3274 4.09888 19.721 3.69352 19.0535 3.41696C18.3861 3.14039 17.6707 2.99805 16.9482 2.99805C16.2257 2.99805 15.5103 3.14039 14.8428 3.41696C14.1754 3.69352 13.5689 4.09888 13.0582 4.60987L11.9982 5.66987L10.9382 4.60987C9.90647 3.57818 8.5072 2.99858 7.04817 2.99858C5.58913 2.99858 4.18986 3.57818 3.15817 4.60987C2.12647 5.64156 1.54688 7.04084 1.54688 8.49987C1.54687 9.95891 2.12647 11.3582 3.15817 12.3899L4.21817 13.4499L11.9982 21.2299L19.7782 13.4499L20.8382 12.3899C21.3492 11.8791 21.7545 11.2727 22.0311 10.6052C22.3076 9.93777 22.45 9.22236 22.45 8.49987C22.45 7.77738 22.3076 7.06198 22.0311 6.39452C21.7545 5.72706 21.3492 5.12063 20.8382 4.60987Z"
            >
              Wishlist
            </NavLink>
            <NavLink
              href="/saved_profiles"
              isActive={pathname.includes("saved_profiles")}
              svgPath="M21.1 12.5L22.5 13.91L15.97 20.5L12.5 17L13.9 15.59L15.97 17.67L21.1 12.5ZM10 17L13 20H3V18C3 15.79 6.58 14 11 14L12.89 14.11L10 17ZM11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4Z"
            >
              Saved Profiles
            </NavLink>
            <NavLink
              href="/company_membership"
              isActive={pathname.includes("company_membership")}
              svg={
                <CompanyMembershipSVG
                  fill={
                    pathname.includes("company_membership") ? "white" : "black"
                  }
                />
              }
            >
              Company Membership
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              href="/profile"
              isActive={pathname.includes("/profile")}
              svgPath="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z"
            >
              Profile
            </NavLink>
            <NavLink
              href="/dashboard"
              isActive={pathname.includes("dashboard")}
              svgPath="M4.33333 16.3333H12.3333C13.0667 16.3333 13.6667 15.7333 13.6667 15V4.33333C13.6667 3.6 13.0667 3 12.3333 3H4.33333C3.6 3 3 3.6 3 4.33333V15C3 15.7333 3.6 16.3333 4.33333 16.3333ZM4.33333 27H12.3333C13.0667 27 13.6667 26.4 13.6667 25.6667V20.3333C13.6667 19.6 13.0667 19 12.3333 19H4.33333C3.6 19 3 19.6 3 20.3333V25.6667C3 26.4 3.6 27 4.33333 27ZM17.6667 27H25.6667C26.4 27 27 26.4 27 25.6667V15C27 14.2667 26.4 13.6667 25.6667 13.6667H17.6667C16.9333 13.6667 16.3333 14.2667 16.3333 15V25.6667C16.3333 26.4 16.9333 27 17.6667 27ZM16.3333 4.33333V9.66667C16.3333 10.4 16.9333 11 17.6667 11H25.6667C26.4 11 27 10.4 27 9.66667V4.33333C27 3.6 26.4 3 25.6667 3H17.6667C16.9333 3 16.3333 3.6 16.3333 4.33333Z"
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/negotiations"
              isActive={pathname.includes("negotiations")}
              svg={
                <NegotiationsSVG
                  fill={pathname.includes("negotiations") ? "white" : "black"}
                />
              }
            >
              Negotiations
            </NavLink>
            <NavLink
              href="/proposals"
              isActive={pathname.includes("proposals")}
              svgPath="M6.77639 0.216987C6.44991 0.407253 6.42502 1.07308 6.42502 9.64689C6.42502 18.5617 6.43807 18.8787 6.81333 19.0798C7.02837 19.1949 8.46315 19.2878 10.0258 19.2878H12.85V18.7338C12.85 18.4293 12.9342 17.8868 13.0368 17.5284L13.2235 16.8768H10.6274C8.16519 16.8768 8.03127 16.8561 8.03127 16.475C8.03127 16.093 8.1676 16.0727 10.792 16.0655L13.5528 16.0579L14.1029 15.2618L14.6533 14.4658H11.3422C8.16519 14.4658 8.03127 14.4495 8.03127 14.064C8.03127 13.6762 8.1674 13.662 11.8963 13.6555C15.1924 13.6501 15.924 13.5918 16.8657 13.2603C18.2029 12.7896 19.2877 12.7599 20.5984 13.1577C21.1405 13.3222 21.6065 13.4578 21.6342 13.459C21.6619 13.4602 21.6844 11.5174 21.6844 9.14159V4.82194H19.4758C16.5257 4.82194 16.4641 4.76448 16.4641 2.00914V0L11.7959 0.00602747C9.00025 0.00984484 6.98681 0.0944296 6.77639 0.216987ZM17.468 2.29685V4.01828L19.4256 4.01286L21.3833 4.00743L19.9778 2.70491C19.2048 1.98865 18.3239 1.21633 18.0202 0.988899L17.468 0.575418V2.29685ZM15.661 2.00914C15.661 2.39691 15.5271 2.41097 11.8461 2.41097C8.16519 2.41097 8.03127 2.39691 8.03127 2.00914C8.03127 1.62138 8.16519 1.60731 11.8461 1.60731C15.5271 1.60731 15.661 1.62138 15.661 2.00914ZM2.90832 3.08484C0.0975802 4.28952 0 4.34537 0 4.75122C0 5.02727 5.34461 18.0642 5.54077 18.2665C5.58535 18.3125 5.62189 17.0144 5.62189 15.382C5.62189 12.6917 5.59057 12.4257 5.28658 12.5425C5.10167 12.6134 4.87779 12.5555 4.78764 12.4133C4.53044 12.0076 4.58284 11.9064 5.11994 11.7714C5.56105 11.6607 5.62189 11.5373 5.62189 10.7539V9.86268L4.83683 10.1397C4.40515 10.2922 3.99857 10.3636 3.93332 10.2983C3.62451 9.98905 3.89296 9.65151 4.71757 9.31217C5.58736 8.95434 5.62049 8.90954 5.62109 8.08679C5.62149 7.61726 5.58796 7.23291 5.5464 7.23291C5.50504 7.23291 4.94887 7.46396 4.31038 7.74645C3.39181 8.1531 3.11513 8.20533 2.98342 7.99759C2.69891 7.54895 2.7726 7.48445 4.21642 6.91747L5.62189 6.36576V5.49842C5.62189 4.51394 5.76565 4.51354 3.53898 5.50324C2.13371 6.12768 2.00782 6.14014 2.00782 5.65312C2.00782 5.37184 2.45717 5.09036 3.81485 4.52057L5.62189 3.76232V2.88573C5.62189 2.40354 5.55423 2.01858 5.4713 2.03004C5.38838 2.04149 4.23509 2.51605 2.90832 3.08484ZM15.661 4.42011C15.661 4.80788 15.5271 4.82194 11.8461 4.82194C8.16519 4.82194 8.03127 4.80788 8.03127 4.42011C8.03127 4.03235 8.16519 4.01828 11.8461 4.01828C15.5271 4.01828 15.661 4.03235 15.661 4.42011ZM20.0782 6.83108C20.0782 7.22407 19.9443 7.23291 14.0547 7.23291C8.16519 7.23291 8.03127 7.22407 8.03127 6.83108C8.03127 6.43809 8.16519 6.42925 14.0547 6.42925C19.9443 6.42925 20.0782 6.43809 20.0782 6.83108ZM20.0782 9.24205C20.0782 9.63504 19.9443 9.64388 14.0547 9.64388C8.16519 9.64388 8.03127 9.63504 8.03127 9.24205C8.03127 8.84906 8.16519 8.84022 14.0547 8.84022C19.9443 8.84022 20.0782 8.84906 20.0782 9.24205ZM20.0782 11.653C20.0782 12.046 19.9443 12.0548 14.0547 12.0548C8.16519 12.0548 8.03127 12.046 8.03127 11.653C8.03127 11.26 8.16519 11.2512 14.0547 11.2512C19.9443 11.2512 20.0782 11.26 20.0782 11.653ZM17.4668 13.8378C16.5396 14.1423 15.7664 14.6272 15.1313 15.3026C14.0561 16.446 13.7616 17.2167 13.7616 18.8859C13.7616 20.5549 14.0559 21.3252 15.1313 22.4698C16.1987 23.6058 17.1626 24 18.8735 24C20.0278 24 20.5669 23.8995 21.1825 23.57C22.1298 23.0631 23.0995 22.0771 23.6156 21.096C24.1281 20.1214 24.1281 17.6505 23.6156 16.6759C23.0947 15.6858 22.1223 14.7019 21.1883 14.2207C20.3229 13.7745 18.2948 13.5659 17.4668 13.8378ZM20.3272 19.5387L18.0746 21.7928L16.6671 20.395C15.8929 19.6261 15.2594 18.9241 15.2594 18.8347C15.2594 18.7455 15.398 18.6191 15.5674 18.554C15.7686 18.4769 16.2181 18.7933 16.8613 19.4646C17.4034 20.0303 17.9216 20.4932 18.0127 20.4932C18.1041 20.4932 19.0327 19.6351 20.0766 18.5862C21.7676 16.887 22.0075 16.712 22.2771 16.9819C22.5466 17.2517 22.3342 17.5304 20.3272 19.5387ZM6.60753 20.9453C6.94063 21.7212 7.0362 21.7966 7.6534 21.7713C8.02686 21.7558 9.19079 21.3759 10.2399 20.9268L12.1473 20.1101L9.194 20.1009L6.2407 20.0914L6.60753 20.9453Z"
            >
              Proposals
            </NavLink>
            <NavLink
              href="/members"
              isActive={pathname.includes("members")}
              svgPath="M4 13.5C5.1 13.5 6 12.15 6 10.5C6 8.85 5.1 7.5 4 7.5C2.9 7.5 2 8.85 2 10.5C2 12.15 2.9 13.5 4 13.5ZM5.13 15.15C4.76 15.06 4.39 15 4 15C3.01 15 2.07 15.315 1.22 15.87C0.48 16.35 0 17.43 0 18.645V21H4.5V18.585C4.5 17.34 4.73 16.17 5.13 15.15ZM20 13.5C21.1 13.5 22 12.15 22 10.5C22 8.85 21.1 7.5 20 7.5C18.9 7.5 18 8.85 18 10.5C18 12.15 18.9 13.5 20 13.5ZM24 18.645C24 17.43 23.52 16.35 22.78 15.87C21.93 15.315 20.99 15 20 15C19.61 15 19.24 15.06 18.87 15.15C19.27 16.17 19.5 17.34 19.5 18.585V21H24V18.645ZM16.24 14.475C15.07 13.695 13.63 13.125 12 13.125C10.37 13.125 8.93 13.71 7.76 14.475C6.68 15.195 6 16.815 6 18.585V21H18V18.585C18 16.815 17.32 15.195 16.24 14.475ZM8.07 18C8.16 17.655 8.2 17.415 8.98 16.965C9.95 16.395 10.97 16.125 12 16.125C13.03 16.125 14.05 16.395 15.02 16.965C15.79 17.415 15.83 17.655 15.93 18H8.07ZM12 6C12.55 6 13 6.675 13 7.5C13 8.325 12.55 9 12 9C11.45 9 11 8.325 11 7.5C11 6.675 11.45 6 12 6ZM12 3C10.34 3 9 5.01 9 7.5C9 9.99 10.34 12 12 12C13.66 12 15 9.99 15 7.5C15 5.01 13.66 3 12 3Z"
            >
              Members
            </NavLink>
            <NavLink
              href="/transactions"
              isActive={pathname.includes("transactions")}
              svg={
                <TransactionsSVG
                  fill={pathname.includes("transactions") ? "white" : "black"}
                />
              }
            >
              Transactions
            </NavLink>

            <NavLink
              href="/wishlist"
              isActive={pathname.includes("wishlist")}
              svgPath="M20.8382 4.60987C20.3274 4.09888 19.721 3.69352 19.0535 3.41696C18.3861 3.14039 17.6707 2.99805 16.9482 2.99805C16.2257 2.99805 15.5103 3.14039 14.8428 3.41696C14.1754 3.69352 13.5689 4.09888 13.0582 4.60987L11.9982 5.66987L10.9382 4.60987C9.90647 3.57818 8.5072 2.99858 7.04817 2.99858C5.58913 2.99858 4.18986 3.57818 3.15817 4.60987C2.12647 5.64156 1.54688 7.04084 1.54688 8.49987C1.54687 9.95891 2.12647 11.3582 3.15817 12.3899L4.21817 13.4499L11.9982 21.2299L19.7782 13.4499L20.8382 12.3899C21.3492 11.8791 21.7545 11.2727 22.0311 10.6052C22.3076 9.93777 22.45 9.22236 22.45 8.49987C22.45 7.77738 22.3076 7.06198 22.0311 6.39452C21.7545 5.72706 21.3492 5.12063 20.8382 4.60987Z"
            >
              Wishlist
            </NavLink>

            <NavLink
              href="/saved_profiles"
              isActive={pathname.includes("saved_profiles")}
              svgPath="M21.1 12.5L22.5 13.91L15.97 20.5L12.5 17L13.9 15.59L15.97 17.67L21.1 12.5ZM10 17L13 20H3V18C3 15.79 6.58 14 11 14L12.89 14.11L10 17ZM11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4Z"
            >
              Saved Profiles
            </NavLink>
            <NavLink
              href="/contents"
              isActive={pathname.includes("contents")}
              svg={
                <ContentsSVG
                  fill={pathname.includes("contents") ? "white" : "black"}
                />
              }
            >
              Contents
            </NavLink>
          </>
        ),
      [pathname, presetMode]
    );

    return <nav className="flex flex-col gap-[3.2rem] w-full">{navLinks}</nav>;
  };

  const inactiveLink = "bg-white";
  const activeLink = "bg-blue-600 text-white";

  const logUserOut = async () => {
  };

  return (
    <div className={`try ${additionalClass}`}>
      <aside className="text-black p-13 left-panel">
        <nav className="flex flex-col gap-2 navigation-panel">
          <Navigation pathname={pathname} presetMode={setMode} />
          {/* WE WILL REPLACE setMode WITH userMode IN THE FUTURE  */}

          {/*-------------------------*/}
          {setMode === "user" && (
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
          )}
          {/*----------------------------*/}
          {setMode === "company" && (
            <Link
              href={"/"}
              className="mt-[6.4rem] w-[30rem] py-4 px-[3rem] bg-blue-700 rounded-[.5rem] justify-start items-center gap-2.5 inline-flex"
            >
              <div className="text-white sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                Merge Company
              </div>
            </Link>
          )}
          {/*-----------------------------*/}

          <div className="mt-[4.6rem] gradient w-full px-4 py-6 rounded-[1rem] border flex-col items-start gap-4 inline-flex">
            <div className="flex items-center gap-6">
              <div className="w-[3rem] h-[3rem] bg-zinc-300 rounded-full border border-violet-50" />
              <div className="text-white sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                {session.data?.username}
              </div>
            </div>
            {setMode === "company" && (
              <div className="flex items-center justify-center gap-6">
                <div className="w-[3rem] h-[3rem] bg-zinc-300 rounded-full border border-violet-50" />
                <div className="text-white sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
                  {session.data?.companyname}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={logUserOut}
            className="mt-[4.6rem] cursor-pointer w-[30rem] h-[4.2rem] px-[3rem] rounded-[.5rem] justify-start gap-2.5 inline-flex"
          >
            <div className="flex w-[19.4rem] text-black sm:text-[1.8rem] text-[2rem] font-normal font-['clash']">
              Sign Out
            </div>
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
            </svg>
          </button>
        </nav>
      </aside>
    </div>
  );
}
