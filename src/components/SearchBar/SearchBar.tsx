import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

import { Musics } from "../../store/music/types";
import { ReactComponent as Search } from "../../assets/searchbar.svg";

import "./SearchBar.scss";

interface SearchBarProps {
  state?: Musics;
  onSearch: (query: string, offset: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, state }) => {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [clicked, setClicked] = useState(false);
  let focusRef = useRef(null);
  useEffect(() => {
    if (clicked) {
      gsap.to(".MobileNav", {
        display: "none",
      });
    } else {
      gsap.to(".MobileNav", {
        display: "block",
      });
    }
  }, [clicked]);

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setClicked(false);
      return onSearch(query, offset);
    }
  };

  return (
    <div className="SearchBar" ref={focusRef}>
      <div className="SearchBar__image">
        <Search />
      </div>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"search"}
        onKeyDown={search}
      />
    </div>
  );
};

export default SearchBar;
