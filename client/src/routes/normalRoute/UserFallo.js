import React, { Fragment } from "react";
import { Button, Row } from "reactstrap";
import { Link } from "react-router-dom";

import profilImg from "../../assets/img/KakaoTalk_20240104_150512518.jpg";

const UserFallo = () => {
  return (
    <Fragment>
      <div>
        <h1>팔로워</h1>
      </div>
      <hr style={{ border: "none", borderBottom: "3px solid" }} />
      <Link
        to={"/user"}
        className="text-decoration-none"
        style={{ color: "black" }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="mb-3 pb-3"
        >
          <img
            className="rounded-circle"
            src={profilImg}
            style={{ width: "7rem", height: "7rem" }}
            alt="프로필 이미지"
          />
          <div>
            <div className="ml-5">
              <h4> 김형진</h4>
            </div>
            <div className="ml-5">
              <h5> 작성 게시물: 2개</h5>
            </div>
          </div>
          <div className="ml-auto">
            <Button color="success" className="rounded-pill">
              팔로워
            </Button>
          </div>
        </Row>
      </Link>
    </Fragment>
  );
};

export default UserFallo;
