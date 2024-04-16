import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "redux-first-history";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas/index";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const conposeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  conposeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
