import { combineReducers } from "redux";
import alert from './alert';
import products from "./productsReducer";
import productDetails from "./productsReducer";
export default combineReducers({
    alert,
    products,
    productDetails,
});
