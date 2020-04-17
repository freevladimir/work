import {web3, userAddress, LotteryLimit, SevenTOP} from "./connectBlockchain";
import {useCallback} from "react";
import {useHttp} from "../hooks/http.hook";



const getWinners = async (lottery) => {
    let result = []
    if (web3) {
        let etherPrice = await SevenTOP.methods.ethPrice().call({}, (err, res) => {
            if (res) {
                return res
            } else if (err) {
                console.log("This is error: ", err);
                return null;
            }
        })
        await lottery.getPastEvents(
            'FirstWinner', {
                fromBlock: 0,
                toBlock: 'latest'
            }, (err, events)=>{
                if(events.length>0){

                    let winner = events[events.length-1].returnValues[0]
                    let time = events[events.length-1].returnValues[1]
                    let sum = (events[events.length-1].returnValues[2]/1e18*etherPrice).toFixed(2)
                    result.push([winner, time, sum])
                }
                if(err){
                    console.log(err)
                }
            }
        )
        await lottery.getPastEvents(
            'SecondWinner', {
                fromBlock: 0,
                toBlock: 'latest'
            }, (err, events)=>{
                if(events.length>0){

                    let winner = events[events.length-1].returnValues[0]
                    let time = events[events.length-1].returnValues[1]
                    let sum = (events[events.length-1].returnValues[2]/1e18*etherPrice).toFixed(2)

                    result.push([winner, time, sum])
                }
                if(err){
                    console.log(err)
                }
            }
        )
        return result

    }

}

export default getWinners;
