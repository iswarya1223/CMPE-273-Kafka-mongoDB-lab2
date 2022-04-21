/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import moment from 'moment';
import  FavProduct from './FavProduct';
import { getFavDetails } from "../../actions/favoriteAction";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
const UserProfile = ({ history }) => {
  const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
    const {favproducts} =useSelector((state)=>state.favdetails);
    const email = user && user.length && user[0].email;
    const [favkeyword,setFavKeyword] =useState('undefined');
    useEffect(() => {
      if (isAuthenticated === false) {
        history.push("/login");
      }
      if (email)
      {
        dispatch(getFavDetails(favkeyword,email)); 
      }
    }, [history, isAuthenticated,email]);
    const searchfavproducts = (e) =>
    {
      e.preventDefault();
      if (favkeyword.trim()) {
        dispatch(getFavDetails(favkeyword,email));
        //history.push("/userProfile");
      } else {
        dispatch(getFavDetails(favkeyword,email));
        //history.push("/userProfile");
      }
    };
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
          {user && user.length && 
            <><MetaData title={`${user[0].uname}'s Profile`} /><div className="profileContainer">
                  <div>
                    <h1>{user[0].uname}</h1>
                    <img src={user[0].picture} alt={user[0].uname} />
                    <Link to="/EditUser">Edit Profile</Link>
                  </div>
                  <div>
                    <div>
                      <h4>Email</h4>
                      <p>{user[0].email}</p>
                    </div>
                    <div>
                      <a href="#container">
                        view Favorite Products
                      </a>
                    </div>
                  </div>
                </div><h2 className="homeHeading">Favorite Products</h2><form>
                    <input
                      type="text"
                      placeholder="Search a FavoriteProduct ..."
                      onChange={(e) => setFavKeyword(e.target.value)} />
                    <input type="submit" value="Search" onClick={searchfavproducts} />
                  </form><div className="container" id="container">
                    {favproducts &&
                      favproducts.map((product) => (
                        <FavProduct product={product} favkeyword={favkeyword} history={history} />
                      ))}
                  </div></>
}
            </Fragment>
      )}
          </Fragment>
    );
  };
  
  export default UserProfile;