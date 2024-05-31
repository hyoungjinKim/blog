import {
  POST_LOADINGE_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
} from "../type";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_REQUST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_LOADINGE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        loading: false,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
      };
    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
