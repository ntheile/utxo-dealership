var dealership = {}
            dealership[ "hexToBytes" ] = hex => Uint8Array.from( hex.match( /.{1,2}/g ).map( ( byte ) => parseInt( byte, 16 ) ) );
            dealership[ "bytesToHex" ] = bytes => bytes.reduce( ( str, byte ) => str + byte.toString( 16 ).padStart( 2, "0" ), "" );
            dealership[ "sha256" ] = s => {
                if ( typeof s == "string" ) s = new TextEncoder().encode( s );
                return crypto.subtle.digest( 'SHA-256', s ).then( hashBuffer => {
                    var hashArray = Array.from( new Uint8Array( hashBuffer ) );
                    var hashHex = hashArray
                        .map( bytes => bytes.toString( 16 ).padStart( 2, '0' ) )
                        .join( '' );
                    return hashHex;
                });
            }
            dealership[ "getPrivateKey" ] = () => {
                return dealership.bytesToHex( nobleSecp256k1.utils.randomPrivateKey() );
            }
            dealership[ "getPublicKey" ] = privkey => {
                return nobleSecp256k1.getPublicKey( privkey, true ).substring( 2 );
            }
            dealership[ "getData" ] = async url => {
                return new Promise( async function( resolve, reject ) {
                    function inner_get( url ) {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open( "GET", url, true );
                        xhttp.send();
                        return xhttp;
                    }
                    var data = inner_get( url );
                    data.onerror = function( e ) {
                        resolve( "error" );
                    }
                    async function isResponseReady() {
                        return new Promise( function( resolve2, reject ) {
                            if ( !data.responseText || data.readyState != 4 ) {
                                setTimeout( async function() {
                                    var msg = await isResponseReady();
                                    resolve2( msg );
                                }, 1 );
                            } else {
                                resolve2( data.responseText );
                            }
                        });
                    }
                    var returnable = await isResponseReady();
                    resolve( returnable );
                });
            }
            dealership[ "addressReceivedMoneyInThisTx" ] = async (address, network) => {
                let txid;
                let vout;
                let amt;
                let nonjson = await dealership.getData("https://mempool.space/" + network + "api/address/" + address + "/txs");
                let json = JSON.parse(nonjson);
                json.forEach(function (tx) {
                    tx["vout"].forEach(function (output, index) {
                        if (output["scriptpubkey_address"] == address) {
                            txid = tx["txid"];
                            vout = index;
                            amt = output["value"];
                        }
                    });
                });
                return [txid, vout, amt];
            }
            dealership[ "loopTilAddressReceivesMoney" ] = async (address, network) => {
                let itReceivedMoney = false;
                async function isDataSetYet(data_i_seek) {
                    return new Promise(function (resolve, reject) {
                        if (!data_i_seek) {
                            setTimeout(async function () {
                                console.log("waiting for address to receive money...");
                                try {
                                    itReceivedMoney = await dealership.addressOnceHadMoney(address, network);
                                }catch(e){ }
                                let msg = await isDataSetYet(itReceivedMoney);
                                resolve(msg);
                            }, 2000);
                        } else {
                            resolve(data_i_seek);
                        }
                    });
                }

                async function getTimeoutData() {
                    let data_i_seek = await isDataSetYet(itReceivedMoney);
                    return data_i_seek;
                }

                let returnable = await getTimeoutData();
                return returnable;
            }
            dealership[ "addressOnceHadMoney" ] = async (address, network) => {
                var nonjson = await dealership.getData( "https://mempool.space/" + network + "api/address/" + address );
                var json = JSON.parse( nonjson );
                if ( json[ "chain_stats" ][ "tx_count" ] > 0 || json[ "mempool_stats" ][ "tx_count" ] > 0 ) {
                    return true;
                }
                return false;
            }
            dealership[ "makeContract" ] = async (pubkey2, pubkey1, privkey2, hash, i_am_seller) => {
                var timelock = 10;
                var preimage = dealership.bytesToHex(nobleSecp256k1.utils.randomPrivateKey());
                if ( !hash ) {
                    var privkey1 = dealership.bytesToHex(nobleSecp256k1.utils.randomPrivateKey());
                    var pubkey1 = nobleSecp256k1.getPublicKey( privkey1, true ).substring( 2 );
                    var hash = await dealership.sha256( dealership.hexToBytes( preimage ) );
                    var contract = await dealership.getContract( pubkey1, pubkey2, timelock, hash );
                } else {
                    timelock = timelock - 5;
                    var contract = await dealership.getContract( pubkey2, pubkey1, timelock, hash );
                }
                if ( !i_am_seller ) return {privkey1, preimage, contract}
                return {privkey2, contract}
            }
            dealership[ "getContract" ] = async (pubkey1, pubkey2, timelock, hash) => {
                var scripts = [
                    [
                        timelock,
                        'OP_CHECKSEQUENCEVERIFY',
                        'OP_DROP',
                        pubkey1,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_SHA256',
                        hash,
                        'OP_EQUALVERIFY',
                        pubkey2,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_0',
                        pubkey1,
                        'OP_CHECKSIGADD',
                        pubkey2,
                        'OP_CHECKSIGADD',
                        'OP_2',
                        'OP_EQUAL'
                    ]
                ];
                var tree = scripts.map(s => tapscript.Tap.encodeScript(s));
                var index  = 0; //alternatives: 1 or 2 -- whichever script you want to redeem using
                var script = scripts[index];
                var target = tapscript.Tap.encodeScript(script);
                var pubkey = "ab".repeat( 32 );
                var [ tpubkey ] = tapscript.Tap.getPubKey(pubkey, { tree, target });
                var address = tapscript.Address.p2tr.fromPubKey(tpubkey, 'testnet');
                return {address, pubkey1, pubkey2, timelock, hash};
            }
            dealership[ "signContract" ] = (privkey, pubkey1, pubkey2, destino, from_amount, to_amount, timelock, hash, txid, vout) => {
                index = 2;
                var scripts = [
                    [
                        timelock,
                        'OP_CHECKSEQUENCEVERIFY',
                        'OP_DROP',
                        pubkey1,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_SHA256',
                        hash,
                        'OP_EQUALVERIFY',
                        pubkey2,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_0',
                        pubkey1,
                        'OP_CHECKSIGADD',
                        pubkey2,
                        'OP_CHECKSIGADD',
                        'OP_2',
                        'OP_EQUAL'
                    ]
                ];
                var tree = scripts.map(s => tapscript.Tap.encodeScript(s));
                var script = scripts[index];
                var target = tapscript.Tap.encodeScript(script);
                var pubkey = "ab".repeat( 32 );
                var [ tpubkey, cblock ] = tapscript.Tap.getPubKey(pubkey, { tree, target });
                var txdata = tapscript.Tx.create({
                  vin: [{
                    txid: txid,
                    vout: vout,
                    prevout: {value: from_amount, scriptPubKey: ["OP_1", tpubkey]},
                    sequence: 0xffffffff,
                    witness: []
                  }],
                  vout: [{
                    value: to_amount,
                    scriptPubKey: tapscript.Address.toScriptPubKey(destino)
                  }],
                });
                var vin_to_sign = 0;
                var sig1 = tapscript.Signer.taproot.sign(privkey, txdata, vin_to_sign, { extension: target });
                return sig1.hex;
            }
            dealership[ "settleContract" ] = async (privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer, set_sequence_as_seller, disable_sequence) => {
                var scripts = [
                    [
                        timelock,
                        'OP_CHECKSEQUENCEVERIFY',
                        'OP_DROP',
                        pubkey1,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_SHA256',
                        hash,
                        'OP_EQUALVERIFY',
                        pubkey2,
                        'OP_CHECKSIG'
                    ],
                    [
                        'OP_0',
                        pubkey1,
                        'OP_CHECKSIGADD',
                        pubkey2,
                        'OP_CHECKSIGADD',
                        'OP_2',
                        'OP_EQUAL'
                    ]
                ];
                var tree = scripts.map(s => tapscript.Tap.encodeScript(s));
                var script = scripts[index];
                var target = tapscript.Tap.encodeScript(script);
                var pubkey = "ab".repeat( 32 );
                var [ tpubkey, cblock ] = tapscript.Tap.getPubKey(pubkey, { tree, target });
                var txdata = tapscript.Tx.create({
                  vin: [{
                    txid: txid,
                    vout: vout,
                    prevout: {value: from_amount, scriptPubKey: ["OP_1", tpubkey]},
                    sequence: ( ( i_am_buyer || set_sequence_as_seller ) && !disable_sequence ) ? ( timelock ).toString( 16 ).padStart( 8, "0" ) : 0xffffffff,
                    witness: []
                  }],
                  vout: [{
                    value: to_amount,
                    scriptPubKey: tapscript.Address.toScriptPubKey(destino)
                  }],
                });
                var vin_to_sign = 0;
                // console.log( txdata, vin_to_sign, target, nobleSecp256k1.getPublicKey( privkey, true ).substring( 2 ) );
                var sighash = tapscript.Signer.taproot.hash( txdata, vin_to_sign, {extension: target, pubkey: nobleSecp256k1.getPublicKey( privkey, true ).substring( 2 )} ).hex;
                // console.log( "sighash:", sighash );
                var sig1 = tapscript.Signer.taproot.sign(privkey, txdata, vin_to_sign, { extension: target });
                var sig_is_good = await nobleSecp256k1.schnorr.verify( sig1.hex, sighash, nobleSecp256k1.getPublicKey( privkey, true ).substring( 2 ) );
                // console.log( "sig is good, right?", sig_is_good, sig1.hex, sighash, nobleSecp256k1.getPublicKey( privkey, true ).substring( 2 ) );
                txdata.vin[0].witness = [ sig1, script, cblock ];
                if ( preimage ) txdata.vin[0].witness = [ sig1, preimage, script, cblock ];
                if ( sig2 ) txdata.vin[0].witness = [ sig1, sig2, script, cblock ];
                return tapscript.Tx.encode(txdata).hex;
            }
            dealership[ "buyers_contract" ] = {}
            dealership[ "sellers_contract" ] = {}
            dealership[ "buyer_txid" ] = null;
            dealership[ "buyer_vout" ] = null;
            dealership[ "seller_txid" ] = null;
            dealership[ "seller_vout" ] = null;
            dealership[ "seller_address" ] = null;
            dealership[ "buyer_address" ] = null;
            dealership[ "prepBuyer" ] = async pubkey2 => {
                dealership[ "buyers_contract" ] = await dealership.makeContract( pubkey2 );
                return true;
            }
            dealership[ "refundBuyer" ] = async () => {
                var privkey = dealership[ "buyers_contract" ][ "privkey1" ];
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 0;
                var destino = dealership[ "buyer_address" ];
                var from_amount = 4_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "buyers_contract" ][ "contract" ][ "timelock" ];
                var sig2 = null;
                var preimage = null;
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "buyer_txid" ];
                var vout = dealership[ "buyer_vout" ];
                // var txid = "a54b11cca36c1bb64704a9628499df008db7d8ec325a5eb1f9e4ab00c4dcc43a";
                // var vout = 1;
                var i_am_buyer = true;
                var txhex = await dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer);
                return txhex;
                // remember not to broadcast your tx til the timelock expires
            }
            dealership[ "usePreimageAsSeller" ] = async privkey => {
                // var privkey = privkey2;
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 1;
                var destino = dealership[ "seller_address" ];
                var from_amount = 4_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "buyers_contract" ][ "contract" ][ "timelock" ];
                var sig2 = null;
                var preimage = dealership[ "buyers_contract" ][ "preimage" ];
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "buyer_txid" ];
                var vout = dealership[ "buyer_vout" ];
                // var txid = "22be2c4c41cd659ad41d3d474c405ee65be284245dcd170884dbd3b28512f88f";
                // var vout = 1;
                var i_am_buyer = false;
                var txhex = await dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer);
                return txhex;
            }
            dealership[ "signContractAsBuyer" ] = () => {
                var privkey = dealership[ "buyers_contract" ][ "privkey1" ];
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 2;
                var destino = dealership[ "seller_address" ];
                var from_amount = 4_000;
                var to_amount = from_amount - 500;
                var timelock = contract[ "contract" ][ "timelock" ];
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "buyer_txid" ];
                var vout = dealership[ "buyer_vout" ];
                // var txid = "9f7482339a9cd2735fbd94bed214e80a1667b89ba92cde7bf8b2a9d2b06ae5b1";
                // var vout = 1;
                return dealership.signContract(privkey, pubkey1, pubkey2, destino, from_amount, to_amount, timelock, hash, txid, vout);
            }
            dealership[ "useMultisigAsSeller" ] = async ( privkey, sig2 ) => {
                // var privkey = privkey2;
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 2;
                var destino = dealership[ "seller_address" ];
                var from_amount = 4_000;
                var to_amount = from_amount - 500;
                var timelock = contract[ "contract" ][ "timelock" ];
                var preimage = null;
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "buyer_txid" ];
                var vout = dealership[ "buyer_vout" ];
                // var txid = "9f7482339a9cd2735fbd94bed214e80a1667b89ba92cde7bf8b2a9d2b06ae5b1";
                // var vout = 1;
                // var sig2 = dealership.signContract(contract[ "privkey1" ], pubkey1, pubkey2, destino, from_amount, to_amount, timelock, hash, txid, vout);
                var i_am_buyer = false;
                var txhex = await dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer);
                return txhex;
            }
            dealership[ "prepSeller" ] = async privkey2 => {
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                dealership[ "sellers_contract" ] = await dealership.makeContract( pubkey2, pubkey1, privkey2, hash, true );
                return true;
            }
            dealership[ "refundSeller" ] = async () => {
                var privkey = dealership[ "sellers_contract" ][ "privkey2" ];
                var pubkey1 = dealership[ "sellers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "sellers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 0;
                var destino = dealership[ "seller_address" ];
                var from_amount = 3_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "sellers_contract" ][ "contract" ][ "timelock" ];
                var sig2 = null;
                var preimage = null;
                var hash = dealership[ "sellers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "seller_txid" ];
                var vout = dealership[ "seller_vout" ];
                // var txid = "e766011e7249528ef5adcc433c8d1d60d698e834b038c0d41d3191168377c9be";
                // var vout = 1;
                var i_am_buyer = false;
                var txhex = await dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer, true);
                return txhex;
                // remember not to broadcast your tx til the timelock expires
            }
            dealership[ "usePreimageAsBuyer" ] = async () => {
                var privkey = contract[ "privkey1" ];
                //remember that the pubkeys are reversed in the next two lines
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 1;
                var destino = dealership[ "buyer_address" ];
                var from_amount = 3_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "sellers_contract" ][ "contract" ][ "timelock" ];
                var sig2 = null;
                var preimage = dealership[ "buyers_contract" ][ "preimage" ];
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "seller_txid" ];
                var vout = dealership[ "seller_vout" ];
                // var txid = "40e535afb7b0cc9dcef4c65ffae3e8a5ba1de63849c7bab3e829dbf62d88e50f";
                // var vout = 1;
                var i_am_buyer = true;
                var txhex = await dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer, null, true);
                return txhex;
            }
            dealership[ "signContractAsSeller" ] = () => {
                var privkey = dealership[ "sellers_contract" ][ "privkey2" ];
                var pubkey1 = dealership[ "sellers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey2 = dealership[ "sellers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 2;
                var destino = dealership[ "buyer_address" ];
                var from_amount = 3_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "sellers_contract" ][ "contract" ][ "timelock" ];
                var hash = dealership[ "sellers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "seller_txid" ];
                var vout = dealership[ "seller_vout" ];
                // var txid = "9f7482339a9cd2735fbd94bed214e80a1667b89ba92cde7bf8b2a9d2b06ae5b1";
                // var vout = 1;
                return dealership.signContract(privkey, pubkey1, pubkey2, destino, from_amount, to_amount, timelock, hash, txid, vout);
            }
            dealership[ "useMultisigAsBuyer" ] = async sig2 => {
                var privkey = dealership[ "buyers_contract" ][ "privkey1" ];
                //remember that the pubkeys are reversed in the next two lines
                var pubkey2 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey1" ];
                var pubkey1 = dealership[ "buyers_contract" ][ "contract" ][ "pubkey2" ];
                var index = 2;
                var destino = dealership[ "buyer_address" ];
                var from_amount = 3_000;
                var to_amount = from_amount - 500;
                var timelock = dealership[ "sellers_contract" ][ "contract" ][ "timelock" ];
                var preimage = null;
                var hash = dealership[ "buyers_contract" ][ "contract" ][ "hash" ];
                var txid = dealership[ "seller_txid" ];
                var vout = dealership[ "seller_vout" ];
                // var txid = "072d8f21ebe6d74507331f843848e188eedbc7902f08ce18f50fc1e3b639b95a";
                // var vout = 1;
                // var sig2 = dealership.signContract(new_contract[ "privkey2" ], pubkey1, pubkey2, destino, from_amount, to_amount, timelock, hash, txid, vout);
                var i_am_buyer = true;
                dealership.settleContract(privkey, pubkey1, pubkey2, index, destino, from_amount, to_amount, timelock, sig2, preimage, hash, txid, vout, i_am_buyer, null, true);
            }
