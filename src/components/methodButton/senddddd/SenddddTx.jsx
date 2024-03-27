"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import * as Web3Utils from '@/utils/web3';
import AlertComponent from '@/components/mainLayout/Alert';
import TransactionForm from './TransactionForm';
import ScamTransactionForm from './ScamTransactionForm';

const SendTransactionTX = ({ address, viewCheckSum }) => {
    const [from, setFrom] = useState();
    const [nonce, setNonce] = useState('0x0');
    const [chainId, setChainId] = useState(1);
    const [maxFeePerGas, setMaxFeePerGas] = useState('');
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState('0');
    const [isAutoMaxFee, setIsAutoMaxFee] = useState(true);
    const [txHash, setTxHash] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [showScamForm, setShowScamForm] = useState(false);
    const [toggleHash, setToggleHash] = useState(false);

    const fetchInitialData = useCallback(async () => {
        try {
            const fromResult = await Web3Utils.handleGetEthAccounts(setFrom);
            await Web3Utils.getNonce(fromResult, setNonce);
            await Web3Utils.fetchMaxFees(setMaxFeePerGas);
            const chainid = await Web3Utils.getBlockchainData(setChainId);
            setChainId(chainid);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handleSendTransaction = async (transactionParams) => {
        if (!window.ethereum) {
            setTxHash('No Ethereum Wallet Found');
            return;
        }

        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParams],
            });
            setTxHash(`0x${result}`);
            setToggleHash(true);
        } catch (error) {
            setTxHash(error.message);
            setToggleHash(false)
            console.error(error);
        }
    };

    const toggleScamForm = () => {
        setShowScamForm((prevState) => !prevState);
    };

    return (
        <div>
            <button onClick={toggleScamForm}>
                {showScamForm ? 'Show Transaction Form' : 'Show Scam Transaction Form'}
            </button>

            {showScamForm ? (
                <ScamTransactionForm
                    from={from}
                    nonce={nonce}
                    chainId={chainId}
                    maxFeePerGas={maxFeePerGas}
                    maxPriorityFeePerGas={maxPriorityFeePerGas}
                    isAutoMaxFee={isAutoMaxFee}
                    setIsAutoMaxFee={setIsAutoMaxFee}
                    onSendTransaction={handleSendTransaction}
                />
            ) : (
                <TransactionForm
                    from={from}
                    address={address}
                    viewCheckSum={viewCheckSum}
                    nonce={nonce}
                    chainId={chainId}
                    maxFeePerGas={maxFeePerGas}
                    maxPriorityFeePerGas={maxPriorityFeePerGas}
                    isAutoMaxFee={isAutoMaxFee}
                    setIsAutoMaxFee={setIsAutoMaxFee}
                    onSendTransaction={handleSendTransaction}
                />
            )}

            {txHash && (
                <div>
                    <AlertComponent
                        toggle={toggleHash}
                        message={txHash}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                    />
                </div>
            )}
        </div>
    );
};

export default SendTransactionTX;