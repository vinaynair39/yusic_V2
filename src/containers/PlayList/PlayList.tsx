import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";

import PlayListItem from "../../components/PlayListItem/PlayListItem";
import { Playlist, PlaylistItem } from "../../store/music/types";
import { PlayListRow } from "../../ContentLoader";
import { AppState } from "../../store/configureStore";
import useWindowSize from "../../useWindowSize";
import { playerDownOnly } from "../../animations";
import { ReactComponent as Empty } from "../../assets/empty.svg";

import "./PlayList.scss";

interface PlayListProps {
  playlist: Playlist;
  video: boolean;
  selected: PlaylistItem;
}

const PlayList: React.FC<PlayListProps> = ({ playlist, video, selected }) => {
  const { elapsed } = useSelector((state: AppState) => state.music);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowSize();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <div className="PlayList">
        {!video && <h1>Playlist</h1>}
        {playlist.length > 0 || loading ? (
          width > 1100 ? (
            <Scrollbars
              style={{
                width: "39vw",
                height: video ? "34vh" : "43vh",
                overflowX: "hidden",
              }}
            >
              {playlist.length > 0 ? (
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {playlist.map((music, index) => (
                        <PlayListItem
                          elapsed={elapsed}
                          selected={selected}
                          video={video}
                          key={music.id}
                          {...music}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : (
                <PlayListRow />
              )}
            </Scrollbars>
          ) : (
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {playlist.map((music, index) => (
                    <PlayListItem
                      elapsed={elapsed}
                      selected={selected}
                      video={video}
                      key={music.id}
                      {...music}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        ) : (
          <div
            className="PlayList__text"
            onClick={() => {
              if (width < 1100) {
                playerDownOnly(".PlayList__text");
              }
            }}
          >
            <Empty />
          </div>
        )}
      </div>
    </>
  );
};

export default PlayList;
