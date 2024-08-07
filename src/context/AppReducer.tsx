import React, { useReducer } from "react";

// Definimos las acciones posibles
const LOGIN = "action_login";
const LOGOUT = "action_logout";

// Reducer que maneja las acciones
interface GlobalState {
  userId: number;
}

interface GlobalStateAction {
  type: string;
}

const initialState: GlobalState = { userId: 1 };

const AppReducer = (
  state: GlobalState,
  action: GlobalStateAction
): GlobalState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: 1 }; //TODO revisar accion
    case LOGOUT:
      return { ...state, userId: -1 }; //TODO revisar accion
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export { AppReducer, initialState, GlobalState, GlobalStateAction };
