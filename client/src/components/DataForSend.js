import React from 'react';
import { useMessage } from '../hooks/message.hook';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default ({ setShowResults, contractAddress, ticketPrice }) => {
	const message = useMessage();
	const hide = () => setShowResults(false);
	return (
		<div id="dataForSend">
			<p>
				Copy address of lottery:<i className="fa fa-times-circle copy-wallet" onClick={hide}></i>
			</p>

			<div className="copy">
				<input id="myWallet" type="text" value={contractAddress} readOnly={true} />
				<CopyToClipboard text={contractAddress} onCopy={() => message('Lottery address copied')}>
					<i className="fa fa-copy copy-wallet"></i>
				</CopyToClipboard>
			</div>
			<div className="copy">
				<p>Ticket price:</p>
				<input id="myWallet" type="text" value={ticketPrice} readOnly={true} />
				<CopyToClipboard text={ticketPrice} onCopy={() => message('Ticket price copied')}>
					<i className="fa fa-copy copy-wallet"></i>
				</CopyToClipboard>
			</div>
		</div>
	);
};
