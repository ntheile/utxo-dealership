"use client"
import * as React from "react";

const Header: React.FunctionComponent = () => {
  return (
    <header className="header" id="header">
      <div className="container" style={{position:"absolute", top: 50, zIndex: 200}}>
        <div className="row mb-5">
          <div className="col d-flex flex-wrap text-uppercase justify-content-center">
            <center>
              <h1 className="section-title--special mx-1 text-uppercase my-2 title">
                &nbsp;&nbsp;&nbsp;UTXO Dealership&nbsp;&nbsp;&nbsp;
              </h1>
            </center>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row height-max align-items-center">
          <div className="col col-md-9 ml-auto text-right p-5" style={{paddingRight: 400}}>
            <h5 className="title-heading d-inline-block p-2 text-uppercase">
              the all new{" "}
            </h5>
            <h2 className="title-heading text-uppercase my-2 title" style={{marginLeft:0}}>2023 Luxury UTXO</h2>
            <h3 className="title-heading text-uppercase">From Block height 806650</h3>
            <h6 className="title-heading text-capitalise">starts from</h6>
            <h2 className="title-heading d-inline-block">
              1,000 sats{" "}
              <a href="#inventory" className="title-icon d-inline-block mx-2">
                <i className="fas fa-play" />
              </a>{" "}
            </h2>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
