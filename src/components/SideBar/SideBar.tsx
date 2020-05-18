import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo-desktop.svg";
import { ReactComponent as Home } from "../../assets/home-desktop.svg";
import { ReactComponent as Video } from "../../assets/video-desktoo.svg";

import "./SideBar.scss";

interface SideBarProps {
  name: string;
  email: string;
  imageUrl: string;
}

export const SideBar: React.FC<SideBarProps> = ({ imageUrl, name, email }) => {
  const { pathname } = useLocation();
  return (
    <div className="SideBar">
      <div className="SideBar__profile">
        <img src={imageUrl} alt="" />
        <div className="SideBar__profile-info">
          <h1>{name}</h1>
          <p>{email.length < 25 && email}</p>
        </div>
      </div>
      <div className="SideBar__main">
        <div
          className={
            pathname === "/"
              ? "SideBar__main-child SideBar__highlight2"
              : "SideBar__main-child"
          }
        >
          <Home />
          <Link to="/" className={pathname === "/" ? "SideBar__highlight" : ""}>
            Home
          </Link>
        </div>
        <div
          className={
            pathname === "/videos"
              ? "SideBar__main-child SideBar__highlight2"
              : "SideBar__main-child"
          }
        >
          <Video />
          <Link
            to="/videos"
            className={pathname === "/videos" ? "SideBar__highlight" : ""}
          >
            Videos
          </Link>
        </div>
      </div>
      <div className="SideBar__author">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
