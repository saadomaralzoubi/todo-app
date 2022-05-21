import { useEffect, useState } from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TopSection from "./progress.js";
import { Container, Col, Row } from "react-bootstrap";

import "./todo.scss";

const ToDo = () => {
  const [list, setList] = useState([]);

  useEffect(
    () =>
      (document.title = `To Do List: ${
        list.filter((item) => !item.complete).length
      }`)
  );

  const _addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(newList);
    }
  };

  const _getTodoItems = () => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
      },
    ];
    setList(list);
  };

  useEffect(_getTodoItems, []);

  return (
    <Container>
      <Row className="mt-5 mb-4">
        <Col>
          <TopSection list={list} />
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <TodoForm handleSubmit={_addItem} />
        </Col>
        <Col md="8">
          <TodoList list={list} handleComplete={_toggleComplete} />
        </Col>
      </Row>
    </Container>
  );
};

export default ToDo;
