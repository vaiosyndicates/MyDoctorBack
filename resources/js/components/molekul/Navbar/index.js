import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect} from 'react-router-dom';
import { useAuth } from '../../../context';
import Button from '../../atom/Button';

const Navbar = () => {
  const { setAuthTokens, authTokens} = useAuth();

  const signOut = async event => {
    event.preventDefault();
    try {

      const response = await Axios.get('http://127.0.0.1:8000/api/logout', { headers: { Authorization: `Bearer ${authTokens}` } })
      if (response.status === 200) {
        setAuthTokens('undefined');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block" />
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <div className="dropdown-divider" />
            <Button label="Logout" onClick={e => signOut(e)} cls="dropdown-item" haveIcon />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
