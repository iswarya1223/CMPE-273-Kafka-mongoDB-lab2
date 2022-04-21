import React, { Fragment, useEffect, useState} from "react";
import { useParams, Redirect} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {getProductDetails} from "../../actions/productAction";
import {addItemsToCart} from "../../actions/cartAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import  {getFavDetails,addFavDetails,deleteFavDetails} from '../../actions/favoriteAction';
import { FaHeart,FaRegHeart} from "react-icons/fa";
import _ from "underscore";

 export const ProductDetails = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const favkeyword="undefined";
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    const {isAuthenticated,user} =useSelector(
      (state) => state.auth
    );
   
    const {favproducts} =useSelector((state)=>state.favdetails);
    const favid1 =_.pluck(favproducts,'productdetails');
  const favid =_.pluck(favid1,'_id');
      let { _id } = useParams();
      console.log(_id);
      const addToCartHandler = () => {
        if (isAuthenticated)
        {
          const email = user && user.length && user[0].email;
          const price = product && product.price;
          const shopname = product && product.shopname;
          const productname = product && product.productname;
          const image_URL = product && product.image_URL;
          dispatch(addItemsToCart(_id, quantity,email,price,shopname,productname,image_URL));
          alert.success("Item Added To Cart");
        }  
        else{
          history.push('/login');
      }
    };
    const email = user && user.length && user[0].email;
      useEffect(() => {
    
        dispatch(getProductDetails(_id));
        
        if (email) {
          dispatch(getFavDetails(favkeyword,email));
        }
      }, [dispatch,_id,email]);
      console.log(product)
      const [quantity, setQuantity] = useState(1);
      console.log("quantity is" +quantity);

  const increaseQuantity = () => {
    if (product.stock <= quantity)
    {
      alert.error('the item reached its maximum limit');
      return;
    }
    const qty = quantity + 1;

    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
 

   const favoriteitems = (e,email,productid) => {
   //e.preventDefault();
    e.stopPropagation(); // USED HERE!
    dispatch(addFavDetails(email,productid)).then(()=>dispatch(getFavDetails(favkeyword,email)));
    //history.push(`/login`);
  };
  const unfavoriteitems = (e,email,productid) => {
    console.log(e);
   //e.preventDefault();
   e.stopPropagation(); // USED HERE!
    dispatch(deleteFavDetails(email,productid)).then(()=>dispatch(getFavDetails(favkeyword,email)));
    //history.push(`/login`);
  };
  const isfav = (_id) => {
    return favid && favid.length && favid.indexOf(_id) !== -1;
  }

    return (
        <Fragment>
            <div className="ProductDetails" >
            <div className="productCard">
            { product && isAuthenticated &&  (isfav(product._id) ? (
      <FaHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" 
      onClick={(e) => unfavoriteitems(e,email,product._id)} />) :<FaRegHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" onClick={(e) => 
        favoriteitems(e,email,product._id)} />)}
                {product &&
                   <img
                      className="CarouselImage"
                      key={product.image_URL}
                      src={product.image_URL}
                      alt=''
                    />}
      

            </div>
            
            <div>
            {product && 
              <><div className="detailsBlock-1">
                <h2>{product.productname}</h2>
                <p>Product # {product._id}</p>
              </div><div className="detailsBlock-4">
                  Shopname:
                  <p><Link to={`/shop/${product.shopname}`}>{product.shopname}</Link></p>
                </div><div className="detailsBlock-3">
                {product.salescount ? <h6><i>sales count: </i>{product.salescount}</h6> :
       <h6><i>sales count: </i>0</h6>}
                  <h6><i>stock availability: </i>{product.stock}</h6>
                  <h1>{`${product.currency} ${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <p>{quantity}</p>
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={product.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b className={(product.stock < 1) ? { color: "redcolor" } : { color: "greencolor" }}>
                      {(product.stock < 1) ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div><div className="detailsBlock-4">
                  Description: <p>{product.description}</p>
                </div></>
 }
            </div>
 
                </div>
        </Fragment>
    )
 }

 export default ProductDetails;