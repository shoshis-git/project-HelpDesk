import React, { useEffect, useReducer, type FC } from "react";
import { createContext } from "react";
import type { User } from "../models/user";
import { currentUser } from "../pages/loginApi";



interface initialAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: any | null
};

type AuthAction = { type: "LOGIN_START" } | { type: "LOGIN_SUCCESS", payload: { token: string, user: User } } | { type: "LOGIN_FAILURE", payload: any } | { type: "REGISTER_SUCCESS", payload: { token: string, user: User } } | { type: "LOGOUT" };
const reducerAuth = (state: initialAuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state, loading: true, error: null
      }
    case "LOGIN_SUCCESS":
      return {
        ...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user, loading: false, error: null
      }
    case "LOGIN_FAILURE":
      return {
        ...state, isAuthenticated: false, token: null, user: null, loading: false, error: action.payload
      }
    case "REGISTER_SUCCESS":
      return {
        ...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user, loading: false, error: null
      }
    case "LOGOUT":
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: null
      };

    default:
      return state;



  }
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {
    state: { isAuthenticated: false, token: null, user: null, loading: false, error: null },
    dispatch: () => { }
  });

interface AuthContextType {
  state: initialAuthState;
  dispatch: React.Dispatch<AuthAction>;
}


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(reducerAuth, { isAuthenticated: false, token: null, user: null, loading: false, error: null });

  useEffect(() => {
    const loaderUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      dispatch({ type: "LOGIN_START" });
      try {
        const currentuser = await currentUser(token);

        if (currentuser) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              token,
              user: currentuser
            }
          });
        }

      }
      catch (err) {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });

      }

    }
    loaderUser();

  }, []);


  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
