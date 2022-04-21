import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_DETAILS_FAILURE,
    CLEAR_ERRORS,
  } from "../constants/cartConstants";
// reducer of add to cart
  export const cartReducer = (
    state = { cartItems: []},action) => {
    switch (action.type) {
      case CART_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CART_DETAILS_SUCCESS:
        return {
          loading: false,
          cartItems: action.payload,
        };
      case CART_DETAILS_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
        case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.productid !== action.payload),
      };
        case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
        default:
      return state;
  }
};