import {web3, userAddress, StorageLimitLottery, SevenTOP} from "./connectBlockchain";

const getAllCountOfTickets = async () => {
    let result =[];
    if (web3) {
        await StorageLimitLottery.methods.getAllCountOfTickets(10).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        });
        await SevenTOP.methods.getAllCountOfTickets(5).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllCountOfTickets(60).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllCountOfTickets(1440).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllCountOfTickets(10080).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllCountOfTickets(43200).call({}, (err, res) => {
            if (res) {
                result.push(res);
            } else if (err) {
                console.log("This is error: ", err);
                result.push(0);
            }
        })
        await SevenTOP.methods.getAllCountOfTickets(525600).call({}, (err, res) => {
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

export default getAllCountOfTickets;
