import store from "../../store";
import { USER_LOADING_REQUST } from "../../redux/type";

const loadUser = () => {
  try {
    store.dispatch({
      type: USER_LOADING_REQUST,
      payload: localStorage.getItem("token"),
    });
  } catch (err) {
    console.log(err);
  }
};

export default loadUser;
