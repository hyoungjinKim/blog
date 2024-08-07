import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUST } from "../../redux/type";
import { Helmet } from "react-helmet";
import { Row, Form, Input, Alert } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const skipNumber = 6;
  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUST,
      payload: skipNumber,
    });
  }, [dispatch]);

  const skipNumberRef = useRef(skipNumber);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - skipNumber;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    const [visible, setVisible] = useState(false);
    const [poststate, setPoststate] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0 && !loading) {
            if (remainPostCount < skipNumber && !poststate) {
              dispatch({
                type: POST_LOADING_REQUST,
                payload: Number(postCount),
              });
              setPoststate(true);
            } else if (!poststate && !loading) {
              dispatch({
                type: POST_LOADING_REQUST,
                payload: skipNumberRef.current + skipNumber,
              });
              skipNumberRef.current += skipNumber;
            }
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef, visible];
  };
  const [lastPostElementRef, visible] = useOnScreen({
    threshold: "1",
  });
  return (
    <Fragment>
      <Helmet title="Home" />

      <Row className="border-bottom border-top border-primary py-2 mb-3 ">
        <Category posts={categoryFindResult} />
      </Row>

      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>

      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            더 이상의 포스트는 없습니다.
          </Alert>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PostCardList;
