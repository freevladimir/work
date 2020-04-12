import { web3, userAddress, Lottery } from "./connectBlockchain";

const countOfTickets = async (lottery) => {
  let result;
  if (web3) {
    await lottery.methods.getTicketsLength().call({}, (err, res) => {
      if (res) {
        let count = parseInt(res);
        result = count;
      } else if (err) {
        console.log("This is error: ", err);
        result = null;
      }
    });
    return result;
  }
};

export default countOfTickets;
