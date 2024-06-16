import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Container, Input, Form } from "reactstrap";
import { Link } from "react-router-dom";
import profilImg from "../../assets/img/KakaoTalk_20240104_150512518.jpg";
import { USER_PROFILE_LOADING_REQUEST } from "../../redux/type";
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
          src={profilImg}
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
          {/* Changed here */}
          <Row style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Link
                to={"user/follo"}
                style={{ color: "black" }}
                className="text-decoration-none"
              >
                <span>1 팔로워</span>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                to={"user/follo"}
                style={{ color: "black" }}
                className="text-decoration-none"
              >
                <span>1 팔로잉</span>
              </Link>
            </div>
            <Form>
              <Input bssize="sm" className="mt-2" placeholder="제목 검색" />
            </Form>
          </Row>
        </Col>
      </Row>
      <UserPost posts={UserProfile.posts} />
    </Fragment>
  );
};

export default Profile;
