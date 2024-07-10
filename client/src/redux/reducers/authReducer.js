import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUST,
  LOGOUT_SUCCESS,
  USER_LOADING_REQUST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUST,
  USER_NAME_EDIT_REQUEST,
  USER_NAME_EDIT_SUCCESS,
  USER_NAME_EDIT_FAILURE,
} from "../type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errMsg: "",
  successMsg: "",
  previousMatchMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUST:
    case LOGOUT_REQUST:
    case LOGIN_REQUST:
      return {
        ...state,
        errMsg: "",
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errMsg: "",
      };
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errMsg: action.payload.data.msg,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errMsg: "",
      };

    case CLEAR_ERROR_REQUST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errMsg: null,
        previousMatchMsg: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "Clear Error Fail",
        previousMatchMsg: "Clear Error Fail",
      };
    case USER_LOADING_REQUST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: "",
      };

    case USER_NAME_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_NAME_EDIT_SUCCESS:
      return {
        ...state,
        userName: action.payload.name1,
      };
    case USER_NAME_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
