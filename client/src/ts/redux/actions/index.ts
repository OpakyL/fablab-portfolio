import { bindActionCreators } from "redux";
import * as Actions from "./actions";
import store from "../store/store";

const actions = bindActionCreators(Actions, store.dispatch);

export default actions;