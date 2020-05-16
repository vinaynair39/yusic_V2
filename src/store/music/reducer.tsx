import {
  MusicState,
  MusicActionInferred,
  Playlist,
  Music,
  Musics,
  PlaylistItem,
} from "./types";

const initialState: MusicState = {
  trending: [],
  selected: {
    imageUrl: "",
    musicUrl: "",
    by: "",
    name: "",
    id: "",
    liked: false,
    seconds: 0,
  },
  playlist: [],
  elapsed: 0,
  video: {
    imageUrl: "",
    musicUrl: "",
    by: "",
    name: "",
    id: "",
    liked: false,
    seconds: 0,
  },
};

export const musicReducer = (
  state = initialState,
  action: MusicActionInferred
): MusicState => {
  switch (action.type) {
    case "ADD_MUSIC":
      let trending: Musics = state.trending;
      action.trending.map((music: Music) => trending.push(music));
      return {
        ...state,
        trending: trending,
      };
    case "SELECT_MUSIC":
      localStorage.setItem(
        "selected",
        JSON.stringify({
          ...action.music,
        })
      );
      return {
        ...state,
        selected: action.music,
        video: action.music,
      };
    case "NEXT_MUSIC":
      const data =
        state.playlist.length > action.index + 1
          ? state.playlist[action.index + 1]
          : state.selected;
      localStorage.setItem("selected", JSON.stringify({ ...data }));
      return {
        ...state,
        selected: data,
      };

    case "ADD_IN_PLAYLIST":
      const playlist = state.playlist.filter(
        (music: PlaylistItem) => music.id !== action.music.id
      );
      return {
        ...state,
        playlist: [action.music, ...playlist],
      };
    case "REMOVE_MUSIC":
      const index = state.playlist.findIndex(
        (music: PlaylistItem) => music.id === action.id
      );
      console.log(index, state.playlist.length - 1);
      const filtered = state.playlist.filter(
        (music: PlaylistItem) => music.id !== action.id
      );
      const temp =
        state.playlist.length > 0
          ? action.id === state.selected.id
            ? index !== state.playlist.length - 1
              ? state.playlist[index + 1]
              : state.playlist[index - 1]
            : state.selected
          : initialState.selected;
      const selected = !!temp ? temp : initialState.selected;
      localStorage.setItem("selected", JSON.stringify({ ...selected }));
      return {
        ...state,
        playlist: !!filtered.length ? filtered : [],
        selected: selected,
      };

    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };
    case "VIDEO_URL":
      return {
        ...state,
        video: action.music,
        selected: action.music,
      };
    case "ELAPSED":
      return {
        ...state,
        elapsed: action.value,
      };

    default:
      return state;
  }
};
