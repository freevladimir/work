import {web3, userAddress, StorageLimitLottery, SevenTOP} from "./connectBlockchain";

const getAllBankOfLimitGame = async () => {
    let result =[];
    if (web3) {
        await StorageLimitLottery.methods.getAllBankOfLimitGame(10).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        });
        await SevenTOP.methods.getAllBankOfTimeGame(5).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllBankOfTimeGame(60).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllBankOfTimeGame(1440).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllBankOfTimeGame(10080).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllBankOfTimeGame(43200).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllBankOfTimeGame(525600).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        return result;
    }
};

export default getAllBankOfLimitGame;
