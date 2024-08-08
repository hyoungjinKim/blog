import axios from "axios";
import { call, all, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "react-router-redux";

import {
  LOGIN_FAILURE,
  LOGIN_REQUST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_REQUST,
  LOGOUT_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUST,
  REGISTER_REQUST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUST,
  USER_NAME_EDIT_REQUEST,
  USER_NAME_EDIT_SUCCESS,
  USER_NAME_EDIT_FAILURE,
  USER_EMAIL_EDIT_REQUEST,
  USER_EMAIL_EDIT_SUCCESS,
  USER_EMAIL_EDIT_FAILURE,
  USER_PASSWORD_EDIT_SUCCESS,
  USER_PASSWORD_EDIT_FAILURE,
  USER_PASSWORD_EDIT_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_PROFILEURL_EDIT_REQUEST,
  USER_PROFILEURL_EDIT_SUCCESS,
  USER_PROFILEURL_EDIT_FAILURE,
  USER_PROFILEURL_DELETE_SUCCESS,
  USER_PROFILEURL_DELETE_FAILURE,
  USER_PROFILEURL_DELETE_REQUEST,
} from "../type";

//login
const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: err.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUST, loginUser);
}

//logout
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
    yield put(push("/"));
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(err);
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUST, logout);
}

//register
const registerUserAPI = (req) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/user", req, config);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUST, registerUser);
}

//USer Laoding
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUST, userLoading);
}

//Clear Error
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUST, clearError);
}

//USer edit name
const usernameEditAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`api/auth/username/${payload.id}`, payload, config);
};

function* usernameEdit(action) {
  try {
    const result = yield call(usernameEditAPI, action.payload);
    yield put({
      type: USER_NAME_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_NAME_EDIT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchusernameEdit() {
  yield takeEvery(USER_NAME_EDIT_REQUEST, usernameEdit);
}

//USer edit email
const userEmailEditAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`api/auth/useremail/${payload.id}`, payload, config);
};

function* userEmailEdit(action) {
  try {
    const result = yield call(userEmailEditAPI, action.payload);
    yield put({
      type: USER_EMAIL_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_EMAIL_EDIT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserEmailEdit() {
  yield takeEvery(USER_EMAIL_EDIT_REQUEST, userEmailEdit);
}

//USer edit password
const userPasswordEditAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`api/auth/userpassword/${payload.id}`, payload, config);
};

function* userPasswordEdit(action) {
  try {
    const result = yield call(userPasswordEditAPI, action.payload);
    yield put({
      type: USER_PASSWORD_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_PASSWORD_EDIT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserPasswordEdit() {
  yield takeEvery(USER_PASSWORD_EDIT_REQUEST, userPasswordEdit);
}

//USer edit profile_Url
const userProfileUrlAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`api/user/userImg/${payload.id}`, payload, config);
};

function* userProfileUrl(action) {
  try {
    const result = yield call(userProfileUrlAPI, action.payload);
    yield put({
      type: USER_PROFILEURL_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_PROFILEURL_EDIT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserProfileUrl() {
  yield takeEvery(USER_PROFILEURL_EDIT_REQUEST, userProfileUrl);
}

//USer delete profile_Url
const userProfiledeleteAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`api/user/proflieDelete/${payload.id}`, payload, config);
};

function* userProfiledelete(action) {
  try {
    const result = yield call(userProfiledeleteAPI, action.payload);
    yield put({
      type: USER_PROFILEURL_DELETE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: USER_PROFILEURL_DELETE_FAILURE,
    });
  }
}

function* watchuserProfiledelete() {
  yield takeEvery(USER_PROFILEURL_DELETE_REQUEST, userProfiledelete);
}

//USer delete
const userDeleteAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.delete(`api/auth/${payload.id}`, config);
};

function* userDelete(action) {
  try {
    yield call(userDeleteAPI, action.payload);
    yield put({
      type: USER_DELETE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: USER_DELETE_FAILURE,
    });
  }
}

function* watchuserDelete() {
  yield takeEvery(USER_DELETE_REQUEST, userDelete);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchuserLoading),
    fork(watchregisterUser),
    fork(watchclearError),
    fork(watchusernameEdit),
    fork(watchuserEmailEdit),
    fork(watchuserPasswordEdit),
    fork(watchuserDelete),
    fork(watchuserProfileUrl),
    fork(watchuserProfiledelete),
  ]);
}
