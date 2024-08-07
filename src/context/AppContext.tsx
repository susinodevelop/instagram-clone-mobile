import React, { createContext, ReactNode, useReducer } from "react";
import {
  AppReducer,
  GlobalState,
  GlobalStateAction,
  initialState,
} from "./AppReducer";

interface AppContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateAction>;
}

const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
