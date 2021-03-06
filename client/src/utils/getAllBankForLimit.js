import {web3, userAddress, StorageLimitLottery, SevenTOP, abi, addressLottery} from "./connectBlockchain";

const getAllBankOfLimitGame = async () => {
    let result = []
    if (web3) {
        const contractAdresses = require('../config/default')
        // contractAdresses["limitLottery"].addresses[0][""addressValue""]
        for (let i = 0; i < contractAdresses["limitLottery"].addresses.length; i++) {
            const Lottery = new web3.eth.Contract(contractAdresses["limitLottery"].abi, contractAdresses["limitLottery"].addresses[i]["addressValue"]);
            await Lottery.methods.getSumOnContract().call({}, (err, res) => {
                if (res) {
                    if(result[0]){
                        result[0] += parseInt(res);
                    } else {
                        result[0] = parseInt(res);
                    }
                } else if (err) {
                    console.log("This is error: ", err);
                }
            });
        }
        // for (let i = 0; i < contractAdresses["5Minutes"].addresses.length; i++) {
        //     const Lottery = new web3.eth.Contract(contractAdresses["5Minutes"].abi, contractAdresses["5Minutes"].addresses[i]["addressValue"]);
        //     await Lottery.methods.getSumOnContract().call({}, (err, res) => {
        //         if (res) {
        //             if(result[1]){
        //                 result[1] += parseInt(res);
        //             } else {
        //                 result[1] = parseInt(res);
        //             }
        //         } else if (err) {
        //             console.log("This is error: ", err);
        //         }
        //     });
        // }
        // for (let i = 0; i < contractAdresses["hour"].addresses.length; i++) {
        //     const Lottery = new web3.eth.Contract(contractAdresses["hour"].abi, contractAdresses["hour"].addresses[i]["addressValue"]);
        //     await Lottery.methods.getSumOnContract().call({}, (err, res) => {
        //         if (res) {
        //             if(result[2]){
        //                 result[2] += parseInt(res);
        //             } else {
        //                 result[2] = parseInt(res);
        //             }
        //         } else if (err) {
        //             console.log("This is error: ", err);
        //         }
        //     });
        // }
        // for (let i = 0; i < contractAdresses["day"].addresses.length; i++) {
        //     const Lottery = new web3.eth.Contract(contractAdresses["day"].abi, contractAdresses["day"].addresses[i]["addressValue"]);
        //     await Lottery.methods.getSumOnContract().call({}, (err, res) => {
        //         if (res) {
        //             if(result[3]){
        //                 result[3] += parseInt(res);
        //             } else {
        //                 result[3] = parseInt(res);
        //             }
        //         } else if (err) {
        //             console.log("This is error: ", err);
        //         }
        //     });
        // }
        for (let i = 0; i < contractAdresses["week"].addresses.length; i++) {
            const Lottery = new web3.eth.Contract(contractAdresses["week"].abi, contractAdresses["week"].addresses[i]["addressValue"]);
            await Lottery.methods.getSumOnContract().call({}, (err, res) => {
                if (res) {
                    if(result[1]){
                        result[1] += parseInt(res);
                    } else {
                        result[1] = parseInt(res);
                    }
                } else if (err) {
                    console.log("This is error: ", err);
                }
            });
        }
        for (let i = 0; i < contractAdresses["month"].addresses.length; i++) {
            const Lottery = new web3.eth.Contract(contractAdresses["month"].abi, contractAdresses["month"].addresses[i]["addressValue"]);
            await Lottery.methods.getSumOnContract().call({}, (err, res) => {
                if (res) {
                    if(result[2]){
                        result[2] += parseInt(res);
                    } else {
                        result[2] = parseInt(res);
                    }
                } else if (err) {
                    console.log("This is error: ", err);
                }
            });
        }
        for (let i = 0; i < contractAdresses["year"].addresses.length; i++) {
            const Lottery = new web3.eth.Contract(contractAdresses["year"].abi, contractAdresses["year"].addresses[i]["addressValue"]);
            await Lottery.methods.getSumOnContract().call({}, (err, res) => {
                if (res) {
                    if(result[3]){
                        result[3] += parseInt(res);
                    } else {
                        result[3] = parseInt(res);
                    }
                } else if (err) {
                    console.log("This is error: ", err);
                }
            });
        }
    }

        // await StorageLimitLottery.methods.getAllBankOfLimitGame(10).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // });
        // await SevenTOP.methods.getAllBankOfTimeGame(5).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
        // await SevenTOP.methods.getAllBankOfTimeGame(60).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
        // await SevenTOP.methods.getAllBankOfTimeGame(1440).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
        // await SevenTOP.methods.getAllBankOfTimeGame(10080).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
        // await SevenTOP.methods.getAllBankOfTimeGame(43200).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
        // await SevenTOP.methods.getAllBankOfTimeGame(525600).call({}, (err, res) => {
        //     if (res) {
        //         result.push(res);
        //     } else if (err) {
        //         console.log("This is error: ", err);
        //         result.push(0);
        //     }
        // })
    console.log('All BankL ', result)
    return result

};

export default getAllBankOfLimitGame;
