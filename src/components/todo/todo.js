import React, { useEffect, useContext } from "react";
import List from "./list.js";
import Form from "./form.js";
import { SettingContext } from "../../context/context";
import Pagination from "./pagination";
import Header from "../header/header";
const ToDo = () => {
  const states = useContext(SettingContext);

  const indexOfLastItem = states.currentPage * states.itemsPerPages;
  const indexOfFirstItem = indexOfLastItem - states.itemsPerPages;
  const currentItem = states.list.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    let incompleteCount = states.list.filter((item) => !item.complete).length;
    states.setIncomplete(incompleteCount);
  }, [states.list]);

  return (
    <>
      <div style={{ width: "70%", margin: "auto" }}>
        <div style={{ display: "flex" }}>
          <Form />
          <div style={{ width: "100%" }}>
            <List list={currentItem} />
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default ToDo;
