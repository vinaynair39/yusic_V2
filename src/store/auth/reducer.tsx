import { Auth, AuthActionInferred } from "./types";

const initialState: Auth = {
  isAuthenticated: false,
  user: {
    uid: "",
    name: "",
    imageUrl: "",
    email: "",
  },
  loading: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActionInferred
): Auth => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UNLOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
