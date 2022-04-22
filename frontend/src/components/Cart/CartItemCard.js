import React, { Fragment,useEffect,useState} from "react";
import './CartItemCard.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartDetails,addGiftOption,addGiftDescription} from "../../actions/cartAction";
const CartItemCard = ({item, deleteCartItems }) => {
  const dispatch = useDispatch();
  const [description,setNewDescription] = useState('');
  const {isAuthenticated,user} =useSelector(
    (state) => state.auth
  );
  const {currency} = useSelector(state => state.currency);
  const email=user && user.length && user[0].email;
  const handleChange = (productid,giftoption) => {
    if(giftoption === true){
      giftoption = false;
      dispatch(addGiftOption(productid, email, giftoption)).then(()=> dispatch(getCartDetails(email)));
    }
    else{
      giftoption = true
      dispatch(addGiftOption(productid, email, giftoption)).then(()=> dispatch(getCartDetails(email)));
      }
  };
  const handleDescription = (productid,giftdescription) =>
  {
    dispatch(addGiftDescription(productid, email, giftdescription)).then(()=> dispatch(getCartDetails(email)));
  }
    return (
        <div className="CartItemCard">
        <img src={item.image_URL} alt=" " />
        <div>
          <Link to={`/product/${item.product._id}`}>{item.productname}</Link>
          <span>{`Price: ${currency} ${item.price}`}</span>
          <p onClick={() => deleteCartItems(item.product._id)}>Remove</p>
        </div>
        <div>
        <input style={{"color": "black", "top":"20px","font-size":"13px",}} id="excludeoutofstock" type="checkbox" checked={item.giftoption} onChange={(e) => {handleChange(item.product._id,item.giftoption)}} />
   This order is a Gift
   {item.giftoption === true ?
   <><input
              type="text"
              placeholder="add a message to the gift"
              required
              name="message"
              value={item.giftdescription}
              onChange={(e) => setNewDescription(e.target.value)} /><button onClick={() => handleDescription(item.product._id, description)}>submit</button></>
                      : ''}
  </div>
      </div>
    );
}

export default CartItemCard;