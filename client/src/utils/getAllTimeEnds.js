import { web3 } from "./connectBlockchain";
import config from "../config/default";

const getAllTimesEndGame = async (lottery) => {
    let result = [];
    if (web3) {
        const address5Minutes = config['5Minutes'].addresses[0].addressValue
        const addressHour = config['hour'].addresses[0].addressValue
        const addressDay = config['day'].addresses[0].addressValue
        const addressWeek = config['week'].addresses[0].addressValue
        const addressMonth = config['month'].addresses[0].addressValue
        const addressYear = config['year'].addresses[0].addressValue

        const abi = config['5Minutes'].abi;
        const FiveMinutes = new web3.eth.Contract(abi, address5Minutes);
        await FiveMinutes.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[0]<=0) result[0] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });

        const Hour = new web3.eth.Contract(abi, addressHour);
        await Hour.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[1]<=0) result[1] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });

        const Day = new web3.eth.Contract(abi, addressDay);
        await Day.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[2]<=0) result[2] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });

        const Week = new web3.eth.Contract(abi, addressWeek);
        await Week.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[3]<=0) result[3] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });

        const Month = new web3.eth.Contract(abi, addressMonth);
        await Month.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[4]<=0) result[4] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });

        const Years = new web3.eth.Contract(abi, addressYear);
        await Years.methods.getTimeEnd().call({}, (err, res) => {
            if (res) {
                result.push(parseInt(res - Date.now()/1000)*1000)
                if (result[5]<=0) result[5] = 0
                console.log('TimeEnd: ', result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
    }
    console.log('All Times: ', result)
    return result
};

export default getAllTimesEndGame;
