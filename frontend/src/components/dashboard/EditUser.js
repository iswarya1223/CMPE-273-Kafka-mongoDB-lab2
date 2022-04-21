//import { Fragment } from "react"
import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile,loadUser } from "../../actions/auth";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../actions/types";
import MetaData from "../layout/MetaData";
import Axios from 'axios'
import { Image } from 'cloudinary-react'

export const EditUser= ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(null)
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(updateProfile(email,uname,city,mobile,address,dateofbirth,country,picture));
  };

  const uploadImage = async (e) => {
    e.preventDefault()
    // console.log('image',image);
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('cloud_name', 'dj3in4dua')
    formData.append('upload_preset', 'hbhuqhw2')
    // console.log('image',image);
    await Axios.post(
      'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
      formData
    ).then((res) => {
      console.log(res.data.secure_url)
      setPicture(res.data.secure_url)
    })
  }

  useEffect(() => {
    if (user) {
      setUname(user[0].uname);
      setEmail(user[0].email);
      setDateOfBirth(user[0].dateofbirth);
      setPicture(user[0].picture);
      setMobile(user[0].mobile);
      setCity(user[0].city);
      setCountry(user[0].country);
      setAddress(user[0].address);
    
      setImage(user.userImage)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser()).then (()=> history.push("/UserProfile"));
      //history.push("/UserProfile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                 
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
              
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updatedateofbirth">
                  <input
             type="date" 
             value={dateofbirth}
             name='dateofbirth'
             placeholder="date of birth"
             required
             onChange={ (e) => setDateOfBirth(e.target.value)}/>
                </div>
                <div className="mobile">
                  <input  
              type="text" 
              placeholder="Enter mobile number" 
              value={mobile}
              name='mobile'
              onChange={ (e) => setMobile(e.target.value)}
              required/>
                </div>

                <div className="city">

                  <input 
             type="text" 
             placeholder="enter city"
             value={city} 
             name='city'
             required
             onChange={ (e) => setCity(e.target.value)}/>
                </div>
                <div className="country">
                 
                  <select  
             value={country} 
             name='country'
             onChange={e => setCountry(e.target.value)}>
            <option value="null">Select country</option>
            <option value="usa">Unitedstatesofamerica</option>
             <option value="india">India</option>
             <option value="pakistan">Pakistan</option>
             <option value="china">China</option>
             <option value="russia">Russia</option>
             <option value="japan">Japan</option>
             <option value="brazil">Brazil</option>
           </select>
                </div>
                <div className="address">
                 
                  <input 
             type="text" 
             placeholder="enter address"
             value={address} 
             name='city'
             required
             onChange={ (e) => setAddress(e.target.value)}/>
                </div>
                <div id="updateProfileImage">
                {picture && (
        <Image className="img"
          style={{ height: 80, width: 100, marginBottom: 20 }}
          cloudName='dj3in4dua'
          public_id={picture}
        />
      )}
              <input
                  type='file'
                  className='form-control'
                  name='userName'
                  onChange={(e) => uploadImage(e)}
                ></input>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditUser;