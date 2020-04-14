import { observable, action, decorate } from "mobx";
import { createContext } from "react";
import { connectBlockChain } from "../utils/connectBlockchain";

class AppStore {
  // initial state of app
  ticketsCount = ""
  balanceOfContract = 0
  myTickets = []
  addressName = ''
  members =[]
  currentLotteryName = ''
  contractIndex = 0;
  winners = []
  bankForLimit = 0
  timeEndGame = 0

  constructor() {
    this.init();
  }

  init() {
    //инициализируем приложение, делаем конненкт к блокчейну. Аргументы connectBlockChain fn на данный момент дефолтные, указанные выше
    window.data = null;
    //window data получит значение по ходу выполнения функции connectBlockChain
    //ничего лучше я не придумал, поэтому так, но делать так не стоит. Помогла бы полная переработка структуры проекта
    //connectBlockChain(this.currentLotteryName, this.contractIndex);
    //запускаем функцию чекер, которая будет следить за изменениями window.data
    this.intervalCheckTickets();
  }

  refreshBlockChainData(key, index) {
    //Вызываем функцию каждый раз, когда нужен запрос к другому контракту из default.json
    connectBlockChain(key, index);
  }

  contractChange(newInd) {
    //Функция, которая вызывается пока что только из слайдера. При смене слайда, мы получаем его индекс и меняем соответствующее значение в store. Затем вызываекм апдейт данных блокчейна с новыми значениями
    this.contractIndex = newInd;
    this.refreshBlockChainData(this.currentLotteryName, this.contractIndex)
  }

  changeGame(lotteryName) {
    this.currentLotteryName = lotteryName
    this.refreshBlockChainData(this.currentLotteryName, this.contractIndex)
  }

  intervalCheckTickets() {
    // Чекер проверяет значения window data и если условие соблюдено, то поменяет локальное значение ticketCount, и вызовет ре-рендер зависящих от этого значения компонентов
    setInterval(() => {
      if (window.data !== null) {
        let obj = new Object(window.data)
        if(obj.hasOwnProperty('tickets')){
          this.ticketsCount = window.data.tickets;
        } else {
          this.ticketsCount = 0
        }
        if(obj.hasOwnProperty('balanceOfContract')){
          this.balanceOfContract = window.data.balanceOfContract;
        } else{
          this.balanceOfContract = 0
        }
        if(obj.hasOwnProperty('myTickets')){
          this.myTickets = window.data.myTickets;
        } else{
          this.myTickets = []
        }
        if(obj.hasOwnProperty('addressName')){
          this.addressName = window.data.addressName;
        } else{
          this.addressName = ''
        }
        if(obj.hasOwnProperty('members')){
          this.members = window.data.members;

        } else{
          this.members = []
        }
        if(obj.hasOwnProperty('winners')){
          this.winners = window.data.winners;

        } else{
          this.winners = []
        }
        if(obj.hasOwnProperty('bankForLimit')){
          this.bankForLimit = window.data.bankForLimit;

        } else{
          this.bankForLimit = []
        }
        if(obj.hasOwnProperty('timeEndGame')){
          this.timeEndGame = window.data.timeEndGame;

        } else{
          this.timeEndGame = 0
        }
      }
    }, 500);
  }
}

AppStore = decorate(AppStore, {
  currentLotteryName: observable,
  ticketsCount: observable,
  balanceOfContract: observable,
  myTickets: observable,
  contractIndex: observable,
  members: observable,
  addressName: observable,
  winners: observable,
  bankForLimit: observable,
  timeEndGame: observable,
  init: action,
  contractChange: action,
  changeGame: action
});

export const store = new AppStore();
