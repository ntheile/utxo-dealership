var $ = document.querySelector.bind( document );
            var $$ = document.querySelectorAll.bind( document );
            var url_params = new URLSearchParams( window.location.search );
            var url_keys = url_params.keys();
            var $_GET = {}
            for ( var key of url_keys ) $_GET[ key ] = url_params.get( key );

var { getSharedSecret, schnorr, utils } = nobleSecp256k1;
            var crypto  = window.crypto;
            var sha256  = bitcoinjs.crypto.sha256;
            var keypair = bitcoinjs.ECPair.makeRandom();
            var privKey = keypair.privateKey.toString( "hex" );
            var pubKey  = keypair.publicKey.toString( "hex" );
            pubKey      = pubKey.substring( 2 );
            console.log( pubKey );
            var relay = "wss://nostrue.com";
            var socket = new WebSocket( relay );
            socket.addEventListener('message', async function( message ) {
                var [ type, subId, event ] = JSON.parse( message.data );
                var { kind, content } = event || {}
                if (!event || event === true) return;
                // console.log('message:', event);
                if (kind === 4) {
                    content = await decrypt(privKey, event.pubkey, content);
                    content = JSON.parse( content );
                    if ( content[ "type" ] == "accept" ) {
                        var info_for_seller = content[ "msg" ];
                        var buyers_contract = info_for_seller[ "buyers_contract" ];
                        var buyers_address = info_for_seller[ "buyers_address" ];
                        var buyers_contract = buyers_contract;
                        //change to testnet/
                        var txinfo = await dealership.addressReceivedMoneyInThisTx( buyers_contract.address, "" )
                        // var txid = prompt( "enter the txid you just entered" );
                        // var vout = prompt( "and the vout you just entered" );
                        // vout = Number( vout );
                        // var txinfo = [txid, vout, 4000];
                        // var txinfo = ["ab".repeat( 32 ), 0, 4000];
                        if ( txinfo[ 2 ] != 4_000 ) return;
                        dealership[ "buyer_txid" ] = txinfo[ 0 ];
                        dealership[ "buyer_vout" ] = txinfo[ 1 ];
                        dealership[ "buyer_address" ] = buyers_address;
                        dealership.buyers_contract.contract = buyers_contract;
                        var sellers_privkey = sessionStorage[ "sellers_privkey" ];
                        await dealership.prepSeller( sellers_privkey );
                        $( 'h2' ).remove();
                        // $( '.buy_utxo' ).style.display = "none";
                        var hd = document.createElement( "h2" );
                        hd.innerText = "ok you're the seller now, send 3000 sats to this address:";
                        $( '.procedure' ).append( hd );
                        var pg = document.createElement( "p" );
                        console.log( 3000, dealership.sellers_contract.contract.address );
                        pg.innerText = dealership.sellers_contract.contract.address;
                        $( '.procedure' ).append( pg );
                        await dealership.waitSomeSeconds( 3 );
                        //change to testnet/
                        await dealership.loopTilAddressReceivesMoney( dealership.sellers_contract.contract.address, "" );
                        //change to testnet/
                        var txinfo = await dealership.addressReceivedMoneyInThisTx( dealership.sellers_contract.contract.address, "" );
                        // var txid = prompt( "enter the txid" );
                        // var vout = prompt( "and the vout" );
                        // vout = Number( vout );
                        // var txinfo = [txid, vout, 3000];
                        // var txinfo = ["ab".repeat( 32 ), 0, 4000];
                        dealership[ "seller_txid" ] = txinfo[ 0 ];
                        dealership[ "seller_vout" ] = txinfo[ 1 ];
                        var another_bitcoin_address = "miCsGRg9GTKWfKDPGUhQ2jf5srtD4e9M2Q";
                        dealership[ "seller_address" ] = another_bitcoin_address;
                        var sellers_contract = dealership.sellers_contract.contract;
                        $( 'h2' ).remove();
                        $( 'p' ).remove();
                        var hd = document.createElement( "h2" );
                        hd.innerText = "ok send this to the buyer:";
                        $( '.procedure' ).append( hd );
                        var pg = document.createElement( "p" );
                        pg.innerText = JSON.stringify( {sellers_address: another_bitcoin_address, sellers_contract} );
                        $( '.procedure' ).append( pg );
                        var btn3 = document.createElement( "button" );
                        btn3.classList.add( "info_sent" );
                        btn3.innerText = "click when the info is sent";
                        sessionStorage[ "info_for_buyer" ] = JSON.stringify( {sellers_address: another_bitcoin_address, sellers_contract} );
                        setNostrNote( encrypt( privKey, event.pubkey, JSON.stringify( {type: "info_for_buyer", msg: {sellers_address: another_bitcoin_address, sellers_contract}} ) ), event.pubkey, relay );
                    }
                    if ( content[ "type" ] == "info_for_buyer" ) {
                        console.log('content:', content);
                        var info_for_buyer = content[ "msg" ];
                        var sellers_contract = info_for_buyer[ "sellers_contract" ];
                        var sellers_address = info_for_buyer[ "sellers_address" ];
                        //change to testnet/
                        var txinfo = await dealership.addressReceivedMoneyInThisTx( sellers_contract.address, "" )
                        // var txid = prompt( "enter the txid you just entered" );
                        // var vout = prompt( "and the vout you just entered" );
                        // vout = Number( vout );
                        // var txinfo = [txid, vout, 3000];
                        // var txinfo = ["ab".repeat( 32 ), 0, 3000];
                        if ( txinfo[ 2 ] != 3_000 ) return;
                        dealership[ "seller_txid" ] = txinfo[ 0 ];
                        dealership[ "seller_vout" ] = txinfo[ 1 ];
                        dealership[ "seller_address" ] = sellers_address;
                        dealership.sellers_contract.contract = sellers_contract;
                        var buyer_sig = await dealership.signContractAsBuyer()
                        var buyer_preimage = dealership.buyers_contract.preimage;
                        var hd = document.createElement( "h2" );
                        hd.innerText = "waiting for the seller's sats";
                        $( '.procedure' ).append( hd );
                        setNostrNote( encrypt( privKey, event.pubkey, JSON.stringify( {type: "more_info_for_seller", msg: {buyer_sig, buyer_preimage}} ) ), event.pubkey, relay );
                        $( 'h2' ).remove();
                    }
                    if ( content[ "type" ] == "more_info_for_seller" ) {
                        console.log('content:', content);
                        var more_info_for_seller = content[ "msg" ];
                        var hash = await dealership.sha256( dealership.hexToBytes( more_info_for_seller[ "buyer_preimage" ] ) );
                        if ( hash != dealership.sellers_contract.contract.hash ) return;
                        var buyer_sig = more_info_for_seller[ "buyer_sig" ];
                        var txhex = await dealership.useMultisigAsSeller( dealership.sellers_contract.privkey2, buyer_sig );
                        console.log( "txhex:", txhex );
                        alert( `ok you're the seller now -- broadcast this tx, then click ok:\n\n${txhex}` );
                        var seller_sig = await dealership.signContractAsSeller();
                        var hd = document.createElement( "h2" );
                        hd.innerText = "send this info to the buyer";
                        $( '.procedure' ).append( hd );
                        var pg = document.createElement( "p" );
                        pg.innerText = JSON.stringify( {seller_sig} );
                        $( '.procedure' ).append( pg );
                        setNostrNote( encrypt( privKey, event.pubkey, JSON.stringify( {type: "more_info_for_buyer", msg: {seller_sig}} ) ), event.pubkey, relay );
                        //return here for seller
                        $( 'h2' ).remove();
                        $( 'p' ).remove();
                        $( 'h2' ).remove();
                        $( 'p' ).remove();
                        var hd = document.createElement( "h2" );
                        hd.innerText = "you're done!";
                        $( '.procedure' ).append( hd );
                    }
                    if ( content[ "type" ] == "more_info_for_buyer" ) {
                        console.log('content:', content);
                        var more_info_for_buyer = content[ "msg" ];
                        $( 'h2' ).remove();
                        var seller_sig = more_info_for_buyer[ "seller_sig" ];
                        console.log( 'seller sig:', seller_sig );
                        var txhex = await dealership.useMultisigAsBuyer( seller_sig );
                        console.log( "txhex:", txhex );
                        alert( `ok you're the buyer now -- broadcast this tx, then click ok:\n\n${txhex}` );
                        // $( 'h2' ).remove();
                        var hd = document.createElement( "h2" );
                        hd.innerText = "you're done!";
                        $( '.procedure' ).append( hd );
                        //return here for buyer
                    }
                }
                if ( kind !== 63582 || $_GET[ "user" ] != "buyer" ) return;
                console.log('content:', content);
                if ( $( 'button' ) ) $( 'button' ).remove();
                var btn = document.createElement( "button" );
                btn.classList.add( "buy_utxo" );
                btn.innerText = "buy 3000 sats for 4000 sats";
                btn.setAttribute( "data-pubkey", content );
                btn.setAttribute( "data-nostrpub", event.pubkey );
                btn.onclick = async e => {
                    var sellers_pubkey = ( e.target.getAttribute( "data-pubkey" ) );
                    await dealership.prepBuyer( sellers_pubkey );
                    $( 'h2' ).remove();
                    $( '.buy_utxo' ).style.display = "none";
                    var hd = document.createElement( "h2" );
                    hd.innerText = "ok send 4000 sats to this address:";
                    $( '.procedure' ).append( hd );
                    var pg = document.createElement( "p" );
                    pg.innerText = dealership.buyers_contract.contract.address;
                    console.log( 4000, dealership.buyers_contract.contract.address );
                    $( '.procedure' ).append( pg );
                    await dealership.waitSomeSeconds( 3 );
                    //change to testnet/
                    await dealership.loopTilAddressReceivesMoney( dealership.buyers_contract.contract.address, "" );
                    //change to testnet/
                    var txinfo = await dealership.addressReceivedMoneyInThisTx( dealership.buyers_contract.contract.address, "" );
                    // var txid = prompt( "enter the txid" );
                    // var vout = prompt( "and the vout" );
                    // vout = Number( vout );
                    // var txinfo = [txid, vout, 4000];
                    // var txinfo = ["ab".repeat( 32 ), 0, 4000];
                    dealership[ "buyer_txid" ] = txinfo[ 0 ];
                    dealership[ "buyer_vout" ] = txinfo[ 1 ];
                    var some_bitcoin_address = "mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt";
                    dealership[ "buyer_address" ] = some_bitcoin_address;
                    var buyers_contract = dealership.buyers_contract.contract;
                    $( 'h2' ).remove();
                    $( 'p' ).remove();
                    //return here for buyer
                    var hd = document.createElement( "h2" );
                    hd.innerText = "waiting for the seller's okay";
                    $( '.procedure' ).append( hd );
                    // var pg = document.createElement( "p" );
                    // pg.innerText = JSON.stringify( {buyers_address: some_bitcoin_address, buyers_contract} );
                    // $( '.procedure' ).append( pg );
                    // var btn2 = document.createElement( "button" );
                    // btn2.classList.add( "info_sent" );
                    // btn2.innerText = "click when the info is sent";
                    var recipient = $( 'button' ).getAttribute( "data-nostrpub" );
                    setNostrNote( encrypt( privKey, recipient, JSON.stringify( {type: "accept", msg: {buyers_address: some_bitcoin_address, buyers_contract}} ) ), recipient, relay );
                    sessionStorage[ "info_for_seller" ] = JSON.stringify( {buyers_address: some_bitcoin_address, buyers_contract} );
                }
                $( '.procedure' ).append( btn );
            });

            socket.addEventListener('open', async function( e ) {
                console.log( "connected to " + relay );
                var subId   = bitcoinjs.ECPair.makeRandom().privateKey.toString( "hex" ).substring( 0, 16 );
                var filter  = { "#p": [ pubKey ] }
                // var filter2  = { kinds: [ 63582 ], limit: 1 }
                var filter3  = { kinds: [ 63582 ], since: Math.floor( Date.now() / 1000 ) }
                // var subscription = [ "REQ", subId, filter, filter2, filter3 ];
                var subscription = [ "REQ", subId, filter, filter3 ];
                console.log('Subscription:', subscription);
                socket.send(JSON.stringify( subscription ));
            });
            async function getSignedEvent(event, privateKey) {
                var eventData = JSON.stringify([
                    0,                  // Reserved for future use
                    event['pubkey'],        // The sender's public key
                    event['created_at'],    // Unix timestamp
                    event['kind'],      // Message “kind” or type
                    event['tags'],      // Tags identify replies/recipients
                    event['content']        // Your note contents
                ])
                event.id  = sha256( eventData ).toString( 'hex' );
                event.sig = await schnorr.sign( event.id, privateKey );
                return event;
            }
            function hexToBytes( hex ) {
                return Uint8Array.from( hex.match( /.{1,2}/g ).map( ( byte ) => parseInt( byte, 16 ) ) );
            }

            function bytesToHex( bytes ) {
                return bytes.reduce( ( str, byte ) => str + byte.toString( 16 ).padStart( 2, '0' ), '' );
            }
            function base64ToHex( str ) {
                var raw = atob( str );
                var result = '';
                var i; for ( i=0; i<raw.length; i++ ) {
                    var hex = raw.charCodeAt( i ).toString( 16 );
                    result += ( hex.length === 2 ? hex : '0' + hex );
                }
                return result;
            }
            function encrypt( privkey, pubkey, text ) {
                var key = nobleSecp256k1.getSharedSecret( privkey, '02' + pubkey, true ).substring( 2 );
                var iv = window.crypto.getRandomValues(new Uint8Array(16));
                var cipher = browserifyCipher.createCipheriv( 'aes-256-cbc', hexToBytes( key ), iv );
                var encryptedMessage = cipher.update(text,"utf8","base64");
                emsg = encryptedMessage + cipher.final( "base64" );
                var uint8View = new Uint8Array( iv.buffer );
                var decoder = new TextDecoder();
                return emsg + "?iv=" + btoa( String.fromCharCode.apply( null, uint8View ) );
            }
            function decrypt( privkey, pubkey, ciphertext ) {
                var [ emsg, iv ] = ciphertext.split( "?iv=" );
                var key = nobleSecp256k1.getSharedSecret( privkey, '02' + pubkey, true ).substring( 2 );
                var decipher = browserifyCipher.createDecipheriv(
                    'aes-256-cbc',
                    hexToBytes( key ),
                    hexToBytes( base64ToHex( iv ) )
                );
                var decryptedMessage = decipher.update( emsg, "base64" );
                dmsg = decryptedMessage + decipher.final( "utf8" );
                return dmsg;
            }
            var setNostrNote = async ( note, recipient, relay ) => {
                var event = {
                    "content": note,
                    "created_at": Math.floor( Date.now() / 1000 ),
                    "kind": recipient ? 4 : 63582,
                    "tags": recipient ? [ [ "p", recipient ] ] : [],
                    "pubkey": pubKey
                }
                var signedEvent = await getSignedEvent( event, privKey );
                var mysocket = new WebSocket( relay );
                mysocket.addEventListener( "open", () => mysocket.send( JSON.stringify( ["EVENT", signedEvent ] ) ) );
            }
