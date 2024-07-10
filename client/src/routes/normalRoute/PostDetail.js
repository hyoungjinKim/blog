import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  USER_LOADING_REQUST,
} from "../../redux/type";
import { Button, Row, Col, Container } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/editorConfig";
import Comments from "../../components/comments/Comments";

const PostDetail = () => {
  const { id } = useParams(); // useParams 훅을 사용하여 매개변수 id 읽어오기
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    if (id) {
      // id가 존재하는 경우에만 POST_DETAIL_LOADING_REQUEST와 USER_LOADING_REQUST dispatch
      dispatch({
        type: POST_DETAIL_LOADING_REQUEST,
        payload: id, // id를 payload로 전달
      });
      dispatch({
        type: USER_LOADING_REQUST,
        payload: localStorage.getItem("token"),
      });
    }
  }, [dispatch, id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: id, // id를 payload로 전달
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link to={`/post/${id}/edit`} className="btn btn-success btn-block">
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {postDetail && postDetail.creator && (
          <Fragment>
            <div className="font-weight-bold text-big">
              <span className="mr-3">
                <Button color="info">{postDetail.category.categoryName}</Button>
              </span>
              {postDetail.title}
            </div>
            <div className="align-self-end">{postDetail.creator.name}</div>
          </Fragment>
        )}
      </Row>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span>{postDetail.date}</span>
            &nbsp; &nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp; &nbsp;
            <FontAwesomeIcon icon={faMouse} />
            &nbsp;&nbsp;
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id}>
                        <Row className="justify-content-between p-2">
                          <div className="font-weight-bold">
                            {creatorName ? creatorName : creator}
                          </div>
                          <div className="text-small">
                            <span className="font-weight-bold">
                              {date.split(" ")[0]}
                            </span>
                            <span className="font-weight-light">
                              {" "}
                              {date.split(" ")[1]}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        <hr />
                      </div>
                    )
                  )
                : "No comments available"}
              <Comments
                id={id} // id를 Comments 컴포넌트로 전달
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row>
        </Fragment>
      ) : (
        <div>No post details available</div>
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default PostDetail;
