


import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch} from "react-icons/bs";
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { FaHeart,FaRegHeart} from "react-icons/fa";
import Search from '../Product/Search';
import {useHistory} from "react-router-dom"

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const history = useHistory();
  const dispatch = useDispatch();
    const alert = useAlert();
    const {user} = useSelector((state)=>state.auth)
  const authLinks = (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
    <ul className="navbar-nav">
    <li>
        <Link to="/UserProfile">
        <FaRegHeart className="card-btn" style={{color: 'blue'}} title="Favourites" size="1.5em"/>
  </Link>
      </li> 
      <li>
        <br></br>
        <br></br>
      </li>
      <li>
      <Link to="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} href="#!">
        <Link to ="/" className="nav-link">Logout</Link>
        </a>
      </li>
    </ul>
    </nav>
  );

  const guestLinks = (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to ="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
      <Link to ="/login" className="nav-link">Login</Link>
      </li>
      <li>
      <Link to="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      </Link>
      </li>
    </ul>
    </nav>
  );

  return (
    <nav className="navbar bg-light">
      <h1>
        <Link to="/products">
          Etsy
        </Link>
      </h1>
      <Search history ={history}/>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
