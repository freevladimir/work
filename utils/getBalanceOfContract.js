import { web3, userAddress } from "./connectBlockchain";

const getBalanceOfContract = async (lottery) => {
    let result;
    if (web3) {
        await lottery.methods.getSumOnContract().call({}, (err, res) => {
            if (res) {
                let sum = parseInt(res);
                result = (sum/1e18).toFixed(2);
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getBalanceOfContract;
