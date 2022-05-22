import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
import { useContext } from "react";
import React from "react";
import { SettingContext } from "../../context/context";
export default function List(props) {
  function deleteItem(id) {
    const items = states.list.filter((item) => item.id !== id);
    states.setList(items);
    stringfiedData = JSON.stringify(items);
    localStorage.setItem("list", stringfiedData);
  }
  let stringfiedData;
  const states = useContext(SettingContext);
  const { list } = props;
  function toggleComplete(id) {
    const items = states.list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
        stringfiedData = JSON.stringify([...states.list]);
        localStorage.setItem("list", stringfiedData);
      }
      return item;
    });

    states.setList(items);
  }
  let activeList = [];
  if (states.showComplete) {
    activeList = list;
  } else {
    activeList = list.filter((item) => !item.complete);
  }
  return (
    <>
      {activeList.map((item) => (
        <div key={item.id}>
          <Card
            className="card-result"
            interactive={true}
            elevation={Elevation.TWO}
          >
            <div
              className="card-buttons"
              style={{ display: "flex", marginBottom: "15px" }}
            >
              <div className="card-tag">
                <Button
                  className={
                    item.complete ? "bp4-intent-success" : "bp4-intent-danger"
                  }
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.complete ? "completed" : "pending"}
                  {/* {item.complete.toString()} */}
                </Button>
                <span style={{ position: "absolute", right: "50%" }}>
                  {" "}
                  Assigned To : {item.assignee}
                </span>
              </div>
              <Button
                className="delete"
                onClick={() => deleteItem(item.id)}
                style={{ position: "absolute", left: "80%" }}
              >
                <Icon icon="cross" size={20} />
              </Button>
            </div>
            <hr />
            <div className="card-text">
              <span>To Do Item:{item.text}</span>

              <span style={{ position: "absolute", left: "78%" }}>
                Difficulty: {item.difficulty}
              </span>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
