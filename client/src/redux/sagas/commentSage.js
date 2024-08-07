import axios from "axios";
import { call, all, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
} from "../type";

//Load Comment
const loadCommentsAPI = (payload) => {
  console.log(payload, "loadCommnetAPI ID");
  return axios.get(`api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

//UPload Comment
const UploadCommentsAPI = (payload) => {
  console.log(payload.id, "UploadCommnetAPI ID");
  return axios.post(`api/post/${payload.id}/comments`, payload);
};

function* UploadComments(action) {
  try {
    const result = yield call(UploadCommentsAPI, action.payload);
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, UploadComments);
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchUpLoadComments)]);
}
