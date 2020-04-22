import { web3, userAddress } from "./connectBlockchain";

const getMyTickets = async (lottery) => {
    let result;
    if (web3 && userAddress) {
        await lottery.methods.getMyTickets(userAddress).call({from: userAddress}, (err, res) => {
            if (res) {
                let myTickets = res;
                result = myTickets;
                console.log(result)
            } else if (err) {
                console.log("This is error: ", err);
                result = null;
            }
        });
        return result;
    }
};

export default getMyTickets;
