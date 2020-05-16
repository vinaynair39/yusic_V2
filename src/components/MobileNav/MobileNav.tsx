import React from "react";
import "./MobileNav.scss";
import { ReactComponent as Dashboard } from "../../assets/home.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { Link, useLocation } from "react-router-dom";

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = ({}) => {
  const { pathname } = useLocation();
  return (
    <div className="MobileNav">
      <div className="wrapper">
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          <Dashboard />
        </Link>
        <Link to="/search" className={pathname === "/search" ? "active" : ""}>
          <Search />
        </Link>
        <Link to="videos" className={pathname === "/videos" ? "active" : ""}>
          <Video />
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
