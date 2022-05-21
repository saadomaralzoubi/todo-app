import { useContext, useState, useEffect } from "react";
import { Toast, Badge, Pagination, Form, Row, Col } from "react-bootstrap";
import { PaginationContext } from "../../context/pagenation";
import { AuthContext } from "../../context/auth";

const TodoList = (props) => {
  const context = useContext(PaginationContext);
  const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(context.startingPage);
  const maxItems = context.itemCount;
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const numOfPages = list.length / maxItems + 1;
  const indexOfLastItem = currentPage * maxItems;
  const indexOfFirstItem = indexOfLastItem - maxItems;
  const currentList = list.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = (num) => setCurrentPage(num);

  const pageNums = [];
  let activePage = currentPage;
  for (let num = 1; num < numOfPages; num++) {
    pageNums.push(
      <Pagination.Item
        key={num}
        className={num === activePage ? "active" : ""}
        onClick={() => nextPage(num)}
      >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              disabled={activePage === 1 ? true : false}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            />
            {pageNums}
            <Pagination.Next
              disabled={activePage > numOfPages - 1 ? true : false}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
          </Pagination>
        </Col>
        <Col>
          <Form>
            <Form.Control
              as="select"
              onChange={(e) => context.setItemCount(e.target.value)}
            >
              <option value="3">Items per Page</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value={list.length}>All</option>
            </Form.Control>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Control
              as="select"
              onChange={(e) => {
                if (e.target.value === "all") setList(props.list);
                else {
                  let completed = list.filter(
                    (item) => item.complete === Boolean(e.target.value)
                  );
                  setList(completed);
                  setCurrentPage(1);
                }
              }}
            >
              <option value="all">Filter by</option>
              <option value={1}>Completed</option>
              <option value="">Pending</option>
            </Form.Control>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Control
              as="select"
              onChange={(e) => {
                context.setSortField(e.target.value);
                if (e.target.value === "all") setList(props.list);
                else if (e.target.value === "difficultyA") {
                  setList(list.sort((a, b) => a.difficulty - b.difficulty));
                  setCurrentPage(1);
                } else if (e.target.value === "difficultyD") {
                  setList(list.sort((a, b) => b.difficulty - a.difficulty));
                  setCurrentPage(1);
                } else if (e.target.value === "complete") {
                  setList(
                    list.sort((a, b) =>
                      a.complete === b.complete ? 0 : a.complete ? 1 : -1
                    )
                  );
                  setCurrentPage(1);
                }
              }}
            >
              <option value="all">Sort by</option>
              <option value="difficultyA">Difficulty (Ascending)</option>
              <option value="difficultyD">Difficulty (Descending)</option>
              <option value="complete">Completion</option>
            </Form.Control>
          </Form>
        </Col>
      </Row>
      {currentList.map((item) => (
        <Toast
          key={item._id}
          style={{ maxWidth: "100%" }}
          onClose={async () => {
            if (authContext.user.capabilities.includes("delete")) {
              await props.handleDelete(item);
              await props.fetch();
            } else {
              alert("You don't have the permession to delete!");
            }
          }}
        >
          <Toast.Header>
            <Badge
              pill
              variant={item.complete ? "success" : "warning"}
              onClick={async () => {
                if (authContext.user.capabilities.includes("update")) {
                  await props.handleComplete(item);
                  await props.fetch();
                } else {
                  alert("You don't have the permession to update!");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {item.complete ? "Complete" : "Pending..."}
            </Badge>
            <strong className="mr-auto ml-4">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            <h3
              className={`ml-3 ${
                item.complete ? "text-muted text-decoration-line-through" : ""
              }`}
            >
              {item.text}
            </h3>
            <br />
            <p className="float-right" style={{ fontSize: "85%" }}>
              Difficulty: {item.difficulty}
            </p>
            <br />
          </Toast.Body>
        </Toast>
      ))}
    </>
  );
};
export default TodoList;
