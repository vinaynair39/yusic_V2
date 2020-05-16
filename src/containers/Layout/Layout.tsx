import React from "react";
import "./Layout.scss";
import MobileNav from "../../components/MobileNav/MobileNav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import windowSize, { WindowSizeProps } from "react-window-size";
import SideBar from "../../components/SideBar/SideBar";
import { useSelector } from "react-redux";
import { AppState } from "../../store/configureStore";
import useWindowSize from "../../useWindowSize";

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

export default windowSize(Layout);
