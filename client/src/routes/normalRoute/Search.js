import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/type";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
const Search = () => {
  const dispatch = useDispatch();
  let { searchTerm } = useParams();
  const { searchResult } = useSelector((state) => state.post);

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);
  return (
    <div>
      <h1>검색결과: "{searchTerm}"</h1>
      {searchResult && searchResult.length > 0 ? (
        <Row>
          <PostCardOne posts={searchResult} />
        </Row>
      ) : (
        <Fragment>
          <br />
          <h1>검색 결과가 없습니다.</h1>
        </Fragment>
      )}
    </div>
  );
};

export default Search;
