"use client"
import * as React from "react";

const Nav:React.FunctionComponent = () => {
  return (
    <div>
      {/* <nav className="navbar" id="navBar">
        <a href="#" className="navbar-brand">
          <img style={{width:32, height: 32}}
            src="http://www.clker.com/cliparts/o/e/d/u/r/4/gear-th.png"
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#myNav"
        >
          <span className="navbar-icon">
            <i className="fas fa-bars" />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="myNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a href="#navBar" className="nav-link" style={{color:"black"}}>
                home
              </a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link">
                UTXO Dealership
              </a>
            </li>
            <li className="nav-item">
              <a href="#inventory" className="nav-link">
                inventory
              </a>
            </li>
            <li className="nav-item">
              <a href="#sell" className="nav-link">
                Sell
              </a>
            </li>
          </ul>
          {/* <div className="nav-icons d-none d-lg-block">
            <a href="#" className="nav-icon">
              <i className="fab fa-facebook" />
            </a>
            <a href="#" className="nav-icon">
              <i className="fab fa-twitter" />
            </a>
            <a href="#" className="nav-icon">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </nav>*/}
    </div>
  )
}

export default Nav;
