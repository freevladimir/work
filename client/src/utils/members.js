import { web3, userAddress, LotteryLimit } from "./connectBlockchain";
import {useCallback} from "react";


const getMembers = async (lottery) => {
    let result = [];
    if (web3) {
        await lottery.methods.ownersOfTickets().call({}, async (err, res) => {
            if (res) {
                result = res
                console.log('Members', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getMembers;
