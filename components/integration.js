import Web3 from 'web3'
let TEST_ROPSTEN = 'https://ropsten.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176',
    TEST_MAIN = 'https://mainnet.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176'

    async function getMetamask() {
        // console.log(wallet);
        console.log("start metamask");
        await window.addEventListener('load', () =>{

            if (window.ethereum) {
                metamask = new Web3(window.ethereum);
                console.log("connect MetaMask");
                window.ethereum.on('accountsChanged', function (accounts) {
                    userAddress = accounts[0];
                    // Time to reload your interface with accounts[0]!
                    console.log("change account: ", userAddress);

                })
                try {
                    window.ethereum.enable().then(function() {
                        // User has allowed account access to DApp...
                        console.log("step2")
                        if(metamask){
                            if(window.ethereum.selectedAddress!==undefined){
                                userAddress = window.ethereum.selectedAddress;
                            } else if(web3.givenProvider.MetamaskInpageProvider!==undefined){
                                userAddress = web3.givenProvider.MetamaskInpageProvider.selectedAddress;
                            } else if(metamask.givenProvider.selectedAddress!==undefined){
                                userAddress = metamask.givenProvider.selectedAddress;
                            }
                            web3 = new Web3(new Web3.providers.HttpProvider(TEST_MAIN));
                            console.log('userAddress: ', userAddress)
                        }
                    });
                } catch(e) {
                    // User has denied account access to DApp...
                    console.log(e)
                }
            }
            // Legacy DApp Browsers
            else if (window.web3) {
                metamask = new Web3(web3.currentProvider);
                console.log(metamask);
                console.log("connect MetaMask");
                if(metamask){
                    if(window.ethereum.selectedAddress!==undefined){
                        userAddress = window.ethereum.selectedAddress;
                    } else if(web3.givenProvider.MetamaskInpageProvider!==undefined){
                        userAddress = web3.givenProvider.MetamaskInpageProvider.selectedAddress;
                    } else if(metamask.givenProvider.selectedAddress!==undefined){
                        userAddress = metamask.givenProvider.selectedAddress;
                    }
                    web3 = new Web3(new Web3.providers.HttpProvider(TEST_MAIN));
                    console.log('userAddress: ', userAddress)
                }
                window.ethereum.on('accountsChanged', function (accounts) {
                    // Time to reload your interface with accounts[0]!
                    userAddress = accounts[0];
                    console.log("change account: ", userAddress);
                })
            }
            // Non-DApp Browsers
            else {
                console.log('You have to install MetaMask !');
                web3 = new Web3(new Web3.providers.HttpProvider(TEST_ROPSTEN));
            }
        });
        console.log("end metamask");

    }
