import React, { createContext, useReducer, useContext } from "react";

// creating context for the app
export const StateContext = createContext();

//
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
