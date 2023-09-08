"use client"
import * as React from "react";

const Skills: React.FunctionComponent = () => {
  return (
    <section className="skills py-5" id="skills">
      <div className="container">
        <div className="row mb-5">
          <div className="col d-flex flex-wrap text-uppercase justify-content-center" >
            <h1 className="font-weight-bold align-self-center mx-1" >
              why choose
            </h1>
            <h1 className="section-title--special mx-1" style={{backgroundColor:"black"}}>
              &nbsp;&nbsp;UTXO Dealership&nbsp;&nbsp;
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-3 text-center my-3">
            <a href="" className="skills-icon p-2 rounded-circle">
              <i className="fas fa-car fa-fw" />
            </a>
            <h6 className="text-uppercase font-weight-bold my-3">Brand New UTXO (Privacy)</h6>
            <div className="skills-underline" />
            <p className="w-75 mx-auto text-muted">
              Get that brand new fresh UTXO smell with no history!
            </p>
          </div>
          <div className="col-sm-6 col-md-3 text-center my-3">
            <a href="" className="skills-icon p-2 rounded-circle">
              <i className="fas fa-comments fa-fw" />
            </a>
            <h6 className="text-uppercase font-weight-bold my-3">Trade In Your old one</h6>
            <div className="skills-underline" />
            <p className="w-75 mx-auto text-muted">
              Trade your old UTXO in for a brand new one!
            </p>
          </div>
          <div className="col-sm-6 col-md-3 text-center my-3">
            <a href="" className="skills-icon p-2 rounded-circle">
              <i className="fas fa-people-carry fa-fw" />
            </a>
            <h6 className="text-uppercase font-weight-bold my-3">Zero Credit Check</h6>
            <div className="skills-underline" />
            <p className="w-75 mx-auto text-muted">
              Help decentralize mining! All buyers pre-approved.
            </p>
          </div>
          <div className="col-sm-6 col-md-3 text-center my-3">
            <a href="" className="skills-icon p-2 rounded-circle">
              <i className="fas fa-wallet fa-fw" />
            </a>
            <h6 className="text-uppercase font-weight-bold my-3">Factory Prices</h6>
            <div className="skills-underline" />
            <p className="w-75 mx-auto text-muted">
              Inventory stright from the factory and passing the savings on to you!!!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills;
