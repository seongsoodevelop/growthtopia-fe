import { combineReducers } from "redux";

import control from "./control.js";
import auth from "./auth.js";
import user from "./user.js";
import work from "./work.js";

const root = combineReducers({
  control,
  auth,
  user,
  work,
});

export default root;
