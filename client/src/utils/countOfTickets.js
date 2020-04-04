import { web3, userAddress, LotteryLimit } from "./connectBlockchain";

const countOfTickets = async () => {
  let result;
  if (web3 && userAddress) {
    await LotteryLimit.methods.getTicketsLength().call({}, (err, res) => {
      if (res) {
        let count = parseInt(res);
        console.log("web3", web3);
        console.log("LotteryLimit", LotteryLimit);
        console.log("data", res);
        console.log("Count Of Tickets:");
        console.log(count);
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
