import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getMusicUrl } from "../../store/music/actions";
import { CardRow } from "../../ContentLoader";
import useWindowSize from "../../useWindowSize";

import "./Card.scss";

interface CardProps {
  imageUrl: string;
  id: string;
  name: string;
  by: string;
  seconds: number;
  isModal: boolean;
}

export const Card: React.FC<CardProps> = ({
  name,
  by,
  imageUrl,
  id,
  seconds,
  isModal,
}) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { width } = useWindowSize();

  return (
    <>
      {!loaded && width > 1100 && <CardRow />}
      <div
        className="Card animated fadeIn"
        style={{
          display: !loaded && width > 1100 ? "none" : undefined,
          transition: "all 2s ease-in",
        }}
        onClick={() =>
          dispatch(getMusicUrl({ name, by, imageUrl, seconds, id }))
        }
      >
        <img src={imageUrl} alt="" onLoad={() => setLoaded(true)} />
        <p>{isModal ? name : name.substring(0, 20)}</p>
        <span>{by}</span>
      </div>
    </>
  );
};

export default Card;
