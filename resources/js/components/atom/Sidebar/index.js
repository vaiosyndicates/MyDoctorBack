import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <NavLink to="/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </NavLink>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <NavLink to="/dashboard" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        Interface
      </div>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog" />
          <span>Content</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Manage Content</h6>
            <NavLink to="/article" className="collapse-item">Manage Article</NavLink>
            <NavLink to="/hospital" className="collapse-item">Manage Hospital</NavLink>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  )
}

export default Sidebar
