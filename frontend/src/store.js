/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, compose,combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//import reducer from './reducers';
import {productsReducer,
  productDetailsReducer,
  favproductsReducer} from "./reducers/productsReducer";
import {authReducer,profileReducer} from "./reducers/auth";
import {alert} from "./reducers/alert";
import { cartReducer } from './reducers/cartReducer';
import { uniqueshopReducer,createshopReducer,shopDetailsReducer,createProductReducer, updateProductReducer,shopcategory } from './reducers/shopReducer';
import { orderReducer } from './reducers/orderReducer';

const middleware = [thunk];

const reducer = combineReducers({
  products: productsReducer,
  productDetails : productDetailsReducer,
  auth : authReducer,
  alert : alert,
  cart :cartReducer,
  profile: profileReducer,
  shop : uniqueshopReducer,
  createshop: createshopReducer,
  shopdetail : shopDetailsReducer,
  createproduct :createProductReducer,
  updateproduct : updateProductReducer,
  getorder : orderReducer,
  favdetails : favproductsReducer,
  categorydetails: shopcategory,
});

let initialState = {};
const store = createStore(
     reducer,
   initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;