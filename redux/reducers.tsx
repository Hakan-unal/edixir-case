import { combineReducers } from "redux";
import { konzek } from "./konzek/reducers";

const reducers = combineReducers({
    konzek: konzek,
});

export default reducers;