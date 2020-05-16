import React, { useState, useEffect } from "react";
import "./App.scss";
import CardList from "./containers/CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store/configureStore";

import Layout from "./containers/Layout/Layout";
import PlayBox from "./components/PlayerBox/PlayBox";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import DesktopHeader from "./components/DesktopHeader/DesktopHeader";
import Player from "./components/Player/Player";
import PlayList from "./containers/PlayList/PlayList";
import useWindowSize from "./useWindowSize";
import Loader from "./components/Loader/Loader";
import gsap from "gsap";

const App: React.FC = ({}) => {
  const { width } = useWindowSize();
  const { trending, playlist, selected, video } = useSelector(
    (state: AppState) => state.music
  );
  const [state, setState] = useState(playlist);
  const [playing, setPlaying] = useState(true);

  const playboxHandle = (playing: boolean) => {
    setPlaying(playing);
  };

  // useEffect(() => {
  //   gsap.from(".overlay__text", 1.8, {
  //     y: 100,
  //     ease: "power4.out",
  //     delay: 0.8,
  //     skewY: 7,
  //     opacity: 0,
  //   });

  //   gsap.to(".overlay", 1, {
  //     ease: "power4.out",
  //     delay: 2.1,
  //     opacity: 0,
  //   });

  //   gsap.to(".Loader", 1, {
  //     ease: "power4.out",
  //     delay: 3.2,
  //     opacity: 0,
  //   });
  // }, []);

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
    <div className="App animated fadeIn">
      {/* <Loader /> */}
      <Layout>
        {width > 1100 && (
          <div className="App__header">
            <DesktopHeader />
          </div>
        )}
        <div className="App__card-list">
          <CardList
            isModal={false}
            numOfCards={width > 1100 ? 5 : 4}
            trending={trending}
          />
        </div>
        {width < 1100 && (
          <PlayBox
            onDragEnd={onDragEnd}
            selected={selected}
            playlist={state}
            video={false}
          />
        )}

        {width > 1100 && (
          <div className="App__media">
            <DragDropContext onDragEnd={onDragEnd}>
              <PlayList selected={selected} video={false} playlist={state} />
            </DragDropContext>
            <Player
              selected={selected}
              playlist={playlist}
              video={false}
              playing={playing}
              playboxHandle={playboxHandle}
            />
          </div>
        )}
      </Layout>
    </div>
  );
};

export default App;
