import {

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    CLEAR_ERRORS,
  } from "../constants/orderConstants";
export const orderReducer = (
    state = { orderItems: []},action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          orderItems: action.payload,
          ordersCount : action.payload1
        };
      case ORDER_DETAILS_FAILURE:
        return {
          loading: false,
          error: action.payload,
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