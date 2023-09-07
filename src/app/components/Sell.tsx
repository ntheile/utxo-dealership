"use client"
import * as React from "react";

const Sell: React.FunctionComponent = () => {
  const [showModalSell, setShowModalSell] = React.useState(false);

  return (
    <div>
      <section className="question py-5" id="question">
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto my-2 col-md-6 d-flex justify-content-between question-grey p-4 text-dark">
              <a href="#" className="question-icon mr-3">
                <i className="fas fa-search fa-fw" />
              </a>
              <div className="question-text w-75">
                <h4 className="question-title text-capitalize font-weight-bold" style={{color: "white"}}>
                  Are you looking for a fresh new UTXO?
                </h4>
                <p className="question-info">
                  Come get em now! We have the best UTXOs in the world!
                </p>
              </div>
            </div>
            <div className="col-10 mx-auto my-2 col-md-6 d-flex justify-content-between question-blue p-4">
              <a href="#" className="question-icon mr-3" >
                <i className="fas fa-dollar-sign fa-fw" />
              </a>
              <div className="question-text w-75" id="sell">
                <h4 className="question-title text-capitalize font-weight-bold" style={{color:"white"}}>
                  Are you a miner? Do you want to sell a new UTXO?
                </h4>
                <button
                  className="bg-orange-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalSell(true)}
                >Yes Sell</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModalSell ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Sell your new UTXO
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalSell(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Transaction ID
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalSell(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalSell(false)}
                  >
                    Sign Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default Sell
