import React, { useState, Fragment,useEffect } from "react";
//import MetaData from "../layout/MetaData";
import "./shopsearch.css";
import { clearErrors, getShopAvailability,createShop} from '../../actions/shopAction';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {UPDATE_SHOP_NAME} from '../../constants/shopConstants'
import { loadUser } from "../../actions/auth";

const ShopCreation = ({ history }) => {
const dispatch = useDispatch();
    const alert = useAlert();
  const [shopName, setshopName] = useState("");
  const {shopname, error } = useSelector(state=>state.shop)
  const {user} =useSelector(state=>state.auth)
  const address = user && user.length && user[0].address;
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getShopAvailability(shopName));

    //if (keyword.trim()) {
      //history.push(`/shop/${keyword}`);
    //} else {
      //history.push("/products");
    //}
  };

  useEffect(() => {
    if (shopname) {
      alert.success("Shop Name is unique");
      if (address){
      dispatch(createShop(shopName,user[0].email)).then(() => dispatch(loadUser())).then(()=> history.push(`/shop/${shopName}`));
      history.push(`/shop/${shopName}`);
      }
      else
      {
        alert.error('Address filed should be filled before creating the shopname');
      }
      dispatch({
        type: UPDATE_SHOP_NAME,
      });
    }
    if (shopname === false) {
      alert.error("shop is already created");
    }
  }, [shopname,address]);
  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Create a shop page ...."
          onChange={(e) => setshopName(e.target.value)}
        />
        <input type="submit" value="CheckShopAvailability" />
      </form>
    </Fragment>
  );
};

export default ShopCreation;