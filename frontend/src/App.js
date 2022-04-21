/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';
//import Reactdom from 'reactdom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import  Home from './components/Home/Home';
import UserProfile from './components/dashboard/UserProfile';
import EditUser from './components/dashboard/EditUser';
import { Fragment, useEffect } from 'react';
import { Landing } from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import ProtectedRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import productDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Cart from "./components/Cart/Cart";
import Mypurchases from "./components/order/Mypurchases";
import {useSelector} from "react-redux";
import UserOptions from "./components/layout/UserOptions";
import ShopCreation from "./components/Shop/ShopCreation";
import ShopDetails from "./components/Shop/ShopDetails";
import CreateProduct from './components/Shop/createProduct';
import UpdateProduct from './components/Shop/updateProduct';
import Footer from "./components/layout/Footer";
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  const {isAuthenticated,user} = useSelector((state)=>state.auth);
  useEffect(() => {
          store.dispatch(loadUser())
  },[]);
  
  // return (
  //   <div className="App">
  //     <Navbar />
  //   <p>Hello</p>
  // </div>
  // );
  return (
 
  <Router>
      <Fragment>
        <Navbar />
        {isAuthenticated ? <UserOptions user={user}/> : ''}
          <Route exact path='/' component={Home}></Route>
          <Route exact path="/product/:_id" component={productDetails}></Route>
          <ProtectedRoute exact path='/products' component={Products}/>
          <Route path='/products/:keyword' component={Products}></Route>
          <Route exact path='/search' component={Search}></Route>
          <ProtectedRoute exact path="/cart" component={Cart}/>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/mypurchases" component={Mypurchases} />
          <ProtectedRoute exact path="/EditUser" component={EditUser} />
          <ProtectedRoute exact path="/shopcreation" component={ShopCreation}/>
          <ProtectedRoute exact path="/shop/:shopname" component={ShopDetails}/>
          <Route exact path="/CreateProduct" component={CreateProduct}></Route>
          <Route exact path="/updateshopproduct/:_id" component={UpdateProduct}></Route>
          <section className='container'>
          <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              
              <ProtectedRoute exact path="/UserProfile" component={UserProfile}/>
              
            </Switch>
          </section>
      </Fragment>
      <Footer />
  </Router>
  );
}
export default App;
