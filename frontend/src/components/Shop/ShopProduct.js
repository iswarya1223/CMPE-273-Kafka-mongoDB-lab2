import React, { Fragment , useState} from "react";
import {Link} from "react-router-dom";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";  
import styled from "styled-components";
import {RiHeart3Fill} from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import {DeleteProduct,getShopDetails,updateProduct,insertCategory,getCategory} from "../../actions/shopAction";
import {Modal} from "react-bootstrap";
import { getProductDetails } from "../../actions/productAction";
import axios from 'axios';
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const ShopProduct= ({shopproduct,history,shopname}) => { 
   
  const [showModal, setShow] = useState(false);
    const alert = useAlert();
    const dispatch=useDispatch();
   // const { product } = useSelector(
     //   (state) => state.productDetails
      //);
   // let { error, isUpdated, loading } = useSelector((state) => state.updateproduct);
    //const [productid, setProductId] = useState("");
    const [productname, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    const [image_URL, setImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
    console.log(shopname);    
    const {categories} = useSelector((state)=>state.categorydetails)
    const [newcategory,setNewcategory]=useState('');

    const updateProductSubmit = (e,productid) => {
      e.preventDefault();
      if (newcategory)
    {
      dispatch(insertCategory(shopname,newcategory)).then(()=>dispatch(getCategory(shopname)));
      dispatch(updateProduct(productid,productname,description,price,stock,currency,newcategory,image_URL,shopname)).then(()=>dispatch(getShopDetails(shopname)))
      setShow(false);
    }
    else{
      dispatch(updateProduct(productid,productname,description,price,stock,currency,category,image_URL,shopname)).then(()=>dispatch(getShopDetails(shopname)));
    setShow(false);
    }
    };
    const uploadImage = async (e) => {
      e.preventDefault()
      // console.log('image',image);
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('cloud_name', 'dj3in4dua')
      formData.append('upload_preset', 'hbhuqhw2')
      // console.log('image',image);
      await axios.post(
        'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
        formData
      ).then((res) => {
        console.log(res.data.secure_url)
        setImage(res.data.secure_url)
      })
    }
   const favoriteHandler= (e) => {
    console.log(e);
   //e.preventDefault();
    e.stopPropagation(); // USED HERE!
    //history.push(`/login`);
  };
  const {isAuthenticated,user} = useSelector(state => state.auth);
  
  const shopproducts = (productid) => {
    history.push(`/product/${productid}`);
  }
  const deleteProductHandler = (e,productid,shopname) =>
  {
    e.stopPropagation(); 
    dispatch(DeleteProduct(productid)).then(() => dispatch(getShopDetails(shopname)));

  }
  const handleClose = () => setShow(false);

  const handleShow = (e,product) => 
  {
    e.stopPropagation();
    // dispatch(getProductDetails(productid))
    if (product){
      setProductName(product.productname);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCurrency(product.currency);
      setCategory(product.category);
      setImage(product.image_URL);
  }
    setShow(true);

  }
    return (
      <Fragment>
      {shopproduct && shopproduct.shopname && 
      <div className = "productCard" onClick={()=> shopproducts(shopproduct.productid)}> 
      {user && user.length && user[0].shopname === shopname ?
      ( <EditIcon onClick={(e)=> handleShow(e, shopproduct)}/> ) :''}
            {user && user.length && user[0].shopname === shopname ?
           (<Button
              onClick={(e) =>
                deleteProductHandler(e,shopproduct.productid,shopname)
              }
            >
              <DeleteIcon />
            </Button>) : ''}
        <p>{shopname}</p>
        <img src={shopproduct.image_URL} alt={shopproduct.productname} />
      <p>{shopproduct.productname}</p>
      <span>{shopproduct.currency} {shopproduct.price}</span>
      {shopproduct.salescount ? <span><i>total sales count:</i> {shopproduct.salescount}</span> :
      <span><i>total sales count: </i>0</span>}
        </div>
          }
        <Fragment>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update a Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update a Product</h2>

                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  
                >
                  <div className="updateProfileName">

                    <input
                      type="text"
                      placeholder="ProductName"
                      required
                      name="productname"
                      value={productname}
                      onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  <div className="updateProfileEmail">

                    <input
                      type="text"
                      placeholder="Product Description"
                      required
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="updatedateofbirth">
                    <input
                      type="text"
                      value={price}
                      name='price'
                      placeholder="Product Price"
                      required
                      onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="stock">
                    <input
                      type="number"
                      placeholder="Product Quantity"
                      value={stock}
                      name='stock'
                      onChange={(e) => setStock(e.target.value)}
                      required />
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
                      {categories && categories.map(categoryname => 
                        <option value={categoryname.category}>{categoryname.category}</option>
                        )}
                    </select>
                  </div>
                  <div>
                  {category === 'Custom'? <input
                      type="text"
                      placeholder="create your own category"  
                      required
                      name="category name"
                      value={newcategory}
                      onChange={(e) => setNewcategory(e.target.value)} /> : ''}
                    </div>
                  <div id="updateProfileImage">
                      <input
                        type='file'
                        className='form-control'
                        name='userName'
                        onChange={(e) => uploadImage(e)}
                      ></input>
                      </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e)=>updateProductSubmit(e,shopproduct.productid)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
          </Fragment>
          </Fragment>
    )
}
export default ShopProduct;
