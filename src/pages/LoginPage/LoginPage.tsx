import React, { useState, useEffect, useRef } from "react";
import { startLogin } from "../../store/auth/actions";
import { useDispatch } from "react-redux";
import BG1 from "../../assets/bg3.png";
import BG2 from "../../assets/bg2.png";
import { ReactComponent as Bg } from "../../assets/bg.svg";
import "./LoginPage.scss";
import { ReactComponent as Logo } from "../../assets/logo-landing.svg";
import { ReactComponent as Circles } from "../../assets/circles.svg";
import hoverEffect from "hover-effect";
import useWindowSize from "../../useWindowSize";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Edge } from "../../assets/edge.svg";
import { ReactComponent as Edge2 } from "../../assets/edge2.svg";
import FadeIn from "react-fade-in";
import gsap from "gsap";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  let image = useRef(null);
  let subtitle = useRef(null);
  let button = useRef(null);

  useEffect(() => {
    if (width < 1100) {
      gsap.from(subtitle.current, 2, {
        opacity: 0,
        y: 50,
        ease: "power4.inOut",
        stagger: 0.1,
        delay: 1,
      });
    }
    gsap.from(image.current, 2, {
      opacity: 0,
      overflow: "hidden",
      x: 100,
      ease: "power4.out",
      delay: 1.5,
    });
    gsap.to([button.current], 0.5, {
      opacity: 1,
      ease: "power4.inOut",
      delay: 2.2,
    });
  }, []);
  return (
    <div className="LoginPage">
      <div className="LoginPage__content animated fadeIn">
        <div className="first-circles">
          {width > 1100 ? <Circles /> : <Edge />}
        </div>
        <div className="LoginPage__content-title">
          <Logo />
        </div>
        <div className="LoginPage__content-subtitle" ref={subtitle}>
          <p>The Best Music Streaming Platform</p>
        </div>
        <div
          className="LoginPage__content-button"
          ref={button}
          onClick={() => dispatch(startLogin())}
        >
          Login <Google onClick={() => dispatch(startLogin())} />
        </div>
        <div className="second-circles">
          {width > 1100 ? <Circles /> : <Edge2 />}
        </div>

        <div className="LoginPage__image">
          <div className="LoginPage_bg">
            <Bg />
          </div>
          <img src={BG2} ref={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
