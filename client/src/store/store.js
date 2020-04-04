import { observable, action, decorate } from "mobx";
import { createContext } from "react";
import { connectBlockChain } from "../utils/connectBlockchain";

class AppStore {
  // initial state of app
  ticketsCount = "";
  currentLotteryName = 'limitLottery'
  contractIndex = 0;

  constructor() {
    this.init();
  }

  init() {
    //инициализируем приложение, делаем конненкт к блокчейну. Аргументы connectBlockChain fn на данный момент дефолтные, указанные выше
    window.data = null;
    //window data получит значение по ходу выполнения функции connectBlockChain
    //ничего лучше я не придумал, поэтому так, но делать так не стоит. Помогла бы полная переработка структуры проекта
    connectBlockChain(this.currentLotteryName, this.contractIndex);
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

  intervalCheckTickets() {
    // Чекер проверяет значения window data и если условие соблюдено, то поменяет локальное значение ticketCount, и вызовет ре-рендер зависящих от этого значения компонентов
    setInterval(() => {
      if (window.data !== null && this.ticketsCount !== window.data) {
        this.ticketsCount = window.data;
      }
    }, 500);
  }
}

AppStore = decorate(AppStore, {
  currentLotteryName: observable,
  ticketsCount: observable,
  contractIndex: observable,
  init: action,
  contractChange: action,
});

export const store = new AppStore();
