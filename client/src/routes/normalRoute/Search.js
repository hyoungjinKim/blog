import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import PostCardList from "./PostCardList";
const Search = () => {
  return (
    <div>
      <h1>검색결과:</h1>
      <Row>
        <PostCardList />
      </Row>
    </div>
  );
};

export default Search;
