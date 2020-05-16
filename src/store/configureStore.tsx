import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { musicReducer } from "./music/reducer";
import { authReducer } from "./auth/reducer";
import { MusicActionInferred } from "./music/types";
import { AuthActionInferred } from "./auth/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  music: musicReducer,
});

export type AppActions = MusicActionInferred | AuthActionInferred;
export type AppState = ReturnType<typeof rootReducer>;

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
    )
  );
  return store;
};
