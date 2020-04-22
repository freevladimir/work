const contractAdresses = require('./client/src/config/default')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx');
const RPC_URL = 'https://rinkeby.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176'
//https://mainnet.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176
const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/2eb6c29c7ab24b9482f7a5bce63b8176'));
let address = "0x6a2a6cB905957f6cD41AF76EFA883D65B3DbBbfD"
let privateKey = "7A05E661FA5C422FE4547CBD4CCC134DCC628974CBCC88AE7E53F3140E643A6C"
let timerId

let contracts = {
    fiveMinutes: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["5Minutes"].addresses[9]["addressValue"]
        }
    },
    oneHour: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["hour"].addresses[9]["addressValue"]
        }
    },
    day: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["day"].addresses[9]["addressValue"]
        }
    },
    week: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["week"].addresses[9]["addressValue"]
        }
    },
    month: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["month"].addresses[9]["addressValue"]
        }
    },
    year: {
        loterry1$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[0]["addressValue"]
        },
        loterry2$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[1]["addressValue"]
        },
        loterry5$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[2]["addressValue"]
        },
        loterry15$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[3]["addressValue"]
        },
        loterry30$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[4]["addressValue"]
        },
        loterry50$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[5]["addressValue"]
        },
        loterry100$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[6]["addressValue"]
        },
        loterry300$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[7]["addressValue"]
        },
        loterry500$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[8]["addressValue"]
        },
        loterry1000$: {
            timeStamp: 0,
            address: contractAdresses["year"].addresses[9]["addressValue"]
        }
    },
    abi: [{"constant":true,"inputs":[],"name":"ownersOfTickets","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sevenTOP","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"playersMoreThanOne","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSumOnContract","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"uint256"}],"name":"calculateTicket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tickets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"refStorage","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"futureblock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"management","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getMyTickets","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTicketsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"setManagment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceLottery","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countOfTicket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drawing","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buyTicket","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"}],"name":"calculateEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"timeStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_priceLottery","type":"uint256"},{"name":"_timeSpending","type":"uint256"},{"name":"_refStorage","type":"address"},{"name":"_sevenTOP","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"timestapmt","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"FirstWinner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"timestapmt","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"SecondWinner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"FeePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"txCostRefunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewPlayer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"BonusSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"}],"name":"WinnerTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"}],"name":"LotteryStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
}

const setListeners = async ()=>{
    for (const lotteryTime in contracts){
        for(const lottery in contracts[lotteryTime]) {
            if (lotteryTime !== 'abi') {
                let Contract = new web3.eth.Contract(contracts.abi, contracts[lotteryTime][lottery].address)
                const subscription = await web3.eth.subscribe('logs', {
                    address: contracts[lotteryTime][lottery].address,
                    topics: ['0x09c29b084d9903010d337b295a2901aa0109413e1f8ebbcea53b897afb6c109c']
                }, (error, result) => {
                    if (!error) {
                        console.log("EVENT")
                        console.log('res', result)
                        let time = parseInt(result.data)
                        contracts[lotteryTime][lottery].timeStamp = time
                        console.log('timeStamp', time)
                        // drawing(lottery)
                    } else {
                        console.log(error)
                    }
                })
                // subscribedEvents[contracts] = subscription
                // console.log(Contract.events.LotteryStart())
            }
        }
    }
    console.log('Event listener has been started')
}

const getTimeEndGame = async (lottery) => {
    let result;
    if (web3) {
        await lottery.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result = parseInt(res)
                if (result<=0) result = 0
                console.log(lottery.options.address)
                console.log(`TimeEnd :  ${result}`)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
}

const getTimeValues = async ()=> {
    for (const lotteryTime in contracts) {
        for (const lottery in contracts[lotteryTime]) {
            if (lotteryTime !== 'abi') {
                let Contract = new web3.eth.Contract(contracts.abi, contracts[lotteryTime][lottery].address)
                contracts[lotteryTime][lottery].timeStamp = await getTimeEndGame(Contract)
            }
        }
    }
    console.log()
}

const start = async ()=>{
    await getTimeValues()
    await setListeners()
    timerId = setInterval(()=>{
        for (const lotteryTime in contracts){
            if(lotteryTime!=='abi'){
                for(const lottery in contracts[lotteryTime]){
                    if(contracts[lotteryTime][lottery].timeStamp <= Date.now()/1000 && contracts[lotteryTime][lottery].timeStamp>31536000){
                        drawing(lotteryTime, lottery) // write
                        console.log(`Drawing lottery: ${lottery}`)
                        console.log('TimeStamp', contracts[lotteryTime][lottery].timeStamp)
                        console.log('Now', Date.now()/1000)
                    }
                }
            }
        }
    }, 1000)
}
start()

const drawing = async (lotteryTime, lottery)=>{
    let priv = new Buffer(privateKey, 'hex')
    let Contract = new web3.eth.Contract(contracts.abi, lottery.address)
    web3.eth.getTransactionCount(address, 'pending', (err, res) => {
        let nonce,
            txData = Contract.methods.drawing().encodeABI()
        if(!err) {nonce = res}
        console.log("nonce: ", nonce)
        let rawTransaction = {
            "from": address,
            "nonce": web3.utils.toHex(nonce),
            "gasPrice": web3.utils.toHex(2 * 1e9),
            "gasLimit": web3.utils.toHex(3000000),
            "to": contracts[lotteryTime][lottery].address,
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
                const time = lottery.timeStamp
                contracts[lotteryTime][lottery].timeStamp = 0
                console.log('Txn Sent and hash is '+hash)
            }
            else
            {
                console.error(err)
            }
        })
    })
}


