import React from "react";
import { useSelector } from "react-redux";

import MobileNav from "../../components/MobileNav/MobileNav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import SideBar from "../../components/SideBar/SideBar";
import { AppState } from "../../store/configureStore";
import useWindowSize from "../../useWindowSize";

import "./Layout.scss";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { name, email, imageUrl } = useSelector(
    (state: AppState) => state.auth.user
  );
  const { width } = useWindowSize();
  return (
    <div className="Layout">
      {width > 1100 ? (
        <SideBar name={name} email={email} imageUrl={imageUrl} />
      ) : (
        <MobileHeader />
      )}
      <div className="Layout__children">{children}</div>
      {width < 1100 && <MobileNav />}
    </div>
  );
};

export default Layout;
