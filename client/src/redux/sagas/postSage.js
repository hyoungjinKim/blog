import axios from "axios";
import { fork, takeEvery, call, put, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_LOADINGE_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUST,
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

export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
