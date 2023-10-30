import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/slices/productsSlice";
import productReducer from "./slices/slices/productSlice";

const reducer = combineReducers({
productsState:productsReducer,
productState:productReducer
})


const store = configureStore({
reducer,
middleware:[thunk]
})

export default store;