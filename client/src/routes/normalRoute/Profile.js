import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Container, Input, Form } from "reactstrap";
import { Link } from "react-router-dom";
import {
  USER_PROFILE_LOADING_REQUEST,
  USER_PROFILE_SEARCH_REQUEST,
} from "../../redux/type";
import UserPost from "../../components/userProfile/userProfile";
const Profile = (req) => {
  const dispatch = useDispatch();

  const { UserProfile } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: USER_PROFILE_LOADING_REQUEST,
      payload: req.match.params.info,
    });
  }, [dispatch]);
  console.log(UserProfile);

  const onSearchSumbmit = (e) => {
    e.preventDefault();
    console.log(e.target.Mysearch.value);
    const id = UserProfile._id;
    const title = e.target.Mysearch.value;
    let body = { id, title };
    dispatch({
      type: USER_PROFILE_SEARCH_REQUEST,
      payload: body,
    });
  };
  return (
    <Fragment>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "4px solid black",
        }}
        className="mb-3 pb-3"
      >
        <img
          className="rounded-circle"
          src={UserProfile.profile_imgUrl}
          style={{ width: "10rem", height: "10rem", marginLeft: "5em" }}
        />
        <div className="ml-5">
          <h1>{UserProfile.name}</h1>
        </div>
        <div className="ml-auto">
          {" "}
          {/* Changed here */}
          <Link to={"/userinfo"}>
            <Button color="success">회원 정보 수정</Button>
          </Link>
        </div>
      </Row>

      <Row className="d-flex justify-content-end mb-3">
        <Col xs="12" md="4">
          {" "}
          <Row style={{ display: "flex", flexDirection: "column" }}>
            <Form onSubmit={onSearchSumbmit}>
              <Input
                bssize="sm"
                className="mt-2"
                placeholder="제목 검색"
                name="Mysearch"
              />
            </Form>
          </Row>
        </Col>
      </Row>
      <UserPost posts={UserProfile.posts} />
    </Fragment>
  );
};

export default Profile;
