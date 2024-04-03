'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AlertComponent from '../mainLayout/Alert';
import { handleGetEthAccounts } from '@/utils/web3';

export default function SignInWithEthereum (){   
    const [from, setFrom] = useState('');
    const [messages, setMessages] = useState();
    const [signatureCopy, setSignatureCopy] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false)
useEffect(() => {
    const fetchData = async () => {
        const address= await handleGetEthAccounts(setFrom);
        setMessages(`https://opensea.io wants you to sign in with your Ethereum account:\n${address}\n\nSign in with Ethereum to the app.\n\nURI: https://opensea.io\nVersion: 1\nChain ID: 137\nNonce: 12345678\nIssued At: 2024-03-10T01:08:50.113Z`)
    }
    fetchData();
    }, []);
   
    const signInWithEthereum = async () => {
        if (!window.ethereum) {
            console.error('Please install MetaMask to use this feature.');
            return;
        }           
        try {
            const web3 = new Web3(window.ethereum);
            if (from.length === 0) {
                console.error('No Ethereum accounts found.');
                return;
            }            
            const signature = await web3.eth.personal.sign(messages, from,'');
            setSignatureCopy(signature);            
            console.log(signature)
            setToggleHashZero(true);
        } catch (error) {
            console.error('Error signing in with Ethereum:', error);
            setSignatureCopy('Error signing in', error);
            setToggleHashZero(false);        
        }
    };
    return (
        <div className="formu">
            <button className="button" onClick={signInWithEthereum}>EIP-4361</button>
            {signatureCopy && (
                <>
                    <AlertComponent
                        toggle={toggleHashZero}
                        message={signatureCopy}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
                </>
            )}
           
            <div className="formulario_grid">
                <label htmlFor="fromInput">From:</label>
                <textarea
                    type="text"
                    className="textarea_json"
                    id="fromInput"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}                 
                />
                
                <label htmlFor="description">Message:</label>
                <textarea
                    type="text"
                    className="textarea_json"
                    id="description"
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}                    
                />
                
            </div>
        </div>
    );
};

