import React, { useState, Fragment,useEffect } from "react";
import MetaData from "../layout/MetaData";
//import "./Search.css";
import { useParams, Redirect} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {getCategory, getShopDetails, insertCategory} from "../../actions/shopAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import ShopProduct from './ShopProduct';
import { Modal, Button } from "react-bootstrap";
import { createProduct } from "../../actions/shopAction"
import { Image } from 'cloudinary-react'
import axios from 'axios';
import {saveShopImage} from '../../actions/shopAction';
import { loadUser } from "../../actions/auth";
//import "./Profile.css";


const ShopDetails = ({ history }) => {

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();
      let { shopname } = useParams();
      const{loading,shopdetails,shopsalesrevenue} = useSelector((state)=>state.shopdetail);
      const{user} =useSelector((state) =>state.auth);
      const email =user && user.length && user[0].email;
      const {categories} = useSelector((state)=>state.categorydetails)
      useEffect(() => {
        if(shopname)
        {
        dispatch(getShopDetails(shopname))
        dispatch(getCategory(shopname));
        }
        console.log("shop",shopsalesrevenue);
      }, [shopname])

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
      
      const { error, isUpdated } = useSelector((state) => state.createproduct);
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [image_URL, setImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
  const [shopimage,setShopImage] = useState('');
  const [newcategory,setNewcategory]=useState('');
      const uploadShopImage = async (e) => {
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
          setShopImage(res.data.secure_url)
        })
      }
      useEffect(() => {
        if (shopimage) {
          dispatch(saveShopImage(shopimage,email)).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname)));
        }},[shopimage])

  //const shopname = user && user.length && user[0].shopname;
  console.log(shopname);    
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (newcategory)
    {
      dispatch(insertCategory(shopname,newcategory)).then(()=>dispatch(createProduct(productname,description,price,stock,currency,newcategory,image_URL,shopname))).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname))).then(()=>dispatch(getCategory(shopname)));
      setShow(false);
    }
    else{
    dispatch(createProduct(productname,description,price,stock,currency,category,image_URL,shopname)).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname))).then(()=>dispatch(getCategory(shopname)));
    setShow(false);
    }

  };
    return (
    

          <><Fragment>
        {shopdetails && shopdetails.length && user && user.length &&
          <div className="profileContainer">

            <div>
              <h2>{shopname}</h2>
              <div id="updateProfileImage">
                

                 <Image
                    style={{ height: 160, width: 160, marginBottom: 20 }}
                    cloudName='dj3in4dua'
                    public_id={shopdetails[0].shopimage}/>
                    {shopname === user[0].shopname ?
                    <input
                      type='file'
                      className='form-control'
                      name='userName'
                      onChange={(e) => uploadShopImage(e)}
                    ></input> : ''}
              </div>
              <div>
              <br></br>
              {shopname === user[0].shopname ?
                <Button variant="primary" onClick={handleShow}>
                  Create New Product
                </Button> : ''}
                </div>
            </div>
            <div>
              <div>
                <h4> ownerName</h4>
                <p>{shopdetails[0].uname}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{shopdetails[0].email}</p>
              </div>
              <div>

                {shopname === user[0].shopname ? <h4>Total Sales Revenue</h4> : ''}
                {shopsalesrevenue
                  && shopsalesrevenue.length && shopname === user[0].shopname ? <h4>{shopsalesrevenue[0].totalsalesrevenue}</h4> : ''}

              </div>
              <div>
                <a href="#container">
               view Shop Products
               </a>
              </div>
            </div>

          </div>}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Fragment>
              <MetaData title="Create a product" />
              <div className="updateProfileContainer">
                <div className="updateProfileBox">

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
                      placeholder="Add your own category"  
                      required
                      name="category name"
                      value={newcategory}
                      onChange={(e) => setNewcategory(e.target.value)} /> : ''}
                    </div>
                    {image_URL && (
        <Image className="img"
          style={{ height: 80, width: 100, marginBottom: 20 }}
          cloudName='dj3in4dua'
          public_id={image_URL}
        />
      )}
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

      <div className="container" id="container">
          {shopdetails &&
            shopdetails.map((shopproduct) => (
              <ShopProduct shopproduct={shopproduct} history={history} shopname={shopname} />
            ))}
        </div>
          </Fragment></>
      
    );
          }


export default ShopDetails;