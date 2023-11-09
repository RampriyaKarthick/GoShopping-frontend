import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/slices/productsSlice";
import productReducer from "./slices/slices/productSlice";
import authReducer from "./slices/slices/authSlice";

const reducer = combineReducers({
productsState:productsReducer,
productState:productReducer,
authState:authReducer
})


const store = configureStore({
reducer,
middleware:[thunk]
})

export default store;