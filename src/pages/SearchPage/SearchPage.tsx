import React, { useState, useEffect, useRef } from "react";
import Layout from "../../containers/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./SearchPage.scss";

import { startLogout, loading, unloading } from "../../store/auth/actions";
import { Musics } from "../../store/music/types";
import CardList from "../../containers/CardList/CardList";
import { ReactComponent as Empty } from "../../assets/music2.svg";
import { AppState } from "../../store/configureStore";
import PlayBox from "../../components/PlayerBox/PlayBox";
import { DropResult } from "react-beautiful-dnd";

// import './SearchPage.scss'

interface SearchPageProps {}

export const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Musics>([]);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const { trending, playlist, selected, video } = useSelector(
    (state: AppState) => state.music
  );
  const [state, setState] = useState(playlist);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(state, result.source.index, result.destination.index);
    setState(items);
  };

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

  const onSearch = async (query: string, offset: number = 0) => {
    setQuery(query);
    dispatch(loading());
    setSearched(true);
    const data = await axios.get(
      `https://api.napster.com/v2.2/search/verbose?query=${query}&type=track&per_type_limit=4&offset=${
        offset * 3
      }`
    );
    setData(
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
    <Layout>
      <div className="animated fadeIn">
        <SearchBar onSearch={onSearch} state={data} />
        {searched ? (
          <CardList isModal={false} numOfCards={4} trending={data} />
        ) : (
          <div className="SearchPage__empty">
            <Empty />
          </div>
        )}
      </div>
      <PlayBox
        onDragEnd={onDragEnd}
        selected={selected}
        playlist={state}
        video={false}
      />
    </Layout>
  );
};

export default SearchPage;
