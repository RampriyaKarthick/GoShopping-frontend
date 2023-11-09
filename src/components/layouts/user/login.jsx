import React, { Fragment } from 'react';
import Metadata from '../MetaData';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login,clearAuthError } from '../../../actions/userActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    // const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  submitHandler = (e) => {
        e.preventDefault();
        // dispatch(Login(email, password))
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/')
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])


  return (
    <Fragment>
      <Metadata title={'Login-GoShopping'} />
      <div className="row wrapper"> 
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e =>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e =>setPassword(e.target.value)}
              />
            </div>

            <a href="#" className="float-right mb-4">Forgot Password?</a>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
