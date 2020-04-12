import { web3, userAddress } from "./connectBlockchain";

const getBalanceOfContract = async (lottery) => {
    let result;
    if (web3) {
        await lottery.methods.getSumOnContract().call({}, (err, res) => {
            if (res) {
                let sum = parseInt(res);
                // console.log("web3", web3);
                // console.log("LotteryLimit", LotteryLimit);
                // console.log("data", res);
                // console.log("Sum of contract:");
                // console.log(sum);
                result = sum/1e18;
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getBalanceOfContract;
