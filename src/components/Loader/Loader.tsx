import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Logo } from "../../assets/logo-desktop.svg";
import Lottie from "lottie-web";
import * as animationData from "../../speaker.json";

import "./Loader.scss";
import gsap from "gsap";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  let container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../speaker.json"),
    });

    gsap.from(".overlay__text", 1.5, {
      display: "block",
      y: 100,
      ease: "power4.out",
      delay: 0.8,
      skewY: 7,
      opacity: 0,
      onComplete: () => {
        gsap.set(".overlay__text", {
          display: "block",
        });
      },
    });
  }, []);

  return (
    <div className="Loader">
      <div className="overlay">
        <div className="overlay__text">
          <Logo />
        </div>
        <div className="overlay__animation" ref={container}></div>
      </div>
    </div>
  );
};

export default Loader;
