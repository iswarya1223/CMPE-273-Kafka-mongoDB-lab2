//import { Fragment } from "react"
import React from 'react'
import {connect} from 'react-redux';
import { useState } from "react"
//import axios from 'axios';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import { register } from "../../actions/auth";

export const Register = ({setAlert, register}) => {
    const [formData, setFormData] = useState({
        uname: '',
        email: '',
        password: '',
        confpassword: ''
    });
   
    const {uname,email,password,confpassword} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== confpassword){
            setAlert('Passwords not matched!');
        }
        else{
            register({uname,email,password});
            
        }
    }

    return (



        
        <div>
            
            <div className="main" >
    
        <div className="container" >
        <div className="signup-content">

            <form className="signup-form" onSubmit={e => onSubmit(e)}>
            <h2 className="form-title">Register Here!!</h2>
                
            <div className="form-group">
            <label htmlFor="uname"><b>Username</b></label>
            <input className='form-control' 
                    type="text" 
                    placeholder="Enter Username"
                    name='uname'
                    value={uname}
                    onChange={e => onChange(e)}
                    //required pattern="[a-z]{3,}"
                 />   
            </div>
           
            <div className="form-group">
            <label htmlFor="email"><b>Email</b></label>
              <input  className='form-control' 
                        type="email" 
                        placeholder="user@gmail.com" 
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                        //required
               />   
            </div>

            <div className="form-group">
            <label htmlFor="password"><b>Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min6chars" 
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        //required 
            />   
            </div>

            <div className="form-group">
            <label htmlFor="confpassword"><b>Confirm Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min6chars" 
                        name="confpassword"
                        value={confpassword}
                        onChange={e => onChange(e)}
                       // required 
            />   
            </div>
              
            <div className="form-group" >
                    <input type="submit"  className="form-submit"  />
            </div>
                
            </form>
        </div>
    </div>
</div>
        
</div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default connect(null, {setAlert, register})(Register);
