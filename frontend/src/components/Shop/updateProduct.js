/*
import React, { Fragment, useState, useEffect } from "react";
import "./Updateprofile.css";
import Loader from "../layout/Loader/Loader";
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProduct} from "../../actions/shopAction";
import { getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../constants/shopConstants";
import MetaData from "../layout/MetaData";

export const UpdateProduct= ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { user } = useSelector((state) => state.auth);
    let {productid} =useParams();
    const { product } = useSelector(
        (state) => state.productDetails
      );
    let { error, isUpdated, loading } = useSelector((state) => state.updateproduct);
    const [productname, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    const [image_URL, setImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
    const shopname = user && user.length && user[0].shopname;
    console.log(shopname);    
    const updateProfileSubmit = (e) => {
      e.preventDefault();
      dispatch(updateProduct(productid,productname,description,price,stock,currency,category,image_URL,shopname));
    };
  
    
  
    useEffect(() => {
        dispatch(getProductDetails(productid))
        console.log(product.length)
        if (product){
            setProductName(product.productname);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setCurrency(product.currency);
            setCategory(product.category);
            setImage(product.image_URL);
        }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Product updated successfully");
  
        history.push(`/shop/${shopname}`);
  
        dispatch({
          type: UPDATE_PRODUCT_RESET,
        });
      }
    }, [dispatch, error, alert, history, isUpdated,productid]);
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
          <Fragment>
            <MetaData title="Update the product" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update a Product</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                   
                    <input
                      type="text"
                      placeholder="ProductName"
                      required
                      name="productname"
                      value={productname}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                
                    <input
                      type="text"
                      placeholder="Product Description"
                      required
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="updatedateofbirth">
                    <input
               type="number" 
               value={price}
               name='price'
               placeholder="Product Price"
               required
               onChange={ (e) => setPrice(e.target.value)}/>
                  </div>
                  <div className="stock">
                    <input  
                type="number" 
                placeholder="Product Quantity" 
                value={stock}
                name='stock'
                onChange={ (e) => setStock(e.target.value)}
                required/>
                  </div>
                  <div className="currency">
                  
                  <select  
               value={currency} 
               name='currency'
               onChange={e => setCurrency(e.target.value)}>
              <option value="null">SelectCurrency</option>
              <option value="USD">USD DOLLAR</option>
               <option value="INR">INDIAN RUPEE</option>
               <option value="CAD">CANADIAN DOLLAR</option>
               <option value="euro">EUROS</option>
             </select>
                  </div>
                 
  
                  <div className="category">
                   
                    <select  
               value={category} 
               name='category'
               onChange={e => setCategory(e.target.value)}>
              <option value="null">SelectCategory</option>   
              <option value="Clothing">Clothing</option>
               <option value="Jewellery">Jewellery</option>
               <option value="Entertainment">Entertainment</option>
               <option value="Home Decor">Home Decor</option>
               <option value="Art">Art</option>
             </select>
                  </div>
                  <div id="updateProfileImage">
                    <input
                      type="text"
                      placeholder="please enter image URL"
                      required
                      name="image_url"
                      value={image_URL}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
    </Modal.Body>
    <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProfileSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        )}
      </Fragment>
    );
  };
export default UpdateProduct;
*/