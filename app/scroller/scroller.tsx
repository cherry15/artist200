import { useState } from "react";
import "./scroller.css";
import { Link, useNavigate } from "react-router";

export const Scroller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = 5

  let navigate = useNavigate();

  const getPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`#slide-${pageNumber}`);
  };

  const nextPage = () => {
    let newPage = currentPage < maxPages ? currentPage + 1 : 1
    getPage(newPage)
  };

const prevPage = () => {
    let newPage = currentPage > 1 ? currentPage - 1 : 1
    getPage(newPage)
  };

  return (
    <>
      <button className="next" onClick={nextPage} aria-label="Next" />
      <button
        className="prev"
        onClick={prevPage}
        aria-label="Previous"
      />
      <button
        onClick={() => getPage(2)}
        type="button"
        style={{ cursor: "pointer" }}
      >
        Page 2
      </button>
      <Link to={"#slide-4"}>Page 4</Link>
      <div className="slider">
        <a href="#slide-1">1</a>
        <a href="#slide-2">2</a>
        <a href="#slide-3">3</a>
        <a href="#slide-4">4</a>
        <a href="#slide-5">5</a>

        <div className="slides">
          <div id="slide-1">1</div>
          <div id="slide-2">2</div>
          <div id="slide-3">3</div>
          <div id="slide-4">4</div>
          <div id="slide-5">5</div>
        </div>
      </div>
    </>
  );
};
