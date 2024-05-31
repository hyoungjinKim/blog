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
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_FAILURE,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
} from "../type";

//All Posts load
const loadPostAPI = () => {
  return axios.get("api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
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
    yield put(push("/"));
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
    console.log(result);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/posts/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

//Post Detail
const loadPostDetailAPI = (payload) => {
  return axios.get(`api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

//Post Delete
const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(payload.id);
  console.log(config);
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

//Post EDIT load
const PostEditLoadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(payload.id);
  console.log(config);
  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* PostEditLoad(action) {
  try {
    const result = yield call(PostEditLoadAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, PostEditLoad);
}

//Post EDIT Upload
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(payload);
  console.log(config);
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/posts/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
  ]);
}
