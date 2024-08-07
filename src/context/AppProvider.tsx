import React, { useContext, useState } from "react";
import { ReactNode } from "react";
import { AppContext } from "./AppContext";

interface Props {
  children: ReactNode;
}
const AppProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState<number>(1);
  const login = () => {
    alert("Login");
  }; //TODO revisar
  const logout = () => {
    alert("logout");
  }; //TODO revisar

  const defaultContext = {
    userId,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
