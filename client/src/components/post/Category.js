import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";

const Category = ({ posts }) => {
  return (
    <>
      {Array.isArray(posts) ? (
        posts.map(({ _id, categoryName, posts }) => (
          <div key={_id} className="mx-1 mt-1 my_category">
            <Link
              to={`/posts/category/${categoryName}`}
              className="text-dark text-decoration-none"
            >
              <span className="ml-1">
                <Button color="info">
                  {categoryName}&nbsp;
                  <Badge color="light" style={{ color: "black" }}>
                    {posts.length}
                  </Badge>
                </Button>
              </span>
            </Link>
          </div>
        ))
      ) : (
        <div>작성된 카테고리가 없습니다.</div>
      )}
    </>
  );
};

export default Category;
