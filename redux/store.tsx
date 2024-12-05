import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers";
import { legacy_createStore as createStore } from "redux";

const logger = createLogger();

export function configureStore(initialState: any = {}) {
   const middlewares:any = [logger];

   const store = createStore(
      reducers,
      initialState,
      applyMiddleware(...middlewares)
   );

   return store;
}