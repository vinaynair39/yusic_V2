import React, { useState, useEffect, useRef } from "react";
import "./CardList.scss";
import { Musics } from "../../store/music/types";
import Card from "../../components/Card/Card";
import { ReactComponent as Right } from "../../assets/right.svg";
import { ReactComponent as Left } from "../../assets/left.svg";
import { useDispatch } from "react-redux";
import { getTrending } from "../../store/music/actions";
import { CardListColumn, CardListRow } from "../../ContentLoader";
import { useLocation } from "react-router-dom";
import Reward from "react-rewards";
import useWindowSize from "../../useWindowSize";

interface CardListProps {
  trending: Musics;
  isModal: boolean;
  numOfCards: number;
}

export const CardList: React.FC<CardListProps> = ({
  trending,
  numOfCards,
  isModal = false,
}) => {
  const [offset, setOffset] = useState(0);

  const [sequence, setSequence] = useState({
    minValue: 0,
    maxValue: numOfCards,
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const { width } = useWindowSize();

  let reward = useRef(null);
  useEffect(() => {
    if (sequence.maxValue == trending.length - 1) {
      dispatch(getTrending(offset + 1));
      setOffset(offset + 1);
    }
    console.log(sequence);
  }, [sequence]);

  const handleNext = () => {
    setSequence({
      minValue: sequence.maxValue,
      maxValue:
        sequence.maxValue + numOfCards < trending.length
          ? sequence.maxValue + numOfCards
          : trending.length - 1,
    });
  };

  const handlePrevious = () => {
    setSequence({
      minValue:
        sequence.minValue - numOfCards > 0 ? sequence.minValue - numOfCards : 0,
      maxValue: sequence.minValue,
    });
  };

  return (
    <div className={isModal ? "CardList CardList2" : "CardList"}>
      {!isModal && <h1>Trending</h1>}
      {trending.length > 1 ? (
        trending
          .slice(sequence.minValue, sequence.maxValue)
          .map((card, index) => {
            return <Card key={card.id} {...card} isModal={isModal} />;
          })
      ) : width < 1100 ? (
        <CardListColumn />
      ) : (
        <CardListRow />
      )}
      {!isModal && (
        <div
          className={
            location.pathname === "/search"
              ? "CardList__change2"
              : "CardList__change"
          }
        >
          {location.pathname !== "/search" && (
            <>
              <button
                disabled={sequence.minValue == 0}
                onClick={handlePrevious}
              >
                <Left />
              </button>
              <button disabled={sequence.maxValue == 0} onClick={handleNext}>
                <Right />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CardList;
