import React from "react";
import { useContext } from "react";
import { SettingContext } from "../../context/context";

const Pagination = () => {
  const states = useContext(SettingContext);
  const totalItems = states.list.length;
  const paginate = (pageNumber) => states.setCurrentPage(pageNumber);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / states.itemsPerPages); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination" style={{ position: "absolute", right: "50%" }}>
        <li className="page-item">
          <a
            className="page-link"
            href="/#"
            onClick={() =>
              states.currentPage > 1 ? paginate(states.currentPage - 1) : null
            }
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Previous
          </a>
        </li>
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="/!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            href="/#"
            onClick={() =>
              states.currentPage < Math.ceil(totalItems / states.itemsPerPages)
                ? paginate(states.currentPage + 1)
                : null
            }
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
