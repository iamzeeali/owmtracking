import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import customer from "./customerReducer";

export default combineReducers({
  auth,
  alert,
  customer,
});
