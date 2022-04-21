import React from "react";
//import './CartItemCard.css';
import { Link } from "react-router-dom";
import moment from 'moment';
const OrderDetails = ({item}) => {
    return (
        <div className="CartItemCard">
        <img src={item.image_URL} alt=" " />
        <div>
          <span style={{color:'tomato'}}>Orderid# {item.orderid}</span>
          <Link to={`/product/${item.productid}`}>{item.productname}</Link>
          <span>{item.shopname}</span>
          <span>{`Price: ${item.currency} ${item.price}`}</span>
          <span>{moment(item.orderdate).format('DD MMM YYYY')}</span>
          <span style={{color:'blue'}}>Ordertotal# {item.totalprice}</span>
        </div>
      </div>
    );
}
export default OrderDetails;