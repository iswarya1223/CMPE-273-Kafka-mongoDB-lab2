import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile,loadUser } from "../../actions/auth";
import { useAlert } from "react-alert";
import { UPDATE_SHOP_IMAGE_RESET } from "../../actions/types";
import {updateShop} from "../../actions/shopAction";
import MetaData from "../layout/MetaData";

export const Editshopimage= ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  
  const { user } = useSelector((state) => state.auth);
  const email = user && user[0].length && user[0].email;
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
  const [shopimage, setShopImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
if (email)
{
    dispatch(updateShop(email,shopimage));
}
  };


  useEffect(() => {
    if (user) {
      setShopImage(user[0].shopimage);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Image Updated Successfully");
      dispatch(loadUser()).then (()=> history.push("/shop"));
      //history.push("/UserProfile");

      dispatch({
        type: UPDATE_SHOP_IMAGE_RESET,
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
                <div id="updateProfileImage">
                    <input
                      type="file"
                      placeholder="please enter image URL"
                      required
                      name="shopimage"
                      value={shopimage}
                      onChange={(e) => setShopImage(e.target.value)}
                    />
                  </div>
                  </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Editshopimage;