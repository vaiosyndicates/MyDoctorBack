import React, { useCallback, useEffect, useState } from 'react'
import { Input } from '../../components/atom';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../../context';
import Axios from 'axios';
import Button from '../../components/atom/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Login = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthTokens, authTokens} = useAuth();

  const classes = useStyles();


  const signIn = async event => {
    // do something
    event.preventDefault();
    setLoading(true);
    try {

      const header = {
        'Content-Type' : 'application/json' 
      };

      const data = {
        email: email,
        password: password,
      }

      const response = await Axios.post('http://127.0.0.1:8000/api/login', data, header);
      if (response.status === 200) {
        setLoading(false);
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        setAuthTokens(response.data.token);
      } else {
        setLoading(false);
        setEmail('');
        setPassword('');
        setIsError(true);
        setLoggedIn(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  if (isLoggedIn === true) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {loading && <LinearProgress />}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <Input type="email" cls="form-control form-control-user" value={email} onChange={val => setEmail(val.target.value)} placeholder="Enter Email Address..." />
                        </div>
                        <div className="form-group">
                          <Input type="password" cls="form-control form-control-user" value={password} onChange={val=> setPassword(val.target.value)} placeholder="Enter  Password..." />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <Button label="Login" onClick={e => signIn(e)} cls="btn btn-primary btn-user btn-block" />

                        <hr />
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw" /> Login with Google
                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                        </a>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                      </div>
                      <div className="text-center">
                        <NavLink to="/register" className="small">Create an Account!</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login