import {applyMiddleware, createStore} from "redux";
import combine from "../redusers/CombainRedusers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

const composeEnhancers = composeWithDevTools({trace: true});
export const store = createStore(combine, composeEnhancers(applyMiddleware(thunk)));