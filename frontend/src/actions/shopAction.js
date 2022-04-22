import axios from "axios";
import {
    SHOP_NAME_REQUEST,
    SHOP_NAME_SUCCESS,
    SHOP_NAME_FAIL,
    CLEAR_ERRORS,
    CREATE_SHOP_REQUEST,
    CREATE_SHOP_SUCCESS,
    CREATE_SHOP_FAIL,
    SHOP_DETAILS_REQUEST,
    SHOP_DETAILS_SUCCESS,
    SHOP_DETAILS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    SAVE_SHOP_IMAGE,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,

} from "../constants/shopConstants";

// chekcing the shopname is created or not
export const getShopAvailability =
  (keyword) =>
  async (dispatch) => {
    try {
      dispatch({ type: SHOP_NAME_REQUEST });
      const body = {
          shopname : keyword
      }
      const {data} = await axios.post('/api/shopname/uniqueshopname',body);
      console.log("received data" + data.success);
      if (data.success) {
        dispatch({
          type: SHOP_NAME_SUCCESS,
          payload: data.success,
        });
      } else {
        dispatch({
          type: SHOP_NAME_FAIL,
          payload: data.success
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      
    }
  };

// creating the shopname
  export const createShop =
  (keyword,email) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_SHOP_REQUEST });
      const body = {
          shopname : keyword,
          email : email
      }
      console.log(body);
      const {data} = await axios.post('/api/shopname/createshop',body);
      console.log("received data" + data.success);
      dispatch({
        type: CREATE_SHOP_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SHOP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//getting shop details
  export const getShopDetails = (shopname) => async (dispatch) => {
    //const body = JSON.stringify({productid});
    try {
      dispatch({ type: SHOP_DETAILS_REQUEST });
      console.log("action shop",shopname);
      const {data} = await axios.get("/api/shopname/getShopDetails/"+shopname);

      dispatch({
        
        type: SHOP_DETAILS_SUCCESS,
        payload: data.results,
        payload2 :data.shopdetails,
        payload1: data.totalsalesrevenue, 
      });
    } catch (error) {
      dispatch({
        type: SHOP_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //creating a product

  export const createProduct = (productname,description,price,stock,currency,category,image_URL,shopname) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
  
      const config = { headers: {  'Content-Type': 'application/json'} };
      const productData = {
        productname : productname,
        description : description,
        price : price,
        stock :stock,
        currency : currency,
      category :category,
        image_URL : image_URL ,
        shopname :shopname,
      }
      console.log(productData);
      const { data } = await axios.post(`/api/shopname/createproduct`, productData, config);
  
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (productid,productname,description,price,stock,currency,category,image_URL) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = { headers: {  'Content-Type': 'application/json'} };
      const productData = {
        productname : productname,
        description : description,
        price : price,
        stock :stock,
        currency : currency,
      category :category,
        image_URL : image_URL ,
      }
      console.log(productData);
      const { data } = await axios.post(`/api/shopname/updateproduct/`+productid, productData, config);
  
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const DeleteProduct = (productid) => async (dispatch) => {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      _id :productid,
      product :productid,
    }
    const body1 = JSON.stringify(body);
    console.log(body1);
    const {data} = await axios.post("/api/shopname/deleteproductfromshop/",body,config);;
    dispatch({
      type: DELETE_PRODUCT,
      payload: data.success,
    });
  };


  export const saveShopImage = (shopimage,email) => async (dispatch) => {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      shopimage :shopimage,
      email:email,
    }
    const body1 = JSON.stringify(body);
    console.log(body1);
    const {data} = await axios.post("/api/shopname/saveshopimage/",body,config);
      dispatch({
        type: SAVE_SHOP_IMAGE,
        payload: data.success,
      });
    };

    export const insertCategory = (shopname,category) => async (dispatch) => {
      try {
    
        const config = { headers: {  'Content-Type': 'application/json'} };
        const productData = {
          shopname : shopname,
          category :category,
        }
        const { data } = await axios.post(`/api/shopname/shopcategory`, productData, config);
    
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.success });
      } catch (error) {
        dispatch({
          type: CREATE_CATEGORY_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const getCategory = (shopname) => async (dispatch) => {
      try {
    
        const config = { headers: {  'Content-Type': 'application/json'} };
        const productData = {
          shopname : shopname,
        }
        const { data } = await axios.post(`/api/shopname/getshopcategory`, productData, config);
    
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.results });
      } catch (error) {
        dispatch({
          type: GET_CATEGORY_FAIL,
          payload: error.response.data.message,
        });
      }
    };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
