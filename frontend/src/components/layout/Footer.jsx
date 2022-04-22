
import React, { Fragment, useState, useEffect } from "react";
import { useAlert} from "react-alert";
import "./Footer.css";
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from "../../actions/auth";
import axios from 'axios';
import {addUserCurrency} from "../../actions/auth";

const Footer = () => {
    const dispatch = useDispatch();
   
    const [currency,setCurrency] = useState('USD');
    
    const onchangeCurrency =  (e)=>
    {
        e.preventDefault();
        setCurrency(e.target.value);
          
    }

    useEffect( () =>
  {
    dispatch(addUserCurrency(currency));
    },[dispatch, currency]);
   
   
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4><b>United States</b></h4>
      </div>
      <div>
      <select  
             value={currency} 
             name='currency'
             onChange={(e) => onchangeCurrency(e)}>
            <option value="null">Select currency</option>
            <option value="USD">USD</option>
             <option value="INR">INR</option>
             <option value="EURO">EURO</option>
             <option value="Dinar">Dinar</option>
             <option value="CAD">CAD</option>
           </select>
      </div>

      <div className="midFooter">
        <h1>Etsy.Inc</h1>
        <p>customers are our assets</p>
        <p>Copyrights 2022 &copy; Iswarya Mary</p>
      </div>

      <div className="rightFooter">
        <h4>Contact Us</h4>
        <p>etsy@customerservice.in</p>
        <p>+1234567890</p>
      </div>
    </footer>
  );
};

export default Footer;