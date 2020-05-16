import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./PlayListItem.scss";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { select, setRemoveMusic, getVideoUrl } from "../../store/music/actions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { PlaylistItem } from "../../store/music/types";
import useWindowSize from "../../useWindowSize";
// import { formatPlaybackTime } from "../Player/Player";

interface PlayListItemProps {
  imageUrl: string;
  name: string;
  id: string;
  index: number;
  by: string;
  musicUrl: string;
  video: boolean;
  seconds: number;
  selected: PlaylistItem;
  elapsed: number;
}

export function formatPlaybackTime(seconds: number) {
  function pad(string: number) {
    return ("0" + string).slice(-2);
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export const PlayListItem: React.FC<PlayListItemProps> = ({
  imageUrl,
  id,
  musicUrl,
  name,
  index,
  seconds,
  selected,
  elapsed,
  video,
  by,
}) => {
  const crossRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    if (video) {
      if (selected.id === id) {
        dispatch(
          getVideoUrl({
            imageUrl,
            name,
            by,
            id,
            seconds,
          })
        );
      }
    }
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target !== crossRef.current && e.target !== buttonRef.current) {
      video
        ? dispatch(
            getVideoUrl({
              imageUrl,
              name,
              by,
              id,
              seconds,
            })
          )
        : dispatch(
            select({
              imageUrl,
              musicUrl,
              name,
              by,
              id,
              liked: false,
              seconds,
            })
          );
    }
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            !!selected && id === selected.id
              ? "PlayListItem background "
              : "PlayListItem"
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <div className="PlayListItem__first">
            <img src={imageUrl} alt="" />
          </div>
          <div className="PlayListItem__second">
            <p>{!!name && name.substring(0, 22)}</p>
          </div>
          {width > 1100 && (
            <div className="PlayListItem__second">
              <p>{!!by && by.substring(0, 22)}</p>
            </div>
          )}
          <div className="PlayListItem__second2">
            <p>
              {!!selected && selected.id == id
                ? formatPlaybackTime(seconds * (1 - elapsed))
                : formatPlaybackTime(seconds)}
            </p>
          </div>
          <div
            className="PlayListItem__third"
            ref={buttonRef}
            onClick={() =>
              dispatch(
                setRemoveMusic({
                  imageUrl,
                  id,
                  musicUrl,
                  name,
                  liked: false,
                  seconds,
                  by,
                })
              )
            }
          >
            <Cross ref={crossRef} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PlayListItem;
