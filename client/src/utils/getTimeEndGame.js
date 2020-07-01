import { web3 } from "./connectBlockchain";

const getTimeEndGame = async (lottery) => {
    try{
        let result;
        if (web3) {
            await lottery.methods.getTimeEnd().call({}, (err, res) => {
                if (res) {
                    result = parseInt(res - Date.now()/1000)*1000
                    if (result<=0) result = 1
                    console.log('TimeEnd: ', result)
                } else if (err) {
                    console.log("This is error: ", err);
                    result = null;
                }
            });
            return result;
        }
    } catch(e){
        console.log('TimeEndGame Error', e.message)
    }
};

export default getTimeEndGame;
