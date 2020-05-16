import { login, logout, loading, unloading } from "./actions";

export interface Auth {
  isAuthenticated: boolean;
  user: {
    uid: string | null;
    name: string | null;
    imageUrl: string | null;
    email: string | null;
  };
  loading: boolean;
}

export type AuthActionInferred =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof loading>
  | ReturnType<typeof unloading>;
