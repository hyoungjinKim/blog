import axios from "axios";
import { call, all, put, takeEvery, fork } from "redux-saga/effects";
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
} from "../type";

//login
const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
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
    console.log(result, "RegisterUser Data");
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

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchuserLoading),
    fork(watchregisterUser),
    fork(watchclearError),
  ]);
}
