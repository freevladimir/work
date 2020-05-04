import { web3, userAddress, LotteryLimit } from "./connectBlockchain";
import {useCallback} from "react";
import axios from 'axios'

const getMembers = async (lottery) => {
    let result = [];
    // let request = new XMLHttpRequest();
    // request.open('GET', url);
    if (web3) {
        await lottery.methods.ownersOfTickets().call({}, async (err, res) => {
            if (res) {

                await axios.post('http://7top.org/api/auth/members', res, {

                }).then(res => { // then print response status
                    console.log('axios res: ', res.data)
                    for(let i=0; i<res.data.length; i++){
                        result.push(res.data[i])    
                    }
                })
                
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        console.log('result: ', result)
        return result;
    }
};

export default getMembers;
