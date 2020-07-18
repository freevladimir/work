import { web3, userAddress, LotteryLimit, SevenTOP } from './connectBlockchain';
import { useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import axios from 'axios';

const getWinners = async (lottery) => {
	let result = [];
	if (web3) {
		let etherPrice = await SevenTOP.methods.ethPrice().call({}, (err, res) => {
			if (res) {
				return res;
			} else if (err) {
				console.log('This is error: ', err);
				return null;
			}
		});
		await lottery.getPastEvents(
			'FirstWinner',
			{
				fromBlock: 0,
				toBlock: 'latest',
			},
			(err, events) => {
				if (events.length > 0) {
					let winner = events[events.length - 1].returnValues[0];
					let time = events[events.length - 1].returnValues[1];
					let sum = ((events[events.length - 1].returnValues[2] / 1e18) * etherPrice).toFixed(2);
					result.push([winner, time, sum]);
				}
				if (err) {
					console.log(err);
				}
			}
		);
		await lottery.getPastEvents(
			'SecondWinner',
			{
				fromBlock: 0,
				toBlock: 'latest',
			},
			(err, events) => {
				if (events.length > 0) {
					let winner = events[events.length - 1].returnValues[0];
					let time = events[events.length - 1].returnValues[1];
					let sum = ((events[events.length - 1].returnValues[2] / 1e18) * etherPrice).toFixed(2);

					result.push([winner, time, sum]);
				}
				if (err) {
					console.log(err);
				}
			}
		);
		await axios.post('/api/auth/winners', result, {}).then((res) => {
			// then print response status
			result = [];
			console.log('axios res: ', res.data);
			for (let i = 0; i < res.data.length; i++) {
				result.push(res.data[i]);
			}
		});
		console.log('Winners: ', result);
		return result;
	}
};

export default getWinners;
