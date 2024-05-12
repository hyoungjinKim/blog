import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-helmet";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUST,
} from "../../redux/type";
import {} from "reactstrap";
import CKEditor from "@ckeditor/ckeditor5-react";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  console.log(req);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUST,
      payload: localStorage.getItem("token"),
    });
  });

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };
  return <h1>DeTAIL</h1>;
};

export default PostDetail;
