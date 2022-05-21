import React, { useState } from "react";

export const PaginationContext = React.createContext();

function PaginationProvider(props) {
  const [itemCount, setItemCount] = useState(3);
  const [startingPage, setStartingPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const [sortField, setSortField] = useState("difficultyA");

  const state = {
    display,
    itemCount,
    sortField,
    startingPage,
    setDisplay,
    setItemCount,
    setSortField,
    setStartingPage,
  };

  return (
    <PaginationContext.Provider value={state}>
      {props.children}
    </PaginationContext.Provider>
  );
}

export default PaginationProvider;
