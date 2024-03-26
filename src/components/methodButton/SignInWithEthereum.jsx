'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AlertComponent from '../mainLayout/Alert';
import { handleGetEthAccounts } from '@/utils/web3';

export default function SignInWithEthereum (){
    
    
    const [from, setFrom] = useState('');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState();
    const [signatureCopy, setSignatureCopy] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fromResult = await handleGetEthAccounts(setFrom);         
            setMessages(`https://opensea.io wants you to sign in with your Ethereum account:\n${fromResult}\n\nSign in with Ethereum to the app.\n\nURI: https://opensea.ioVersion: 1\nChain ID: 137\nNonce: 12345678\nIssued At: 2024-03-10T01:08:50.113Z`)
    
        };
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

            const signature = await web3.eth.personal.sign(messages, from);
            setSignatureCopy(signature);
            const { r, s, v } = extractSignatureParts(signature);

            setMessage(`\n${signature}\n\nr:\n${r}\ns:\n${s}\nv:${v}`);
            setToggleHashZero(true);
        } catch (error) {
            console.error('Error signing in with Ethereum:', error);
            setMessage('Error signing in');
            setToggleHashZero(false);
        }
    };


    function extractSignatureParts(signature) {
        const r = "0x" + signature.slice(2, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        return { r, s, v };
    }


    return (
        <div className="formu">
            <button className="button" onClick={signInWithEthereum}>EIP-4361</button>
            {message && (
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

