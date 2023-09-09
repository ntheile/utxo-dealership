
"use client"
import * as React from "react";

declare let window: any
declare let dealership: any

const Buy: React.FunctionComponent = () => {
  const [showModalBuy, setShowModalBuy] = React.useState(false);
  const [cartItem, setCartItem] = React.useState({
    id: 0,
    name: "Luxury UTXO",
    price: 4000,
    item: "3000 sats",
  });
  const [step, setStep] = React.useState<"prepBuy"| "sendSatsToSeller" | "complete">("prepBuy")
  const [sellerAddress, setSellerAddress] = React.useState("<WAITING FOR SELLER ADDRESS...>");
  const [messages, setMessages] = React.useState([])
  const [ws, setWs] = React.useState<any>(null)

  const prepBuy = async () =>{
    try {
      const privKey = dealership.getPrivateKey()
      const pubKey = dealership.getPublicKey(privKey)
      await dealership.prepBuyer(pubKey)
      setStep("complete")
    } catch (err: any) {
      alert(err.message);
    }
  }

  const sendSatsToSeller = async () => {
    // NOSTR
  }

  React.useEffect(()=> {
    if (showModalBuy === false){
      setStep("prepBuy")
    }
  }, [showModalBuy])

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
              <img className="card-img-top car-img" src="/utxo1.jpg" alt=""/>
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
                    <h6>Cost: 1,150 sats</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3"style={{cursor:"pointer"}}
                    onClick={()=>{
                      setCartItem({
                        id: 0,
                        name: "Economy UTXO",
                        price: 1150,
                        item: "1,000 sats",
                      })
                      setShowModalBuy(true)
                    }}>
                    <center style={{fontSize:16, marginBottom: 6}}>Buy</center>
                    <span className="car-price">1,000 sats</span>
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
                    &nbsp;150 sats
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
                    <h6 className="font-weight-bold">Mid-Size UTXO</h6>
                    <h6>Cost: 2,500 sats</h6>
                  </div>
                  <h5 className="car-value align-self-center py-2 px-3"
                    style={{cursor:"pointer"}}
                    onClick={()=>{
                      setCartItem({
                        id: 0,
                        name: "Mid-Size UTXO",
                        price: 2500,
                        item: "2,000 sats",
                      })
                      setShowModalBuy(true)
                    }}>
                    <center style={{fontSize:16, marginBottom: 6}}>Buy</center>
                    <span className="car-price">2,000 sats</span>
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
                    &nbsp;500 sats
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalBuy ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                    onClick={() => setShowModalBuy(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>



                {step ==="prepBuy" && (
                  <>
                    <div className="relative p-6 flex-auto">
                      {/* <form>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Total Cost:
                          </label>
                          {JSON.stringify(messages, null, 2 )}
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={cartItem.price + " sats"} disabled />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm mb-2">
                            You get a brand new UTXO worth {cartItem.item}!
                          </label>
                        </div>
                      </form> */}
                      <iframe src="/super.html?user=buyer" width={500} height={500} />
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalBuy(false)}>
                        Close
                      </button>
                      {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=>setStep("sendSatsToSeller")}>
                        Next
                      </button> */}
                    </div>
                  </>
                )}


                {step ==="sendSatsToSeller" && (
                  <div className="relative p-6 flex-auto">
                    <p>ok send {cartItem.price} sats this to the sellers address:</p>
                    <pre>
                    {sellerAddress}
                    </pre>
                    <p>data:</p>
                    <pre>
                      {
                        JSON.stringify({dealership}, null, 2 )
                      }
                    </pre>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalBuy(false)}>
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=>setStep("complete")}>
                        Click when info sent
                      </button>
                    </div>
                  </div>
                )}


                {step ==="complete" && (
                  <div className="relative p-6 flex-auto">
                    <h3>Thank you for your purchase. Here is your brand new UTXO!</h3>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalBuy(false)}>
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=> {
                          setStep("prepBuy")
                          setShowModalBuy(false)
                        }}>
                        Ok
                      </button>
                    </div>
                  </div>
                )}


                </div>
              </div>
            </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
    {/* <div className="row mb-5" style={{backgroundColor:"var(--mainGray)", paddingTop: 100}}>
      <div className="col d-flex flex-wrap text-uppercase justify-content-center">
        <h1 className="font-weight-bold align-self-center mx-1">our</h1>
        <h1 className="section-title--special mx-1">Orderbook</h1>
      </div>
      <div style={{marginTop:-300}}>
        <OrderBook/>
      </div>
    </div> */}
    </section>
  )
}

export default Buy;


