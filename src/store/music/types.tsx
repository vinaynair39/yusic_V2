import {
  trending,
  select,
  elapsed,
  setPlaylist,
  addMusicInPlayList,
  nextMusic,
  removeMusic,
  selectVideo,
} from "./actions";

export interface Music {
  imageUrl: string;
  name: string;
  by: string;
  id: string;
  seconds: number;
}

export interface PlaylistItem {
  imageUrl: string;
  name: string;
  by: string;
  musicUrl: string;
  id: string;
  seconds: number;
  liked: boolean;
}

export type Musics = Music[];
export type Playlist = PlaylistItem[];

export interface MusicState {
  trending: Musics;
  selected: PlaylistItem;
  playlist: Playlist;
  video: PlaylistItem;
  elapsed: number;
}

export type MusicActionInferred =
  | ReturnType<typeof trending>
  | ReturnType<typeof select>
  | ReturnType<typeof setPlaylist>
  | ReturnType<typeof addMusicInPlayList>
  | ReturnType<typeof elapsed>
  | ReturnType<typeof removeMusic>
  | ReturnType<typeof selectVideo>
  | ReturnType<typeof nextMusic>;
