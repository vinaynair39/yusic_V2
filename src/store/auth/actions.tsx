import { auth, googleAuthProvider } from "../../firebase/firebase";
import axios from "axios";

export const loading = () =>
  ({
    type: "LOADING",
  } as const);

export const unloading = () =>
  ({
    type: "UNLOADING",
  } as const);

export const login = (user: {
  uid: string | null;
  name: string | null;
  imageUrl: string | null;
  email: string | null;
}) =>
  ({
    type: "LOGIN",
    user,
  } as const);

export const logout = () =>
  ({
    type: "LOGOUT",
  } as const);

export const startLogin = () => {
  return () => {
    auth().signInWithPopup(googleAuthProvider);
    axios.defaults.headers.common["apiKey"] =
      process.env.REACT_APP_MUSIC_API_KEY;
  };
};

export const startLogout = () => {
  return () => {
    return auth().signOut();
  };
};
