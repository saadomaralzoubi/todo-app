import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TopSection from "./progress.js";
import useAjax from "../../hooks/useAjax.js";
import "./todo.scss";

const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [_postItem, _deleteItem, _putItem, _getItems] = useAjax(todoAPI);

  useEffect(
    () =>
      (document.title = `To Do List: ${
        list.filter((item) => !item.complete).length
      }`)
  );

  const _firstRequest = () => {
    const fetchData = async () => {
      const data = await _getItems();
      setList(data.results);
    };
    fetchData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(_firstRequest, []);

  return (
    <Container>
      <Row className="mt-5 mb-4">
        <Col>
          <TopSection list={list} />
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <TodoForm handleSubmit={_postItem} fetch={_firstRequest} />
        </Col>
        <Col md="8">
          <TodoList
            list={list}
            handleComplete={_putItem}
            handleDelete={_deleteItem}
            fetch={_firstRequest}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ToDo;
