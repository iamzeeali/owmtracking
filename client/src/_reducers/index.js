import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import customer from "./customerReducer";
import grn from "./grnReducer";
import asn from "./asnReducer";
import feedback from "./feedbackReducer";

export default combineReducers({
  auth,
  alert,
  customer,
  asn,
  grn,
  feedback,
});
