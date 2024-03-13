"use client";
import React, { useState } from 'react';
import style from '../signTypedData/sign_typedData.module.css';
import { Alert, AlertTitle } from '@mui/material';
import testParams from './msgParams.json';
import erc20Params from './erc20Params.json';

export default function SignTypedData({ address }) {
    
    const [signTypedData, setSignTypedData] = useState({ v3: '', v4: '' });
    const [jsonFiles, setJsonFiles] = useState({
        testParams: JSON.stringify(testParams, null, 2),
        erc20Params: JSON.stringify(erc20Params, null, 2),
    });
    const [currentJson, setCurrentJson] = useState('testParams');
    const [toggleHashZero, setToggleHashZero] = useState({ v3: 'false', v4: 'false' })

    const [isCopied, setIsCopied] = useState({ v3: false, v4: false })

    const handleCopyAccountClick = async (version) => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not available.');
            return;
        }
        try {
            await navigator.clipboard.writeText(signTypedData[version]);
            setIsCopied({[version]:true});
            console.log(navigator.clipboard.writeText(signTypedData[version]))
            setTimeout(() => setIsCopied({[version]:false}), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const handleSignTypedData = async (version) => {
        if (!window.ethereum) return alert("MetaMask is required!");
        try {
            const sign = await window.ethereum.request({
                method: `eth_signTypedData_${version}`,
                params: [address, jsonFiles[currentJson]],
            });
            setSignTypedData(prev => ({ ...prev, [version]: sign }));
            setToggleHashZero(prev => ({ ...prev, [version]: true }));
        } catch (err) {
            console.error("Signing error:", err);
            setSignTypedData(prev => ({ ...prev, [version]: `Error: ${err.message}` }));
            setToggleHashZero(prev => ({ ...prev, [version]: false }));
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/json") {
            const fileContent = await file.text();
            setJsonFiles(prev => ({
                ...prev,
                [currentJson]: fileContent,
            }));
        }
    };

    const downloadJson = (jsonName) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonFiles[jsonName]);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${jsonName}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className={style.container}>
            <div className={style.formu}>
                <button className={style.bouton} onClick={() => handleSignTypedData('v3')}>SIGN TYPED DATA V3</button>
                {signTypedData.v3 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "17.5rem",
                            font: 'var(--default-font)',
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'lightgray',
                            border: '3px solid gray',
                            borderRadius: '5px',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                            padding: '0',
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}>
                            {toggleHashZero.v3 ? (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: 'green',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Signature
                                    {!isCopied.v3 &&
                                        <svg onClick={() => handleCopyAccountClick('v3')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied.v3 && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            ) : (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Error
                                    {!isCopied.v3 &&
                                        <svg onClick={() => handleCopyAccountClick('v3')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied.v3 && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            )}
                            <pre style={{
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                textAlign: 'left',
                                margin: '0px 10px 0px 0px',
                                overflowX: 'hidden',
                                padding: '0',
                            }}>{signTypedData.v3}</pre>
                        </Alert>
                    </div>
                )}
                <button className={style.bouton} onClick={() => handleSignTypedData('v4')}>SIGN TYPED DATA V4</button>
                {signTypedData.v4 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "17.5rem",
                            font: 'var(--default-font)',
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'lightgray',
                            border: '3px solid gray',
                            borderRadius: '5px',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                            padding: '0',
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}>
                            {toggleHashZero.v4 ? (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: 'blue',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Signature
                                    {!isCopied.v4 &&
                                        <svg onClick={() => handleCopyAccountClick('v4')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied.v4 && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            ) : (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Error
                                    {!isCopied.v4 &&

                                        <svg onClick={() => handleCopyAccountClick('v4')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied.v4
                                        && <span
                                            className={style.text_copied}
                                            id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            )}

                            <pre style={{
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                textAlign: 'left',
                                margin: '0px 10px 0px 0px',
                                overflowX: 'hidden',
                                padding: '0',
                            }}>
                                {signTypedData.v4}

                            </pre>
                        </Alert>
                    </div>
                )}
            </div>
            <div className={style.formulario}>
                <input type="file" accept=".json" onChange={handleFileUpload} className={style.input_file} />
                <div className={style.formulario_input}>
                    <button onClick={() => downloadJson('erc20Params')} className={style.bouton_download}>Download ERC20 Permit sample</button>
                    <button onClick={() => downloadJson('testParams')} className={style.bouton_download}>Download OpenSea Contract sample</button>
                </div>
                <div className={style.textareaContainer}>
                    <button className={style.toggleButton} onClick={() => setCurrentJson(prev => prev === 'testParams' ? 'erc20Params' : 'testParams')}>
                        {currentJson === 'testParams' ? 'OpenSea' : 'ERC20'}
                    </button>
                    <textarea className={style.textarea_json} value={jsonFiles[currentJson]} onChange={(e) => setJsonFiles(prev => ({ ...prev, [currentJson]: e.target.value }))}></textarea>
                </div>
            </div>
        </div>
    );
}
