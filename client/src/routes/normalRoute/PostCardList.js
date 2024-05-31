import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUST } from "../../redux/type";
import { Helmet } from "react-helmet";
import { Row, Form, Input } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUST,
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Form>
        <Input className="mb-3 rounded-pill" type="select">
          <option>오늘</option>
          <option>이번 주</option>
          <option>이번 달</option>
        </Input>
      </Form>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </Fragment>
  );
};

export default PostCardList;
