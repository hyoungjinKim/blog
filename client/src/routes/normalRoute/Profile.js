import React, { Fragment } from "react";
import { Button, Row, Col, Container, Input, Form } from "reactstrap";
import { Link } from "react-router-dom";
import profilImg from "../../assets/img/KakaoTalk_20240104_150512518.jpg";
import img from "../../assets/img/스크린샷 2024-05-07 052903.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const category = () => {
    return <Fragment></Fragment>;
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
          src={profilImg}
          style={{ width: "10rem", height: "10rem", marginLeft: "5em" }}
        />
        <div className="ml-5">
          <h1> 김형진</h1>
        </div>
        <div className="ml-auto">
          {" "}
          {/* Changed here */}
          <Link to={"user/info"}>
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
      <Fragment>
        <Link to={`/posts/1`} className="text-decoration-none">
          <img src={img} alt="content" />
          <p />
          <h1 style={{ color: "black" }}>
            <b>#React</b>
          </h1>
        </Link>
        <br />
        <h5>react</h5>
        <span className="mr-3">
          <Button
            style={{
              backgroundColor: "#28a745", // Changed here
              borderColor: "#28a745", // Changed here
              color: "#fff",
            }}
            className="rounded-pill"
          >
            React
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            style={{
              backgroundColor: "#28a745", // Changed here
              borderColor: "#28a745", // Changed here
              color: "#fff",
            }}
            className="rounded-pill"
          >
            Redux
          </Button>
        </span>
        <Row className="mb-3">
          &nbsp;&nbsp;&nbsp;
          <div>
            <span>2024.05.06</span>&nbsp;&nbsp;&nbsp;
            <span>1개의 댓글</span>&nbsp;&nbsp;&nbsp;
            <span>
              <FontAwesomeIcon
                color="#37D087"
                icon={solidHeart}
                className="mr-1"
                style={{ fontSize: "1.4rem", cursor: "pointer" }}
              />
              &nbsp; 2
            </span>
          </div>
        </Row>
      </Fragment>
    </Fragment>
  );
};

export default Profile;
