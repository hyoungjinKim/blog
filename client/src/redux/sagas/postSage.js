import axios from "axios";
import { fork, takeEvery, call, put, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_LOADINGE_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUST,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
} from "../type";

//All Posts load
const loadPostAPI = () => {
  return axios.get("api/post");
};

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    console.log(result, "loadPosts");
    yield put({
      type: POST_LOADINGE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: err,
    });
    yield push("/");
  }
}

function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUST, loadPosts);
}

//Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPosts function");
    const result = yield call(uploadPostAPI, action.payload);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: err,
    });
    yield push("/");
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchuploadPosts)]);
}
