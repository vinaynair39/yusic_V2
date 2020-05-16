import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import axios from "axios";
import { Provider } from "react-redux";
import { auth } from "./firebase/firebase";
import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import { login, logout } from "./store/auth/actions";
import { getTrending, startSetPlaylist, select } from "./store/music/actions";
import { Playlist } from "./store/music/types";
import * as serviceWorker from "./serviceWorker";
import "animate.css";
import Loader from "./components/Loader/Loader";
import gsap from "gsap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>
);

let hasRendered = false;
let animated = false;
ReactDOM.render(<Loader />, document.getElementById("root"));
animated = true;

export const renderApp = () => {
  gsap.to(".overlay", 1, {
    ease: "power4.out",
    delay: 1.5,
    opacity: 0,
  });
  gsap.to(".Loader", 1, {
    ease: "power4.out",
    delay: 1.8,
    opacity: 0,
  });
  setTimeout(() => {
    if (!hasRendered) {
      ReactDOM.render(jsx, document.getElementById("root"));
      hasRendered = true;
    }
  }, 2000);
};

auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(
      login({
        uid: user.uid,
        name: user.displayName,
        imageUrl: user.photoURL,
        email: user.email,
      })
    );
    axios.defaults.headers.common["apiKey"] =
      process.env.REACT_APP_MUSIC_API_KEY;
    renderApp();
    store.dispatch<any>(getTrending());
    store.dispatch<any>(startSetPlaylist());
    const selected = JSON.parse(localStorage.getItem("selected"));
    if (!!selected) {
      store.dispatch(select(selected));
    }
    if (history.location.pathname === "/login") {
      history.push("/");
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
