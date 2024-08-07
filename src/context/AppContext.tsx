import React from "react";

export const AppContext = React.createContext({
  userId: 0,
  login: () => {},
  logout: () => {},
});
