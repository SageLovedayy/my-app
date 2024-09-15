import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const TrackedLink = ({ href, children, className }) => {
  const router = useRouter();

  const handleLinkClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href}>
      <div className={className} onClick={handleLinkClick}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              "data-interaction-next": href,
            });
          }
          return child;
        })}
      </div>
    </Link>
  );
};

export default TrackedLink;
