import React, { createContext, useReducer } from "react";
import { intitialstate, reducer } from "../../Utility/reducer";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, intitialstate }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, intitialstate)}>
      {children}
    </DataContext.Provider>
  );
};
