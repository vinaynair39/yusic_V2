import gsap from "gsap";
import React from "react";

export const playerUp = (
  node1: React.RefObject<HTMLDivElement>,
  node2: React.RefObject<HTMLDivElement>
) => {
  gsap.from(node1, {
    backgroundImage: "linear-gradient(#ffce9f, #e5a267)",
  });
  gsap.to(node1, {
    duration: 0.5,
    height: "calc(var(--vh, 1vh) * 85)",
    backgroundImage: "linear-gradient(#ffce9f, #e5a267)",
    // ease: "Power3.easeIn",
    display: "none",
    opacity: 0,
    onComplete: () => {
      gsap.set(node1, {
        clearProps: "backgroundImage",
      });
    },
  });
  gsap.from(node2, {
    duration: 0.5,
    y: 200,
    // ease: "Power3.easeIn",
    display: "block",
    onComplete: () => {
      gsap.set(node2, {
        clearProps: "y",
      });
    },
  });
  gsap.to(node2, {
    display: "block",
    opacity: 1,
  });

  gsap.to(".PlayList__text", {
    opacity: 1,
    display: "flex",
    y: 0,
  });
};

export const playerUpOnly = (node2: React.RefObject<HTMLDivElement>) => {
  gsap.from(node2, {
    duration: 0.5,
    y: 200,
    ease: "Power3.inOut",
    display: "block",
    onComplete: () => {
      gsap.set(node2, {
        clearProps: "y",
      });
    },
  });
  gsap.to(node2, {
    display: "block",
    opacity: 1,
  });
};

export const playerDownOnly = (node2: string) => {
  gsap.to(node2, {
    duration: 0.7,
    y: 500,
    opacity: 0,
    display: "none",
    onComplete: () => {
      gsap.set(node2, {
        clearProps: "y",
      });
    },
  });

  gsap.to(".PlayBox__player", {
    duration: 0.7,
    y: 500,
    opacity: 0,
    display: "none",
    onComplete: () => {
      gsap.set(".PlayBox__player", {
        clearProps: "y",
      });
    },
  });
  gsap.to(".PlayBox", {
    duration: 0.7,
    delay: 0.1,
    height: "6vh",
    opacity: 1,
    display: "grid",
  });
};

export const playerUpOnlyFade = (node2: React.RefObject<HTMLDivElement>) => {
  gsap.from(node2, {
    duration: 0.5,
    ease: "Power3.inOut",
    opacity: 0,
    display: "block",
  });
  gsap.to(node2, {
    display: "block",
    opacity: 1,
  });
};

export const playerDown = (
  node1: React.RefObject<HTMLDivElement>,
  node2: React.RefObject<HTMLDivElement>
) => {
  gsap.to(node2, {
    duration: 0.5,
    y: 500,
    opacity: 0,
    display: "none",
    onComplete: () => {
      gsap.set(node2, {
        clearProps: "y",
      });
    },
  });
  gsap.to(node1, {
    duration: 0.4,
    delay: 0.1,
    height: "6vh",
    opacity: 1,
    display: "grid",
  });
};
