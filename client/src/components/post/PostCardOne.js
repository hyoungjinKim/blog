import React, { Fragment } from "react";
import {
  Row,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Badge,
} from "reactstrap";
import {} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const PostCardOne = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts) ? (
        posts.map(({ _id, title, fileUrl, comments, views, creator }) => {
          return (
            <div key={_id} className="col-md-4">
              <Link
                to={`posts/${_id}`}
                className="text-dark text-decoration-none"
              >
                <Card className="mb-3">
                  <CardImg top alt="카드이미지" src={fileUrl} />
                  <CardBody>
                    <CardTitle className="text-truncate d-flex justify-content-between">
                      <span className="text-truncate">{title}</span>
                      <span>
                        <span>{creator.name}</span>
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon={faMouse} />
                        &nbsp;
                        <span>{views}</span>
                      </span>
                    </CardTitle>
                    <Row>
                      <Button className="p-1 btn-block btn-success text-white ">
                        comments
                        <Badge
                          color="light"
                          className="text-dark"
                          style={{ marginLeft: "1em" }}
                        >
                          {comments.length}
                        </Badge>
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </div>
          );
        })
      ) : (
        <div>이미지 없음</div>
      )}
    </Fragment>
  );
};

export default PostCardOne;
