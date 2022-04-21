import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import './Header.css';
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {MdOutlineLocalMall} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
//import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const UserOptions = ({user}) => {
    const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const options = [
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: < ListAltIcon/>, name: "Orders", func: orders },
        { icon: < MdOutlineLocalMall/>, name: "shopcreation", func: shop}];
        function account() {
            history.push("/userProfile");
          }
        function orders() {
           
        history.push("/mypurchases");
        }
        function shop()
        {
          if (user && user.length && user[0].shopname === null){

          history.push("/shopcreation")}
          else  {
            history.push(`/shop/${user[0].shopname}`)
          };
        }
return (
    <Fragment>
     
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
            <img
              className="speedDialIcon"
              src={user && user.length && user[0].picture ? user[0].picture : "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"}
              alt="Profile"
            />
          }
          >
       {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
        </SpeedDial>
        </Fragment>
);
};

export default UserOptions;