
"use client"
import * as React from "react";
import { requestProvider } from "webln";

declare let window: any
declare let dealership: any

const Inventory: React.FunctionComponent = () => {
  const [showModalBuy, setShowModalBuy] = React.useState(false);
  const [cartItem, setCartItem] = React.useState({
    id: 0,
    name: "Luxury UTXO",
    price: 4000,
    item: "3000 sats",
  });

  const submit = async () =>{
    buy()
    setShowModalBuy(false)
  }

  const buy = async () => {
    //seller clicks "Sell your new utxo" and runs var sellers_privkey = dealership.getPrivateKey() and var sellers_pubkey = dealership.getPublicKey( sellers_privkey )
    //seller makes sellers_pubkey a data-pubkey="" attribute of each offer button


    //buyer gets sellers_pubkey when he selects an offer and calls dealership.prepBuyer( sellers_pubkey )
    //buyer sends 4_000 sats to dealership.buyers_contract.contract.address
    //buyer runs var txinfo = await dealership.addressReceivedMoneyInThisTx( dealership.buyers_contract.contract.address, "testnet/" )
    //buyer runs dealership[ "buyer_txid" ] = txinfo[ 0 ]
    //buyer runs dealership[ "buyer_vout" ] = txinfo[ 1 ]
    //buyer runs dealership[ "buyer_address" ] = some_bitcoin_address
    //buyer runs var buyers_contract = dealership.buyers_contract.contract
    //buyer sends the variables "buyers_contract" and "some_bitcoin_address" to seller


    //seller takes "buyers_contract" and "some_bitcoin_address" from buyer
    //seller runs var txinfo = await dealership.addressReceivedMoneyInThisTx( buyers_contract.address, "testnet/" )
    //seller checks if txinfo[ 2 ] == 4_000 and fails if not
    //seller runs dealership[ "buyer_txid" ] = txinfo[ 0 ]
    //seller runs dealership[ "buyer_vout" ] = txinfo[ 1 ]
    //seller runs dealership[ "buyer_address" ] = some_bitcoin_address
    //seller runs dealership.buyers_contract.contract = buyers_contract
    //seller calls dealership.prepSeller( sellers_privkey )
    //seller sends 3_000 sats to dealership.sellers_contract.contract.address
    //seller runs var txinfo = await dealership.addressReceivedMoneyInThisTx( dealership.sellers_contract.contract.address, "testnet/" )
    //seller runs dealership[ "seller_txid" ] = txinfo[ 0 ]
    //seller runs dealership[ "seller_vout" ] = txinfo[ 1 ]
    //seller runs dealership[ "seller_address" ] = another_bitcoin_address
    //seller runs var sellers_contract = dealership.sellers_contract.contract
    //seller sends the variables "sellers_contract" and another_bitcoin_address to buyer


    //buyer takes "sellers_contract" and another_bitcoin_address from seller
    //buyer runs var txinfo = await dealership.addressReceivedMoneyInThisTx( sellers_contract.address, "testnet/" )


    //seller checks if txinfo[ 2 ] == 3_000 and fails if not
    //if buyer fails he should run var txhex = await dealership.refundBuyer( destination ) and broadcast the tx after 10 blocks
    //buyer runs dealership[ "seller_txid" ] = txinfo[ 0 ]
    //buyer runs dealership[ "seller_vout" ] = txinfo[ 1 ]
    //buyer runs dealership[ "seller_address" ] = another_bitcoin_address
    //buyer runs dealership.sellers_contract.contract = sellers_contract
    //buyer runs var buyer_sig = await dealership.signContractAsBuyer()
    //buyer runs var buyer_preimage = dealership.buyers_contract.preimage
    //buyer sends buyer_sig and buyer_preimage to seller
    //seller checks if buyer_preimage hashes to dealership.sellers_contract.contract.hash and fails if not
    //if seller fails he should run var txhex = await dealership.refundSeller() and broadcast the tx after 5 blocks
    //seller runs var txhex = await dealership.useMultisigAsSeller( dealership.sellers_contract.privkey2, buyer_sig ) and broadcasts the tx immediately
    //seller runs var seller_sig = await dealership.signContractAsSeller()
    //seller sends seller_sig to buyer

    //buyer runs var txhex = await dealership.useMultisigAsBuyer( seller_sig ) and broadcasts the tx immediately
  }

  // const signMessage = async (msg: string) =>{
  //   try {
  //     const webln = await requestProvider()
  //     const info = await webln.getInfo()

  //     await window.nostr.enable()

  //     const sellersPubKey = await window.nostr.getPublicKey()

  //     console.log(sellersPubKey)

  //     const resp = await webln.signMessage(msg)
  //     const { message, signature } = resp
  //     console.log("Signed message", message, signature)
  //   } catch (err: any) {
  //     alert(err.message);
  //   }
  // }

  return (
    <section className="inventory py-5" id="inventory">
      <center style={{marginBottom: 50}}>
      <h1 className="font-weight-bold align-self-center mx-1">Market for fresh UTXOs</h1>
      </center>
      <div className="container">
        <div className="row mb-5">
          <div className="col d-flex flex-wrap text-uppercase justify-content-center">
            <h1 className="font-weight-bold align-self-center mx-1">our</h1>
            <h1 className="section-title--special mx-1">inventory</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-10 mx-auto col-md-12 d-flex justify-content-end">
            <button className="btn btn-outline-secondary text-uppercase mx-1">
              Luxury
            </button>
            <button className="btn btn-outline-secondary text-uppercase mx-1">
              Mid-Size
            </button>
            <button className="btn btn-outline-secondary text-uppercase mx-1">
              Economy
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo1.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">Luxury UTXO</h6>
                    <h6>Cost: 4,000 sats</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3"
                    style={{cursor:"pointer"}}
                    onClick={()=>{
                      setCartItem({
                        id: 0,
                        name: "Luxury UTXO",
                        price: 4000,
                        item: "3,000 sats",
                      })
                      setShowModalBuy(true)
                    }}>
                   <center style={{fontSize:16, marginBottom: 6}}>Buy</center>
                    <span className="car-price">3,000 sats</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    &nbsp;luxury
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    &nbsp;next block
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    &nbsp;1000 sats
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo8.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">Economy UTXO</h6>
                    <h6>Cost: 0.11 BTC</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3"style={{cursor:"pointer"}}
                    onClick={()=>{
                      setCartItem({
                        id: 0,
                        name: "Economy UTXO",
                        price: 0.11,
                        item: "0.1 BTC",
                      })
                      setShowModalBuy(true)
                    }}>
                    <center style={{fontSize:16, marginBottom: 6}}>Buy</center>
                    <span className="car-price">0.1 BTC</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    &nbsp;Economy
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    &nbsp;~50 blocks
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    &nbsp;0.01 BTC
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo3.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">Mid-Size Sedan UTXO</h6>
                    <h6>Cost: 0.225</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3"
                    style={{cursor:"pointer"}}
                    onClick={()=>{
                      setCartItem({
                        id: 0,
                        name: "Mid-Size UTXO",
                        price: 0.225,
                        item: "0.25 BTC",
                      })
                      setShowModalBuy(true)
                    }}>
                    <center style={{fontSize:16, marginBottom: 6}}>Buy</center>
                    <span className="car-price">0.25 BTC</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    &nbsp;Mid-Size
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    &nbsp;~25 blocks
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    &nbsp;0.025 BTC
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo4.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">car maker</h6>
                    <h6>model</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3">
                    $<span className="car-price">10,000</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    sedan
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    automatic
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    50
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo7.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">car maker</h6>
                    <h6>model</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3">
                    $<span className="car-price">10,000</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    sedan
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    automatic
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    50
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-10 mx-auto my-3 col-md-6 col-lg-4">
            <div className="card car-card">
              <img
                className="card-img-top car-img"
                src="/utxo8.jpg"
                alt=""
              />
              <div className="card-body">
                <div className="car-info d-flex justify-content-between">
                  <div className="car-text text-uppercase">
                    <h6 className="font-weight-bold">car maker</h6>
                    <h6>model</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3">
                    $<span className="car-price">10,000</span>
                  </h5>
                </div>
              </div>
              <div className="card-footer text-capitalize d-flex justify-content-between">
                <p>
                  <span>
                    <i className="fas fa-car" />
                    sedan
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-cogs" />
                    automatic
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-gas-pump" />
                    50
                  </span>
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {showModalBuy ? (
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
                    Buy {cartItem.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalBuy(false)}
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
                        Total Cost:
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={cartItem.price + " BTC"} disabled />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm mb-2" for="username">
                        You get a brand new UTXO worth {cartItem.item}!
                      </label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalBuy(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => submit()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
    <div className="row mb-5" style={{backgroundColor:"var(--mainGray)", paddingTop: 100}}>
      <div className="col d-flex flex-wrap text-uppercase justify-content-center">
        <h1 className="font-weight-bold align-self-center mx-1">our</h1>
        <h1 className="section-title--special mx-1">Orderbook</h1>
      </div>
      {/* <div style={{marginTop:-300}}>
        <OrderBook/>
      </div> */}
    </div>
    </section>
  )
}

export default Inventory;


