import {
    FAV_DETAILS_REQUEST,
    FAV_DETAILS_SUCCESS,
    FAV_DETAILS_FAILURE,
    DELETE_FAV_FAILURE,
    DELETE_FAV_REQUEST,
    DELETE_FAV_SUCCESS,
    ADD_FAV_REQUEST,
    ADD_FAV_SUCCESS,
    ADD_FAV_FAILURE
}from "../constants/favConstants";
import axios from "axios";

export const getFavDetails = (favkeyword,email) => async (dispatch) => {
    console.log("favkeyword",favkeyword);
    dispatch({ type: FAV_DETAILS_REQUEST });
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
      favkeyword: favkeyword,
      email : email
    };  
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/getfavourite",body,config);
    console.log(data);
    dispatch({
      type: FAV_DETAILS_SUCCESS,
      payload: data.favorites,
    });
  }
    catch (error) {
      dispatch({
        type: FAV_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteFavDetails = (email,productid) => async (dispatch) => {
    dispatch({ type: DELETE_FAV_REQUEST });
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        product:productid,
      email : email,
    }
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/deletefavourite",body1,config);
    console.log(data);
    dispatch({
      type: DELETE_FAV_SUCCESS,
      payload: data,
    });
  }
    catch (error) {
      dispatch({
        type: DELETE_FAV_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  export const addFavDetails = (email,productid) => async (dispatch) => {
    dispatch({ type: ADD_FAV_REQUEST });
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        product:productid,
      email : email,
    }
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/addfavourite",body1,config);
    console.log(data);
    dispatch({
      type: ADD_FAV_SUCCESS,
      payload: data,
    });
  }
    catch (error) {
      dispatch({
        type: ADD_FAV_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
  