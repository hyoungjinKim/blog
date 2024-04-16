import { combineReducers, conbineReducers } from "redux";
import { connectRouter } from "redux-first-history";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
  });

export default createRootReducer;
