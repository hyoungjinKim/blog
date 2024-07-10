import React, { Fragment } from "react";
import { Button, Row } from "reactstrap";
import { FigureImage } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
const UserPost = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(
            ({ _id, title, date, fileUrl, comments, views, category }) => {
              return (
                <div key={_id}>
                  <Link to={`/posts/${_id}`} className="text-decoration-none">
                    <FigureImage
                      src={fileUrl}
                      alt="content"
                      style={{
                        width: 450,
                        height: 450,
                        objectFit: "scale-down",
                      }}
                    />
                    <p />
                    <h1 style={{ color: "black" }}>
                      <b>#{title}</b>
                    </h1>
                  </Link>
                  <span className="mr-3">
                    <Link to={`/posts/category/${category.categoryName}`}>
                      <Button
                        style={{
                          backgroundColor: "#28a745", // Changed here
                          borderColor: "#28a745", // Changed here
                          color: "#fff",
                        }}
                        className="rounded-pill"
                      >
                        {category.categoryName}
                      </Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <Row className="mb-3">
                    &nbsp;&nbsp;&nbsp;
                    <div>
                      <span>{date}</span>&nbsp;&nbsp;&nbsp;
                      <span>{comments.length}개의 댓글</span>&nbsp;&nbsp;&nbsp;
                      <span>
                        <FontAwesomeIcon
                          color="#37D087"
                          icon={solidHeart}
                          className="mr-1"
                          style={{ fontSize: "1.4rem", cursor: "pointer" }}
                        />
                        &nbsp; {views}
                      </span>
                    </div>
                  </Row>
                  <br />
                </div>
              );
            }
          )
        : 11}
    </Fragment>
  );
};

export default UserPost;
