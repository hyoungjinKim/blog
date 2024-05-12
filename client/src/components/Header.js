import React from "react";
import { Row, Col } from "reactstrap";

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Create Blog</h1>
          <p>자신의 글을 작성해주세요</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
