import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Play } from "../../assets/play.svg";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as MinusD } from "../../assets/minus-desktop.svg";
import { ReactComponent as PlusD } from "../../assets/plus-desktop.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";

import ContentLoader from "react-content-loader";

import ReactPlayer from "react-player";

import "./Player.scss";
import { PlaylistItem, Playlist } from "../../store/music/types";
import { useDispatch } from "react-redux";
import {
  elapsed,
  nextMusic,
  select,
  getVideoUrl,
  getMusicUrl,
} from "../../store/music/actions";
import Loader from "react-loader-spinner";
import useWindowSize from "../../useWindowSize";

interface PlayerProps {
  video: boolean;
  selected: PlaylistItem;
  playlist: Playlist;
  playing?: boolean;
  playboxHandle?: (played: boolean) => void;
  deanimate?: () => void;
}

const Player: React.FC<PlayerProps> = ({
  video,
  deanimate,
  playlist,
  selected,
  playboxHandle,
  playing,
}) => {
  let node1 = useRef(null);
  const inputRef = useRef<ReactPlayer>(null);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const { width } = useWindowSize();

  const [state, setState] = useState({
    playing: true,
    played: 0,
    seeking: false,
    loop: false,
    volume: 0.5,
    duration: 0.0,
    url: "",
  });

  const index =
    playlist.length > 0 &&
    playlist.findIndex(
      (element: PlaylistItem) => element.musicUrl == selected.musicUrl
    );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(elapsed(state.played));
    if (state.played == 1) {
      handlePause();
    }
  }, [state.played]);

  useEffect(() => {
    if (width > 1100 && !video && !!node1.current) {
      if (loaded) {
        if (!!node1.current) {
          node1.current.classList.add("animated");
          node1.current.classList.add("fadeIn");
        }
        setTimeout(() => {
          if (!!node1.current) {
            node1.current.classList.remove("animated");
            node1.current.classList.remove("fadeIn");
            if (state.played > 0 && state.playing) {
              node1.current.classList.add("rotating");
            }
          }
        }, 1000);
      }
    }
  }, [selected.imageUrl]);

  useEffect(() => {
    if (!video) {
      if (!!selected.musicUrl) {
        dispatch(getMusicUrl({ ...selected }));
      }
    }
    if (width > 1100 && !video) {
      node1.current.classList.add("display-none");
      setTimeout(() => {
        if (!!node1.current) {
          node1.current.classList.remove("display-none");
          node1.current.classList.add("animated");
          node1.current.classList.add("rollIn");
        }
      }, 1500);
      setTimeout(() => {
        if (!!node1.current) {
          node1.current.classList.remove("animated");
          node1.current.classList.remove("rollIn");
          node1.current.classList.add("rotating");
        }
        setLoaded(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (width > 1100 && !video) {
      if (state.playing && loaded) {
        if (!!node1.current) {
          node1.current.classList.remove("animated");
          node1.current.classList.remove("fadeIn");
          node1.current.classList.add("rotating");
        }
      } else if (!state.playing && loaded) {
        if (!!node1.current) {
          node1.current.classList.remove("rotating");
          node1.current.classList.add("animated");
          node1.current.classList.add("fadeIn");
        }
      }
    }
    setState({ ...state, playing });
  }, [playing]);

  const handleDuration = (time: number) => {
    setState({ ...state, duration: time });
  };
  const handlePlayPausehandlePause = () => {
    setState({ ...state, playing: !state.playing });
  };
  const handlePlay = () => {
    setState({ ...state, playing: true });
    playboxHandle(true);
  };
  const handlePause = () => {
    setState({ ...state, playing: false });
    playboxHandle(false);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, played: parseFloat(e.target.value) });
  };
  const handleSeekMouseUp = (e: any) => {
    setState({ ...state, seeking: false });
    inputRef.current.seekTo(parseFloat(e.target.value));
  };
  const handleSeekMouseDown = (
    e:
      | React.MouseEvent<HTMLInputElement, MouseEvent>
      | React.TouchEvent<HTMLInputElement>
  ) => {
    setState({ ...state, seeking: true });
  };
  const handleVolumeMinus = () => {
    setState({ ...state, volume: state.volume > 0 ? state.volume - 0.1 : 0 });
  };

  const handleVolumePlus = () => {
    setState({ ...state, volume: state.volume < 10 ? state.volume + 0.1 : 10 });
  };

  const handleProgress = (current: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (!state.seeking) {
      setState({ ...state, played: current.played });
    }
  };

  const handleEnded = () => {
    dispatch(nextMusic(index));
  };

  return (
    <div
      className={
        video
          ? width > 1100
            ? "VideoPlayer animated fadeIn"
            : "Player "
          : "Player"
      }
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
          width < 1100 && !video && deanimate();
        }
      }}
    >
      <div className="Player__video">
        <ReactPlayer
          ref={inputRef}
          playing={state.playing}
          onPause={handlePause}
          onPlay={handlePlay}
          onProgress={handleProgress}
          onReady={() => setReady(true)}
          loop={false}
          onDuration={handleDuration}
          onEnded={handleEnded}
          url={selected.musicUrl}
          width={video ? (width > 1100 ? "65vw" : "100vw") : "0"}
          height={video ? (width > 1100 ? "45vh" : "38vh") : "0"}
          style={{
            borderRadius: "10px",
            marginBottom: video ? "2vh" : 0,
            transition: "all 1s ease",
            display: video && !ready ? "none" : undefined,
          }}
          volume={state.volume}
        />
        {video &&
          !ready &&
          (width < 1100 ? (
            <ContentLoader
              width={"100vw"}
              height={"38vh"}
              style={{ marginBottom: "1.5vh" }}
              backgroundColor="#222831"
              foregroundColor="#1b1f26"
            >
              <rect x="0" y="" rx="" ry="" width="100vw" height="38vh" />
            </ContentLoader>
          ) : (
            <ContentLoader
              width={"65vw"}
              height={"45vh"}
              style={{ marginBottom: "1.5vh" }}
              backgroundColor="#222831"
              foregroundColor="#1b1f26"
            >
              <rect x="0" y="" rx="" ry="" width="65vw" height="45vh" />
            </ContentLoader>
          ))}
      </div>

      {!video && <img ref={node1} src={selected.imageUrl} alt="" />}
      {!video && (
        <>
          <div className="Player__title">{selected.name.substring(0, 35)}</div>
          <div className="Player__subtitle">{selected.by}</div>
        </>
      )}
      <div
        className={
          width > 1100 && video
            ? "Player__controls Player__controls2"
            : "Player__controls"
        }
      >
        <button className="Player__controls-volume" onClick={handleVolumeMinus}>
          {width > 1100 ? <MinusD /> : <Minus />}
        </button>
        {state.playing ? (
          <button className="Player__controls-click" onClick={handlePause}>
            {state.played == 0 ? (
              <Loader
                type="Puff"
                color={width > 1100 && !video ? "#F9E6D5" : "#A4A5A8"}
              ></Loader>
            ) : (
              <Pause onClick={handlePause} />
            )}
          </button>
        ) : (
          <button className="Player__controls-click" onClick={handlePlay}>
            <Play onClick={handlePlay} />
          </button>
        )}
        <button className="Player__controls-volume" onClick={handleVolumePlus}>
          {width > 1100 ? <PlusD /> : <Plus />}
        </button>
      </div>
      {playlist.length > 0 && (
        <div
          className={
            width > 1100 && video ? "Player__elapsed2" : "Player__elapsed"
          }
        >
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={state.played}
            onMouseDown={handleSeekMouseDown}
            onTouchStart={handleSeekMouseDown}
            onTouchEnd={handleSeekMouseUp}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
