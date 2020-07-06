import Web3 from "web3";
import config from "../config/default";
import countOfTickets from "./countOfTickets";
import getBalanceOfContract from "./getBalanceOfContract";
import getMyTickets from "./myTickets";
import getMembers from "./members";
import {useCallback, useEffect, useState, useContext} from "react";
import getWinners from "./getWinners";
import getAllBankOfLimitGame from "./getAllBankForLimit";
import getTimeEndGame from "./getTimeEndGame";
import getAllCountOfTickets from "./getAllCountOfTickets";
import getAllTimesEndGame from './getAllTimeEnds'
import { AuthContext } from "../context/AuthContext";
// import { useHttp } from "../hooks/http.hook";

let TEST_RINKEBY =
        'wss://rinkeby.infura.io/ws/v3/dd922baac3004e5eaa558e1a89f11942'
  //TEST_MAIN = 'wss://mainnet.infura.io/ws/v3/6907393337314e268e6dffc4e4fc47b0';
export let metamask, web3, abi, Lottery, userAddress, addressLottery, SevenTOP, StorageLimitLottery, loadingBlockchain = false;


const getAllValues = async (lotteryKey = 'week', addressIndex = 1) => {
  try{
    const currentAddress = config[lotteryKey].addresses[addressIndex]
    if(currentAddress && currentAddress.addressValue) {
      addressLottery = config[lotteryKey].addresses[addressIndex].addressValue;
      abi = config[lotteryKey].abi;

      Lottery = new web3.eth.Contract(abi, addressLottery);
      SevenTOP = new web3.eth.Contract(config.SevenTOP.abi, config.SevenTOP.address)
      StorageLimitLottery = new web3.eth.Contract(config.StorageLimitLottery.abi, config.StorageLimitLottery.address)
      // auth.loadTrue()
      console.log('loadingBlockchain: ', loadingBlockchain)
      console.log("blockchain is connected");
      // const { loading, request } = useHttp();


      const tickets = await countOfTickets(Lottery);
      const balanceOfContract = await getBalanceOfContract(Lottery);
      const myTickets = await getMyTickets(Lottery)
      const addressName = currentAddress.addressName

      const members = await getMembers(Lottery)

      const winners = await getWinners(Lottery)

      console.log('lotteryKey', lotteryKey)
      console.log('Lottery', Lottery)
      let timeEndGame = lotteryKey!=='limitLottery' ? await getTimeEndGame(Lottery): 0
      // timeEndGame = timeEndGame?timeEndGame:0
      console.log('show loto one')
      window.data = {tickets, balanceOfContract, myTickets, addressName, members, winners, timeEndGame}
      console.log('show lotto')
      // auth.loadFalse()
      console.log('loadingBlockchain: ', loadingBlockchain)
      const bankForLimit = await getAllBankOfLimitGame()
      // window.data['bankForLimit'] = bankForLimit
      const allTickets = await getAllCountOfTickets()
      // window.data['allTickets'] = allTickets
      const allTimesEnd = await getAllTimesEndGame()
      // window.data['allTimesEnd'] = allTimesEnd
      window.data = Object.assign(window.data, {bankForLimit, allTickets, allTimesEnd})
      
      await web3.eth.subscribe('logs', {
        address: addressLottery,
        topics: ['0x6b8fe0f067804a78a12efa88b8428446c8d8a703d5604dffc63ac27fcbdcfd0d']
      }, (error, result) => {
        if (!error) {
          connectBlockChain(lotteryKey, addressIndex)
          // drawing(lottery)
        } else {
          console.log(error)
        }
      })

      
      // return {
      //   tickets,
      //   balanceOfContract,
      //   myTickets,
      //   addressName,
      //   members,
      //   winners,
      //   bankForLimit,
      //   timeEndGame,
      //   allTickets,
      //   allTimesEnd
      // };
    }
  } catch(e){
    console.log('getAllValues Error', e.message)
  }
};

export default getAllValues;
export const changeUser = (_address)=>{
  userAddress = _address
}
export const connectBlockChain = async (lotteryKey, addressIndex) => {
  console.log("start metamask");
  let tickets;
  web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(TEST_RINKEBY,
    {
        // @ts-ignore
        clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000	// milliseconds
        }
    }));
  getAllValues(lotteryKey, addressIndex).then((data) => {
    loadingBlockchain = false
    // console.log('loadingBlockchain: ', loadingBlockchain)
    // window.data = data;
  });
  await console.log("web3", web3);
  await console.log("end metamask");
}

export const connectMetaMask = async ()=>{
  if (window.ethereum) {
    metamask = await new Web3(window.ethereum);
    console.log("connect MetaMask");

    try {
      window.ethereum.enable().then(async function () {
        // User has allowed account access to DApp...
        console.log("step2");
        if (metamask) {
          if (window.ethereum.selectedAddress !== undefined) {
            userAddress = window.ethereum.selectedAddress;
          } else if (web3.givenProvider.MetamaskInpageProvider !== undefined) {
            userAddress = web3.givenProvider.MetamaskInpageProvider;
          } else if (metamask.givenProvider.selectedAddress !== undefined) {
            userAddress = metamask.givenProvider.selectedAddress;
          }
        }
      });
    } catch (e) {
      // User has denied account access to DApp...
      console.log(e);
    }
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    metamask = await new Web3(web3.currentProvider);
    console.log(metamask);
    console.log("connect MetaMask");
    if (metamask) {
      if (window.ethereum.selectedAddress !== undefined) {
        userAddress = window.ethereum.selectedAddress;
      } else if (web3.givenProvider.MetamaskInpageProvider !== undefined) {
        userAddress = web3.givenProvider.MetamaskInpageProvider;
      } else if (metamask.givenProvider.selectedAddress !== undefined) {
        userAddress = metamask.givenProvider.selectedAddress;
      }
      console.log("userAddress: ", userAddress);
    }
    window.ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      userAddress = accounts[0];
      console.log("change account: ", userAddress);
    });
  }
  // Non-DApp Browsers
  else {
    console.log("You have to install MetaMask !");
    web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(TEST_RINKEBY,
    {
        // @ts-ignore
        clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000	// milliseconds
        }
    }));
  }
}
