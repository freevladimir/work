import { observable, action, decorate } from 'mobx';
import { createContext } from 'react';
import { connectBlockChain, setCommonValue } from '../utils/connectBlockchain';
import { changeFlag } from '../components/Timer';

class AppStore {
	// initial state of app
	ticketsCount = '';
	balanceOfContract = 0;
	myTickets = [];
	addressName = '';
	members = [];
	currentLotteryName = '';
	contractIndex = 0;
	winners = [];
	bankForLimit = [];
	timeEndGame = 0;
	allTickets = [];
	allTimesEnd = [];

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
		console.log('REFRESH');
	}

	contractChange(newInd) {
		//Функция, которая вызывается пока что только из слайдера. При смене слайда, мы получаем его индекс и меняем соответствующее значение в store. Затем вызываекм апдейт данных блокчейна с новыми значениями
		this.contractIndex = newInd;
		this.balanceOfContract = undefined;
		window.data.balanceOfContract = undefined;
		// this.timeEndGame = 1
		// window.data.timeEndGame = 1
		// window.data = Object.assign(window.data, {tickets: 0, balanceOfContract: 0, myTickets: [], addressName: '', members: [], winners: [], timeEndGame: 0})
		// this.tickets= 0
		// this.balanceOfContract = 0
		// this.myTickets = []
		// this.addressName = ''
		// this.members = []
		// this.winners = []
		// this.timeEndGame = 0
		this.refreshBlockChainData(this.currentLotteryName, this.contractIndex);
		console.log('CONTRACT CHANGE');
	}

	changeGame(lotteryName) {
		this.currentLotteryName = lotteryName;
		if (window.data !== null) {
			this.balanceOfContract = undefined;
			window.data.balanceOfContract = undefined;
			this.timeEndGame = 0;
			window.data.timeEndGame = 0;
			window.data = Object.assign(window.data, {
				tickets: 0,
				balanceOfContract: 0,
				myTickets: [],
				addressName: '',
				members: [],
				winners: [],
				timeEndGame: 0,
			});
			this.tickets = 0;
			this.balanceOfContract = 0;
			this.myTickets = [];
			this.addressName = '';
			this.members = [];
			this.winners = [];
			this.timeEndGame = 0;
			// this.allTimesEnd = []
			// window.data.allTimesEnd = []
		}
		this.refreshBlockChainData(this.currentLotteryName, this.contractIndex);
		console.log('GAME CHANGE');
	}

	clearGame() {
		delete this.tickets;
		delete this.balanceOfContract;
		delete this.myTickets;
		delete this.addressName;
		delete this.members;
		delete this.winners;
		delete this.timeEndGame;

		delete window.data.tickets;
		delete window.data.balanceOfContract;
		delete window.data.myTickets;
		delete window.data.addressName;
		delete window.data.members;
		delete window.data.winners;
		delete window.data.timeEndGame;
	}

	setValueForAll() {
		this.contractIndex = 0;
		setCommonValue();
	}

	// startGame() {
	//   this.currentLotteryName = lotteryName
	//   if(window.data!==null){
	//     this.balanceOfContract = undefined
	//     window.data.balanceOfContract = undefined
	//     this.timeEndGame = 0
	//     window.data.timeEndGame = 0
	//   }
	//   this.refreshBlockChainData(this.currentLotteryName, this.contractIndex)
	//   console.log("GAME CHANGE")
	// }

	intervalCheckTickets() {
		// Чекер проверяет значения window data и если условие соблюдено, то поменяет локальное значение ticketCount, и вызовет ре-рендер зависящих от этого значения компонентов
		setInterval(() => {
			if (window.data !== null) {
				let obj = new Object(window.data);
				if (obj.hasOwnProperty('tickets')) {
					if (obj.tickets !== undefined && this.ticketsCount !== obj.tickets) this.ticketsCount = window.data.tickets;
				} else {
					this.ticketsCount = 0;
				}
				if (obj.hasOwnProperty('balanceOfContract')) {
					if (obj.balanceOfContract !== undefined && this.balanceOfContract !== obj.balanceOfContract)
						this.balanceOfContract = window.data.balanceOfContract;
				} else {
					this.balanceOfContract = undefined;
				}
				if (obj.hasOwnProperty('myTickets')) {
					if (obj.myTickets !== undefined && this.myTickets.length !== obj.myTickets.length) this.myTickets = window.data.myTickets;
				} else {
					this.myTickets = [];
				}
				if (obj.hasOwnProperty('addressName')) {
					if (obj.addressName !== undefined && this.addressName !== obj.addressName) this.addressName = window.data.addressName;
				} else {
					this.addressName = '';
				}
				if (obj.hasOwnProperty('members')) {
					if (obj.members !== undefined && this.members.length !== obj.members.length) this.members = window.data.members;
				} else {
					this.members = [];
				}
				if (obj.hasOwnProperty('winners')) {
					if (obj.winners !== undefined && this.winners.length !== obj.winners.length) this.winners = window.data.winners;
				} else {
					this.winners = [];
				}
				if (obj.hasOwnProperty('bankForLimit')) {
					if (obj.bankForLimit !== undefined && this.bankForLimit.length !== obj.bankForLimit.length)
						this.bankForLimit = window.data.bankForLimit;
				} else {
					this.bankForLimit = [];
				}
				if (obj.hasOwnProperty('timeEndGame')) {
					if (obj.timeEndGame !== undefined && this.timeEndGame != window.data.timeEndGame) {
						changeFlag();
						this.timeEndGame = window.data.timeEndGame;
					}
				} else {
					this.timeEndGame = 0;
				}
				if (obj.hasOwnProperty('allTickets') && obj.allTickets !== undefined) {
					this.allTickets = window.data.allTickets;
				} else {
					this.allTickets = 0;
				}
				if (obj.hasOwnProperty('allTimesEnd')) {
					if (obj.allTimesEnd !== undefined && this.allTimesEnd.length !== obj.allTimesEnd.length)
						this.allTimesEnd = window.data.allTimesEnd;
				} else {
					this.allTimesEnd = [];
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
	allTickets: observable,
	allTimesEnd: observable,
	init: action,
	contractChange: action,
	changeGame: action,
});

export const store = new AppStore();
