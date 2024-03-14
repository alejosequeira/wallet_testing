"use client"
import React, { useState } from 'react';
import { Alert,AlertTitle } from '@mui/material';
import style from './personal_custom.module.css';

const Personal_custom = ({ address, challenge }) => {
    const [personal_customResult, setPersonal_customResult] = useState('');

    const [toggleHashZero, setToggleHashZero] = useState(false);

    const [isCopied, setIsCopied] = useState(false)
    const handleCopyAccountClick = async () => {
      if (!navigator.clipboard) {
        console.error('Clipboard API not available.');
        return;
      }
      try {
        await navigator.clipboard.writeText(personal_customResult);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    };
    const handlePersonal_custom = async () => {

        try {
            const provider = window.ethereum;
            const msg = `0x${Buffer.from(challenge, 'utf8').toString('hex')}`;
            const sign = await provider.request({
                method: 'personal_sign',
                params: [msg, address],
            });
            setPersonal_customResult(sign);
        } catch (err) {
            console.error(err);
            setPersonal_customResult(`Error: ${err.message}`);
        }
    };

    return (
        <div className={style.formu}>
            <button
                className={style.bouton}
                onClick={handlePersonal_custom}
            > PERSONAL SIGN
            </button>
            {personal_customResult && (
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
                        {toggleHashZero ? (
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: 'blue',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                Tnx Hash: </AlertTitle>

                        ) : (
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                Error
                                {!isCopied &&
                                    <svg onClick={handleCopyAccountClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                    </svg>
                                }
                                {isCopied && <span
                                    className={style.text_copied}
                                    id="myTooltip">Copied !</span>}
                            </AlertTitle>)}
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            textAlign: 'left',
                            margin: '0px 10px 0px 0px',
                            overflowX: 'hidden',
                            padding: '0',
                        }}>{personal_customResult}</pre>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default Personal_custom;