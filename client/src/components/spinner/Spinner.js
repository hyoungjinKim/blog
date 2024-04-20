import React, { Fragment } from "react";
import { Row, Spinner } from "reactstrap";

export const GrowingSpinner = (
  <Fragment>
    <Row className="d-flex justify-content-center mb-5 mt-5">
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="primary"
        type="grow"
      >
        Loading...
      </Spinner>
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="secondary"
        type="grow"
      >
        Loading...
      </Spinner>
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="success"
        type="grow"
      >
        Loading...
      </Spinner>
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="danger"
        type="grow"
      >
        Loading...
      </Spinner>
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="warning"
        type="grow"
      >
        Loading...
      </Spinner>
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="info"
        type="grow"
      >
        Loading...
      </Spinner>

      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        color="dark"
        type="grow"
      >
        Loading...
      </Spinner>
    </Row>
  </Fragment>
);
