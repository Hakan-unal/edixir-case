import { combineReducers } from "redux";
import { edixir } from "./edixir/reducers";

const reducers = combineReducers({
    edixir: edixir,
});

export default reducers;