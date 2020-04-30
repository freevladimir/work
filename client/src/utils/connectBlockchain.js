import Web3 from "web3";
import config from "../config/default";
import countOfTickets from "./countOfTickets";
import getBalanceOfContract from "./getBalanceOfContract";
import getMyTickets from "./myTickets";
import getMembers from "./members";
import {useCallback, useEffect, useState} from "react";
import getWinners from "./getWinners";
import getAllBankOfLimitGame from "./getAllBankForLimit";
import getTimeEndGame from "./getTimeEndGame";
import getAllCountOfTickets from "./getAllCountOfTickets";
import getAllTimesEndGame from './getAllTimeEnds'
// import { useHttp } from "../hooks/http.hook";

let TEST_RINKEBY =
        'wss://rinkeby.infura.io/ws/v3/2eb6c29c7ab24b9482f7a5bce63b8176',
  TEST_MAIN = 'wss://mainnet.infura.io/ws/v3/2eb6c29c7ab24b9482f7a5bce63b8176';
export let metamask, web3, abi, Lottery, userAddress, addressLottery, SevenTOP, StorageLimitLottery, loadingBlockchain = false;

const getAllValues = async (lotteryKey = 'limitLottery', addressIndex = 1) => {

  const currentAddress = config[lotteryKey].addresses[addressIndex]
  if(currentAddress && currentAddress.addressValue) {
    addressLottery = config[lotteryKey].addresses[addressIndex].addressValue;
    abi = config[lotteryKey].abi;

    Lottery = new web3.eth.Contract(abi, addressLottery);
    SevenTOP = new web3.eth.Contract(config.SevenTOP.abi, config.SevenTOP.address)
    StorageLimitLottery = new web3.eth.Contract(config.StorageLimitLottery.abi, config.StorageLimitLottery.address)
    loadingBlockchain = true
    console.log('loadingBlockchain: ', loadingBlockchain)
    console.log("blockchain is connected");
    // const { loading, request } = useHttp();


    const tickets = await countOfTickets(Lottery);
    const balanceOfContract = await getBalanceOfContract(Lottery);
    const myTickets = await getMyTickets(Lottery)
    const addressName = currentAddress.addressName

    const members = await getMembers(Lottery)

    const winners = await getWinners(Lottery)

    const bankForLimit = await getAllBankOfLimitGame()

    const timeEndGame = lotteryKey!=='limitLottery' ? await getTimeEndGame(Lottery): 1
    window.data = {tickets, balanceOfContract, myTickets, addressName, members, winners, bankForLimit, timeEndGame};
    loadingBlockchain = false
    console.log('loadingBlockchain: ', loadingBlockchain)
    const allTickets = await getAllCountOfTickets()
    const allTimesEnd = await getAllTimesEndGame()
    window.data = {tickets, balanceOfContract, myTickets, addressName, members, winners, bankForLimit, timeEndGame, allTickets, allTimesEnd};
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
};

export default getAllValues;
export const changeUser = (_address)=>{
  userAddress = _address
}
export const connectBlockChain = async (lotteryKey, addressIndex) => {

  console.log("start metamask");
  let tickets;
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
          web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(TEST_RINKEBY));;
          await console.log("web3", web3);
          console.log("userAddress: ", userAddress);
          getAllValues(lotteryKey, addressIndex).then((data) => {
            loadingBlockchain = false
            // console.log('loadingBlockchain: ', loadingBlockchain)
            // window.data = data;
          });


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
      web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(TEST_RINKEBY));;
      await console.log("web3", web3);
      getAllValues(lotteryKey, addressIndex).then((data) => {
        loadingBlockchain = false
        // window.data = data;
      });
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
    web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(TEST_RINKEBY));;
    getAllValues(lotteryKey, addressIndex).then((data) => {
      loadingBlockchain = false
      // window.data = data;
    });
    await console.log("web3", web3);
  }
  await console.log("web3", web3);
  await console.log("end metamask");
};

