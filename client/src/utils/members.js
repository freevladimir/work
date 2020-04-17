import { web3, userAddress, LotteryLimit } from "./connectBlockchain";
import {useCallback} from "react";
import {useHttp} from "../hooks/http.hook";

const getMembers = async (lottery) => {

    let result = [];
    if (web3) {
        await lottery.methods.ownersOfTickets().call({}, async (err, res) => {
            if (res) {
                result = res

            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getMembers;
