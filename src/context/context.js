import React from "react";
import { useState, useEffect } from "react";
export const SettingContext = React.createContext();

export default function StateProvider(props) {
  const [list, setList] = useState([]);
  const [showComplete, setShowComplete] = useState(true);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPages, setItemPerPages] = useState(3);
  const state = {
    list,
    incomplete,
    currentPage,
    itemsPerPages,
    showComplete,
    setShowComplete,
    setList,
    setIncomplete,
    setCurrentPage,
    setItemPerPages,
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("list"));
    if (items) {
      setList(items);
    }
  }, []);
  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
