import React from 'react';
import { useState } from "react";
//import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login} from '../../actions/auth';
import PropTypes from 'prop-types';
import './Login.css'

export const Login = ({login, isAuthenticated}) => {

    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    //const successlogin = '';
    const {email,password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        //console.log("HI");
        login({email,password});
            // const newUser = {
            //     email,
            //     password
            // }
            // try{
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     console.log(body);
            //     const res = await axios.post('/api/users/login',body,config);
            //     console.log(res.data)
            //     if(res.data === "success"){
            //         console.log("you are logged!");
                   
                   
            //     }
            // }
            // catch(err){
            //     console.log("error");
            // }
            //console.log(successlogin);
            
    };

    if (isAuthenticated) {
        return <Redirect to="/products" />;
      }

    return (
  <body class="body123">

        <div class="container123">
	<div class="d-flex justify-content-center h-100">
		<div class="card123">
			<div class="card-header123">
				<h3>Sign In</h3>
				
			</div>
			<div class="card-body123">
				<form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
            <label class="headings123" htmlFor="email"><b>Email Id</b></label>
              <input  className='form-control' 
                        type="email" 
                        placeholder="user@gmail.com" 
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                       // required
               />   
            </div>
            <div className="form-group">
            <label class="headings123" htmlFor="password"><b>Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min8chars@6" 
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        //required 
            />   
            </div>
            <div className="form-group" >
                    <input type="submit" class="btn float-right login_btn"  />
            </div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links" >
					Don't have an account?<Link to = '/register'>Sign up</Link>
				</div>
               
			</div>
		</div>
	</div>

</div>

        
</body>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, {login})(Login);
