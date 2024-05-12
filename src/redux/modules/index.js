import { combineReducers } from "redux";

import auth from "./auth.js";

const root = combineReducers({
  auth,
});

export default root;
