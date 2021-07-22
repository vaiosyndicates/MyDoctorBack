import React, { useState } from 'react'
import { Input } from '../../components/atom'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../components/atom/Button';
import { first } from 'lodash';
import Loader from 'react-loader-spinner';
import Axios from 'axios';

const Register = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registration = event => {
    event.preventDefault();
    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      password_confirmation: repeatPassword,
    }

    const header = {
      'Content-Type' : 'application/json' 
    } 

    try {
      setLoading(true);
      Axios.post('http://127.0.0.1:8000/api/register', data, header)
      .then((res) => {
        setLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        setLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        console.log("AXIOS ERROR: ", err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <Input type="text" cls="form-control form-control-user" value={firstName} onChange={val => setFirstName(val.target.value)} placeholder="First Name" />
                      </div>
                      <div className="col-sm-6">
                        <Input type="text" cls="form-control form-control-user" value={lastName} onChange={val => setLastName(val.target.value)} placeholder="Last Name" />

                      </div>
                    </div>
                    <div className="form-group">
                      <Input type="email" cls="form-control form-control-user" value={email} onChange={val => setEmail(val.target.value)} placeholder="Email Address" />

                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <Input type="password" cls="form-control form-control-user" value={password} onChange={val=> setPassword(val.target.value)} placeholder="Password" />

                      </div>
                      <div className="col-sm-6">
                        <Input type="password" cls="form-control form-control-user" value={repeatPassword} onChange={val => setRepeatPassword(val.target.value)} placeholder="Repeat Password" />
                      </div>
                    </div>
                    <Button label="Register Account" onClick={e => registration(e)} cls="btn btn-primary btn-user btn-block" />
                    <div className="loading-box">
                      <Loader
                        type="ThreeDots"
                        color="#000099"
                        height={100}
                        width={100}
                        visible={loading}
                      />
                    </div>
                    <hr />
                    <a href="index.html" className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw" /> Register with Google
                    </a>
                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw" /> Register with Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <NavLink to="/" className="small">Already have an account? Login!</NavLink>
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

export default Register
