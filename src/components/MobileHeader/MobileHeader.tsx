import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { startLogout } from "../../store/auth/actions";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ReactComponent as Logo } from "../../assets/Yusic.svg";

import "./MobileHeader.scss";

export const MobileHeader: React.FC = ({}) => {
  const dispatch = useDispatch();
  return (
    <div className="MobileHeader">
      <div className="MobileHeader__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="MobileHeader__logout" onClick={dispatch(startLogout)}>
        <Logout />
      </div>
    </div>
  );
};

export default MobileHeader;
