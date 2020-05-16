import React, { useState, useEffect, useRef } from "react";
import Player from "../../components/Player/Player";
import "./VideosPage.scss";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import PlayList from "../../containers/PlayList/PlayList";
import PlayBox from "../../components/PlayerBox/PlayBox";
import { AppState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import Layout from "../../containers/Layout/Layout";
import { playerUpOnly } from "../../animations";
import DesktopHeader from "../../components/DesktopHeader/DesktopHeader";

interface VideosPageProps {}

export const VideosPage: React.FC<VideosPageProps> = ({}) => {
  const { playlist, video, selected } = useSelector(
    (state: AppState) => state.music
  );

  const playboxHandle = (playing: boolean) => {
    setPlaying(playing);
  };
  const [playing, setPlaying] = useState(true);

  const [state, setState] = useState(playlist);
  let player = useRef(null);
  useEffect(() => {
    setState(playlist);
  }, [playlist]);

  const reorder = <X, Y, Z>(
    list: X[],
    startIndex: number,
    endIndex: number
  ): X[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(state, result.source.index, result.destination.index);
    setState(items);
  };
  return (
    <Layout>
      {window.innerWidth < 1000 ? (
        <PlayBox
          video={true}
          onDragEnd={onDragEnd}
          selected={video}
          playlist={state}
        />
      ) : (
        <div className="VideosPage">
          <div>
            <DesktopHeader />
          </div>
          <div className="VideosPage__player">
            <Player
              selected={selected}
              playlist={playlist}
              video={true}
              playing={playing}
              playboxHandle={playboxHandle}
              deanimate={() => {
                alert("HELLO");
              }}
            />
            <div className="VideoPage__playlist">
              <DragDropContext onDragEnd={onDragEnd}>
                <PlayList selected={selected} video={true} playlist={state} />
              </DragDropContext>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default VideosPage;
