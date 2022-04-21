import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/productConstants";
import {
  FAV_DETAILS_FAILURE,
    FAV_DETAILS_REQUEST,
    FAV_DETAILS_SUCCESS,
    DELETE_FAV_FAILURE,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_REQUEST,
    ADD_FAV_FAILURE,
    ADD_FAV_SUCCESS,
    ADD_FAV_REQUEST
}from "../constants/favConstants";

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload,
        };
        case ALL_PRODUCT_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
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

export const favproductsReducer = (state = { favproducts: [], adddeletefav: [] }, action) => {
  switch (action.type) {
    case FAV_DETAILS_REQUEST:
      return {
        loading: true,
        favproducts: [],
      };
    case FAV_DETAILS_SUCCESS:
      return {
        loading: false,
        favproducts: action.payload,
      };
      case FAV_DETAILS_FAILURE:
    return {
      loading: false,
      error: action.payload,
    };
    case DELETE_FAV_FAILURE:
    return {
      loading: false,
      error: action.payload,
    };
    case DELETE_FAV_REQUEST:
    return {
      loading: false,
      addeletefav: [],
    };
    case DELETE_FAV_SUCCESS:
    return {
      loading: false,
      addeletefav: action.payload,
    };
    case ADD_FAV_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
      case ADD_FAV_REQUEST:
      return {
        loading: false,
        addeletefav: [],
      };
      case ADD_FAV_SUCCESS:
      return {
        loading: false,
        addeletefav: action.payload,
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

