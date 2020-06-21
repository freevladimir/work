const Web3 = require('web3')
const Tx = require('ethereumjs-tx');
const RPC_URL = 'wss://rinkeby.infura.io/ws/v3/dd922baac3004e5eaa558e1a89f11942'
const contractAdresses = require('./client/src/config/default')
const rp = require('request-promise')

let web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/dd922baac3004e5eaa558e1a89f11942',
    {
        // @ts-ignore
        clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000	// milliseconds
        }
    }));

let address = "0x2778C6F33A0C9a20866Cce84beb3e78b9dD26AE5"
let privateKey = "6FFD8A36CDC137AE3A0153201C33BC4CC334DF09F7C6ACA0C0B09308A3790F71"

const updateETH = async()=>{
    let priv = new Buffer(privateKey, 'hex')
    let Contract = new web3.eth.Contract(contractAdresses["SevenTOP"]["abi"], contractAdresses["SevenTOP"]["addressValue"])
    let ethPrice
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD',
      qs: {
        'start': '1',
        'limit': '3',
        'convert': 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '3946949b-d0a0-433c-86ca-4fa8c16feb0e'
      },
      json: true,
      gzip: true
    };

    await rp(requestOptions).then(response => {
      console.log('API call response:', parseInt(response.data[1].quote.USD.price));
      ethPrice = parseInt(response.data[1].quote.USD.price)
    }).catch((err) => {
      console.log('API call error:', err.message);
    })



    web3.eth.getTransactionCount(address, 'pending', (err, res) => {
        let nonce,
            txData = Contract.methods.updateEtherPrice(ethPrice).encodeABI()
        if(!err) {nonce = res}
        console.log("nonce: ", nonce)
        let rawTransaction = {
            "from": address,
            "nonce": web3.utils.toHex(nonce),
            "gasPrice": web3.utils.toHex(2 * 1e9),
            "gasLimit": web3.utils.toHex(3000000),
            "to": contractAdresses["SevenTOP"]["address"],
            "data": txData
        }

        const tx = new Tx(rawTransaction)
        console.log("tx: ", tx)
        tx.sign(priv)

        let serializedTx = tx.serialize()
        console.log('serializedTx : ', serializedTx)

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (!err)
            {
                console.log('Txn Sent and hash is '+hash)
            }
            else
            {
                console.error(err)
            }
        })
    })
}
console.log('updateETH start...')
let timerUpdate = setInterval(()=>{
    updateETH()
}, 86400000)
