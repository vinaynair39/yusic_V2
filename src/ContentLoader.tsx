import React from "react";
import ContentLoader from "react-content-loader";

export const CardListColumn = () => {
  return (
    <ContentLoader
      width={"100vw"}
      height={"100vh"}
      backgroundColor="#222831"
      foregroundColor="#1b1f26"
    >
      <rect x="10vw" y="0" rx="20px" ry="20px" width="31vw" height="17vh" />
      {/* <rect x="10vw" y="18vh" rx="0" ry="0" width="31vw" height="25px" />
      <rect x="10vw" y="22vh" rx="0" ry="0" width="31vw" height="17px" /> */}

      <rect x="60vw" y="0" rx="20px" ry="20px" width="31vw" height="17vh" />
      {/* <rect x="60vw" y="18vh" rx="0" ry="0" width="31vw" height="25px" />
      <rect x="60vw" y="22vh" rx="0" ry="0" width="31vw" height="17px" /> */}

      <rect x="10vw" y="32vh" rx="20px" ry="20px" width="31vw" height="17vh" />
      {/* <rect x="10vw" y="49vh" rx="0" ry="0" width="31vw" height="25px" />
      <rect x="10vw" y="53vh" rx="0" ry="0" width="31vw" height="17px" /> */}

      <rect x="60vw" y="32vh" rx="20px" ry="20px" width="31vw" height="17vh" />
      {/* <rect x="60vw" y="49vh" rx="0" ry="0" width="31vw" height="25px" />
      <rect x="60vw" y="53vh" rx="0" ry="0" width="31vw" height="17px" /> */}
    </ContentLoader>
  );
};

export const CardListRow = () => {
  return (
    <ContentLoader
      width={"100vw"}
      height={"30vh"}
      backgroundColor="#222831"
      foregroundColor="#1b1f26"
    >
      <rect x="0" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="13.5vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="27vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="40.5vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="54vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
    </ContentLoader>
  );
};

export const CardRow = () => {
  return (
    <ContentLoader
      width={"10.5vw"}
      height={"22vh"}
      backgroundColor="#222831"
      foregroundColor="#1b1f26"
    >
      <rect x="0" y="0" rx="20px" ry="20px" width="10.5vw" height="22vh" />
      {/* <rect x="13.5vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="27vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="40.5vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" />
      <rect x="54vw" y="0" rx="20px" ry="20px" width="11vw" height="11vw" /> */}
    </ContentLoader>
  );
};

export const CardColumn = () => {
  return (
    <ContentLoader
      width={"50vw"}
      height={"17vh"}
      backgroundColor="#222831"
      foregroundColor="#1b1f26"
    >
      <rect x="30px" y="0" rx="20px" ry="20px" width="30vw" height="17vh" />
    </ContentLoader>
  );
};

export const PlayListRow = () => {
  return (
    <ContentLoader
      width={"39vw"}
      height={"7vh"}
      backgroundColor="#222831"
      foregroundColor="#1b1f26"
    >
      <rect x="0" y="0" rx="2px" ry="2px" width="38vw" height="6.5vh" />
      {/* <rect x="0" y="8.5vh" rx="2px" ry="2px" width="38vw" height="6.5vh" />
      <rect x="0" y="17vh" rx="2px" ry="2px" width="38vw" height="6.5vh" />
      <rect x="0" y="25.5vh" rx="2px" ry="2px" width="38vw" height="6.5vh" />
      <rect x="0" y="34vh" rx="2px" ry="2px" width="38vw" height="6.5vh" /> */}
    </ContentLoader>
  );
};
