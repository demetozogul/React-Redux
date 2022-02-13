import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./reducers/ProductReducer";

const combine  = combineReducers({
    ProductReducer,
})

export type StateType = ReturnType<typeof combine>

export const store = createStore(combine)