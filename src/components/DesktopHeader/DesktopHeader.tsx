import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import SearchBar from "../SearchBar/SearchBar";
import { Musics } from "../../store/music/types";
import { loading, unloading, startLogout } from "../../store/auth/actions";
import MyModal from "../MyModal/MyModal";
import CardList from "../../containers/CardList/CardList";

import "./DesktopHeader.scss";

interface DesktopHeaderProps {}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({}) => {
  const [state, setState] = useState<Musics>([]);
  const selected = useSelector((state: any) => state.music.selected);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const onRequestClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    onRequestClose();
  }, [selected]);

  const onSearch = async (query: string, offset: number = 0) => {
    setQuery(query);
    dispatch(loading());
    const data = await Axios.get(
      `https://api.napster.com/v2.2/search/verbose?query=${query}&type=track&per_type_limit=3&offset=${
        offset * 3
      }`
    );
    setOpen(true);
    setState(
      data.data.search.data.tracks.map((music: any) => {
        return {
          id: music.id,
          by: music.artistName,
          name: music.name,
          seconds: music.playbackSeconds,
          imageUrl: `https://api.napster.com/imageserver/v2/albums/${music.albumId}/images/300x300.png`,
        };
      })
    );
    dispatch(unloading());
  };
  return (
    <div className="DesktopHeader">
      <MyModal
        open={open}
        onRequestClose={onRequestClose}
        onSearch={onSearch}
        query={query}
      >
        <CardList numOfCards={5} trending={state} isModal={true} />
      </MyModal>
      <SearchBar onSearch={onSearch} />
      <button onClick={() => dispatch(startLogout())}>Sign Out</button>
    </div>
  );
};

export default DesktopHeader;
