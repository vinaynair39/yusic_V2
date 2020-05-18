import axios from "axios";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import database, { fieldValue } from "../../firebase/firebase";
import { Musics, Playlist, PlaylistItem, Music } from "./types";
import { loading, unloading } from "../auth/actions";
import { AppActions, AppState } from "../configureStore";

export const trending = (trending: Musics) =>
  ({
    type: "ADD_MUSIC",
    trending,
  } as const);

export const select = (music: PlaylistItem) =>
  ({
    type: "SELECT_MUSIC",
    music,
  } as const);

export const selectVideo = (music: PlaylistItem) =>
  ({
    type: "VIDEO_URL",
    music,
  } as const);

export const elapsed = (value: number) =>
  ({
    type: "ELAPSED",
    value,
  } as const);

export const setPlaylist = (playlist: Playlist) =>
  ({
    type: "SET_PLAYLIST",
    playlist,
  } as const);

export const addMusicInPlayList = (music: PlaylistItem) =>
  ({
    type: "ADD_IN_PLAYLIST",
    music,
  } as const);

export const setMusicInPlayList = (music: PlaylistItem) =>
  ({
    type: "SET_IN_PLAYLIST",
    music,
  } as const);

export const removeMusic = (id: string) =>
  ({
    type: "REMOVE_MUSIC",
    id,
  } as const);

export const nextMusic = (index: number) =>
  ({
    type: "NEXT_MUSIC",
    index,
  } as const);

// export const getTrending = (offset: number = 0) => {
//   return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
//     const data = await axios.get(
//       `https://api.napster.com/v2.2/tracks/top?limit=20&offset=${offset * 20}`
//     );
//     let newData: Musics = [];
//     data.data.tracks.forEach(async (music: any) => {
//       newData.push({
//         id: music.id,
//         by: music.artistName,
//         name: music.name,
//         seconds: music.playbackSeconds,
//         imageUrl: `https://api.napster.com/imageserver/v2/albums/${music.albumId}/images/300x300.png`,
//       });
//     });
//     dispatch(trending(newData));
//   };
// };

export const startSetPlaylist = () => {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(loading());
    const uid = getState().auth.user.uid;
    database
      .doc(`users/${uid}`)
      .get()
      .then(async (doc: any) => {
        if (doc.exists) {
          console.log(doc.data());
          dispatch(setPlaylist(doc.data().playlist));
          if (doc.data().playlist.length > 0) {
            const selected = JSON.parse(localStorage.getItem("selected"));
            if (!!selected) {
              dispatch(select(selected));
            } else {
              dispatch(select(doc.data().playlist[0]));
            }
          } else {
            if (getState().music.trending.length > 0) {
              const trending = getState().music.trending;
              dispatch(getMusicUrl({ ...trending[8] }));
            } else {
              await dispatch(getTrending());
              const trending = getState().music.trending;
              dispatch(getMusicUrl({ ...trending[8] }));
            }
          }
        } else {
          if (getState().music.trending.length > 0) {
            const trending = getState().music.trending;
            dispatch(getMusicUrl({ ...trending[8] }));
          } else {
            await dispatch(getTrending());
            const trending = getState().music.trending;
            dispatch(getMusicUrl({ ...trending[8] }));
          }
        }
      })
      .catch(function (error: any) {
        console.log("Error getting document:", error);
      });
    dispatch(unloading());
  };
};

export const startAddMusic = (music: PlaylistItem) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(loading());
    const uid = getState().auth.user.uid;
    const db = database.collection(`users`).doc(`${uid}`);
    db.get()
      .then((doc: any) => {
        dispatch(addMusicInPlayList(music));
        if (doc.exists) {
          let playlist = doc.data().playlist;
          playlist = playlist.filter(
            (current: PlaylistItem) => current.id != music.id
          );
          db.set({
            playlist: [music, ...playlist],
          });
        } else {
          db.set({
            playlist: [music],
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    dispatch(unloading());
  };
};

export const getTrending = (offset: number = 0) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const data = await axios.get(
      `https://api.napster.com/v2.2/tracks/top?limit=20&offset=${offset * 20}`
    );
    let newData: Musics = [];
    data.data.tracks.forEach(async (music: any) => {
      newData.push({
        id: music.id,
        by: music.artistName,
        name: music.name,
        seconds: music.playbackSeconds,
        imageUrl: `https://api.napster.com/imageserver/v2/albums/${music.albumId}/images/300x300.png`,
      });
    });
    dispatch(trending(newData));
  };
};

export const setRemoveMusic = (music: PlaylistItem) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const uid = getState().auth.user.uid;
    const playlist = database.collection(`users`).doc(`${uid}`);
    playlist
      .update({
        playlist: fieldValue.arrayRemove(music),
      })
      .then(() => {
        dispatch(removeMusic(music.id));
      });
  };
};

export const getMusicUrl = (music: Music) => {
  return async (dispatch: any, getState: () => AppState) => {
    dispatch(loading());
    console.log(music);
    const data = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
        music.name + " " + music.by + " "
      }audio&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    console.log(data);
    const id = data.data.items[0].id.videoId;
    const url = `https://www.youtube.com/watch?v=${id}`;
    dispatch(
      select({
        ...music,
        liked: false,
        musicUrl: url,
      })
    );
    dispatch(
      startAddMusic({
        ...music,
        liked: false,
        musicUrl: url,
      })
    );
    dispatch(unloading());
  };
};

export const setMusicUrl = (music: Music) => {
  return async (dispatch: any, getState: () => AppState) => {
    dispatch(loading());
    console.log(music);
    const data = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
        music.name + " " + music.by + " "
      }audio&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    console.log(data);
    const id = data.data.items[0].id.videoId;
    const url = `https://www.youtube.com/watch?v=${id}`;
    dispatch(
      select({
        ...music,
        liked: false,
        musicUrl: url,
      })
    );
    dispatch(
      setMusicInPlayList({
        ...music,
        liked: false,
        musicUrl: url,
      })
    );
    dispatch(unloading());
  };
};

export const getVideoUrl = (music: Music) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(loading());
    dispatch(
      selectVideo({
        ...music,
        liked: false,
        musicUrl: "",
      })
    );
    const data = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
        music.name + " " + music.by + " "
      }official video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    console.log(data);
    const id = data.data.items[0].id.videoId;
    const url = `https://www.youtube.com/watch?v=${id}`;
    dispatch(
      selectVideo({
        ...music,
        liked: false,
        musicUrl: url,
      })
    );
    dispatch(unloading());
  };
};
