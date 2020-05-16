import React, { useRef, useState, useEffect } from "react";
import "./PlayBox.scss";
import { ReactComponent as Play } from "../../assets/playbox-play.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import PlayList from "../../containers/PlayList/PlayList";
import { Playlist, PlaylistItem } from "../../store/music/types";
import Player from "../Player/Player";
import {
  playerUp,
  playerDown,
  playerUpOnly,
  playerUpOnlyFade,
} from "../../animations";
interface PlayerProps {
  onDragEnd: (result: DropResult) => void;
  selected: PlaylistItem;
  playlist: Playlist;
  video: boolean;
}

export const PlayBox: React.FC<PlayerProps> = ({
  onDragEnd,
  selected,
  playlist,
  video,
}) => {
  let playbox = useRef<HTMLDivElement>(null);
  let player = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  const playboxHandle = (playing: boolean) => {
    setPlaying(playing);
  };

  useEffect(() => {
    if (playlist.length > 0) {
      setPlaying(false);
    }
    if (video) {
      if (playlist.length > 0) {
        playerUpOnly(player);
      } else {
        playerUpOnlyFade(player);
      }
    }
  }, []);

  return (
    <>
      {!video && (
        <div ref={(el: any) => (playbox = el)} className="PlayBox">
          <img
            src={!!selected && selected.imageUrl}
            alt=""
            onClick={() => playerUp(playbox, player)}
          />
          <div
            className="PlayBox__name"
            style={
              selected.name.length > 23 || !!!playlist.length
                ? { fontSize: "0.8rem" }
                : { fontSize: "0.9rem" }
            }
            onClick={() => playerUp(playbox, player)}
          >
            <span>{!!selected && selected.name}</span>
            {!!!playlist.length && (
              <span>{"Click on any music or search for any to start!"}</span>
            )}
          </div>
          {playing ? (
            <button
              className="PlayBox__buttons"
              onClick={() => setPlaying(false)}
            >
              <Pause />
            </button>
          ) : (
            <button
              className="PlayBox__buttons"
              onClick={() => setPlaying(true)}
            >
              <Play />
            </button>
          )}
        </div>
      )}
      <div
        ref={(el: any) => (player = el)}
        className="PlayBox__player container"
      >
        {playlist.length > 0 && (
          <Player
            video={video}
            playing={playing}
            playboxHandle={playboxHandle}
            selected={selected}
            playlist={playlist}
            deanimate={() => playerDown(playbox, player)}
          />
        )}
        <div className="PlayBox__playlist">
          <DragDropContext onDragEnd={onDragEnd}>
            <PlayList selected={selected} video={video} playlist={playlist} />
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default PlayBox;
