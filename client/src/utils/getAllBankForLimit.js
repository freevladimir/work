import {web3, userAddress, StorageLimitLottery} from "./connectBlockchain";

const getAllBankOfLimitGame = async () => {
    let result;
    if (web3) {
        await StorageLimitLottery.methods.getAllBankOfLimitGame(10).call({}, (err, res) => {
            if (res) {
                result = res;
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getAllBankOfLimitGame;
