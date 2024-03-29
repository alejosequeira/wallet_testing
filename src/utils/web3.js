import Web3 from 'web3';
export const connectToWallet = async (setAccountsResult, setAccountsError) => {
  try {
    let provider;
    if (typeof window.ethereum !== 'undefined') {
      provider = window.ethereum;
    } else if (window.web3 && typeof window.web3.currentProvider !== 'undefined') {
      provider = window.web3.currentProvider;
    } else {
      console.log('No Ethereum wallet found');
      setAccountsError('No Ethereum wallet found')
      return;
    }

    const web3 = new Web3(provider);

    await provider.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const userAccount = accounts[0];
      setAccountsResult(userAccount)
      window.location.reload();
    } else {
      console.log('No accounts found.');
    }

  } catch (error) {
    console.error('Error connecting to wallet:', error);
    setAccountsError('Error connecting to wallet');
  }
};

export const handleGetEthAccounts = async (setFrom) => {
  try {

    const _accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (_accounts && _accounts.length > 0) {
      const checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
      setFrom(checksumAddress);
      return checksumAddress;
    }
  } catch (err) {
    console.error("Error executing eth_accounts FAILED: " + err);
    setFrom("Error eth_accounts FAILED");
  }
};
export const getNonce = async (address, setNonce) => {
  try {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const nonce = await web3.eth.getTransactionCount(address, 'latest');
    setNonce(`${nonce.toString()}`);
  } catch (error) {
    setNonce("Provided Address invalid");
  }
};
export const fetchGasLimit = async (fromResult, to, valueInHex, data, setGasLimit) => {
  try {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const transaction = {
      from: fromResult,
      to: to,
      value: valueInHex,
      data: data,
    };
    const estimatedGas = await window.ethereum.request({
      method: 'eth_estimateGas',
      params: [transaction],
    });
    const estimatedGasNumber = web3.utils.hexToNumber(estimatedGas);
    setGasLimit(`${estimatedGasNumber}`);
  } catch (error) {
    setGasLimit('Error estimating gas:');
    console.log(error)
  }
};
export const fetchMaxFees = async (setMaxFeePerGas) => {
  try {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const latestBlock = await web3.eth.getBlock('latest');
    const baseFeePerGas = latestBlock.baseFeePerGas;

    const baseFeeBigInt = BigInt(baseFeePerGas);

    const estimatedMaxFeePerGas = baseFeeBigInt * BigInt(2);

    setMaxFeePerGas(estimatedMaxFeePerGas.toString());
  } catch (error) {
    setMaxFeePerGas({ error })
    console.error('Error fetching max fees:', error);
  }
};
export const fetchGasPrice = async (setGasPrice) => {
  try {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const currentGasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
    const gasPricee = web3.utils.hexToNumber(currentGasPrice);
    setGasPrice(`${gasPricee}`);
  } catch (error) {
    setGasPrice({ error })
    console.error('Error fetching gas price:', error);
  }
};

export const getBlockchainData = async (setChainId) => {
  try {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const currentChainId = await web3.eth.getChainId();
    console.log(typeof currentChainId);
    setChainId(Number(currentChainId))
    console.log(Number(currentChainId))
    console.log(typeof currentChainId)

    console.log('currentChainId', currentChainId);
    return currentChainId;
  }
  catch (error) {
    console.error("Error fetching blockchain data:", error);
    const errorMessage = `Error: ${error.message}`;
    setChainId(errorMessage);
    return errorMessage;
  }
}
