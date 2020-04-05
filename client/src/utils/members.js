import { web3, userAddress, LotteryLimit } from "./connectBlockchain";
import {useCallback} from "react";
import {useHttp} from "../hooks/http.hook";

const getMembers = async () => {

    let result = [];
    if (web3 && userAddress) {
        await LotteryLimit.methods.ownersOfTickets().call({}, async (err, res) => {
            if (res) {
                let members = res, flag;
                console.log("GETTING MEMBERS")
                result.push(members[0])
                for(let i=0; i<members.length; i++){
                    for(let j=0; j<result.length; j++){
                        if(result[j]===members[i]){
                            flag = true
                        }
                    }
                    if(!flag){
                        result.push(members[i])
                    }
                    flag=false
                }

            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getMembers;
