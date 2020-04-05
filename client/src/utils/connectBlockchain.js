import Web3 from "web3";
import config from "../config/default";
import countOfTickets from "./countOfTickets";
import getBalanceOfContract from "./getBalanceOfContract";
import getMyTickets from "./myTickets";
import getMembers from "./members";
import {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";


let TEST_RINKEBY =
    "https://rinkeby.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176",
  TEST_MAIN = "https://mainnet.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176";
export let metamask, web3, abi, LotteryLimit, userAddress, addressLottery;

export const getAllValues = async (lotteryKey = 'limitLottery', addressIndex = 1) => {

  const currentAddress = config[lotteryKey].addresses[addressIndex]
  if(currentAddress && currentAddress.addressValue) {
    console.log(config[lotteryKey].addresses[addressIndex].addressValue);
    console.log(config[lotteryKey].abi);
    addressLottery = config[lotteryKey].addresses[addressIndex].addressValue;
    abi = config[lotteryKey].abi;

    LotteryLimit = new web3.eth.Contract(abi, addressLottery);
    console.log("blockchain is connected");
    const tickets = await countOfTickets();
    const balanceOfContract = await getBalanceOfContract();
    const myTickets = await getMyTickets()
    const addressName = currentAddress.addressName
    const members = await getMembers()
    return {tickets, balanceOfContract, myTickets, addressName, members};
  }
};

export default getAllValues;

export const connectBlockChain = async (lotteryKey, addressIndex) => {

  console.log("start metamask");
  let tickets;
  if (window.ethereum) {
    metamask = await new Web3(window.ethereum);
    console.log("connect MetaMask");
    window.ethereum.on("accountsChanged", function (accounts) {
      userAddress = accounts[0];
      // Time to reload your interface with accounts[0]!
      console.log("change account: ", userAddress);
    });
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
          web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY));
          await console.log("web3", web3);
          console.log("userAddress: ", userAddress);
          getAllValues(lotteryKey, addressIndex).then((data) => {
            window.data = data;
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
      web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY));
      await console.log("web3", web3);
      getAllValues(lotteryKey, addressIndex).then((data) => {
        window.data = data;
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
    web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY));
    getAllValues(lotteryKey, addressIndex).then((data) => {
      window.data = data;
    });
    await console.log("web3", web3);
  }
  await console.log("web3", web3);
  await console.log("end metamask");
};

