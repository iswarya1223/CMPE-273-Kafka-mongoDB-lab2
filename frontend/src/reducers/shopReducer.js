import {
    SHOP_NAME_REQUEST,
    SHOP_NAME_SUCCESS,
    SHOP_NAME_FAIL,
    CLEAR_ERRORS,
    UPDATE_SHOP_NAME,
    CREATE_SHOP_FAIL,
    CREATE_SHOP_REQUEST,
    CREATE_SHOP_SUCCESS,
    SHOP_DETAILS_REQUEST,
    SHOP_DETAILS_SUCCESS,
    SHOP_DETAILS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT,
    SAVE_SHOP_IMAGE,
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
} from "../constants/shopConstants";

export const uniqueshopReducer = (state = { shopname : null}, action) => {
    switch (action.type) {
      case SHOP_NAME_REQUEST:
        return {
          loading: true,
        };
      case SHOP_NAME_SUCCESS:
        return {
          loading: false,
          shopname: action.payload,
        };
        case SHOP_NAME_FAIL:
      return {
        loading: false,
        shopname: action.payload,
      };
      case UPDATE_SHOP_NAME:
        return {
          ...state,
          shopname: null,
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

export const createshopReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_SHOP_REQUEST:
        return {
          loading: true,
        };
      case CREATE_SHOP_SUCCESS:
        return {
          loading: false,
          shopcreate: action.payload,
        };
        case CREATE_SHOP_FAIL:
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

export const shopDetailsReducer = (state = { shopdetails: [], shopsalesrevenue :[],shopimagestatus:[] }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SHOP_DETAILS_SUCCESS:
      return {
        loading: false,
        shopdetails: action.payload,
        shopsalesrevenue: action.payload1
      };
    case SHOP_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case SAVE_SHOP_IMAGE:
        return {
          loading: false,
          shopimagestatus:action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const updateProductReducer = (state = {isupdated : null, delete_product: null}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_PRODUCT:
        return {
          ...state,
           delete_product: action.payload
        };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const shopcategory = (state = {categories:[],insertcategory:[]}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: true,
        insertcategory: action.payload,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};