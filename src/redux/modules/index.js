import { combineReducers } from "redux";

import control from "./control.js";
import auth from "./auth.js";
import user from "./user.js";

const root = combineReducers({
  control,
  auth,
  user,
});

export default root;
