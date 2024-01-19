"use client"
import React, { useState } from 'react';
import { Alert } from '@mui/material';
import style from './personal_custom.module.css';

const Personal_custom = ({ address, challenge }) => {
    const [personal_customResult, setPersonal_customResult] = useState('');

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
                        width: "14.5rem",
                        maxWidth: "14.5rem",
                        fontSize: '13px',
                        color: 'black',
                        backgroundColor: 'lightgray',
                        border: '3px solid gray',
                        borderRadius: '5px',
                        padding: '0 10px 0px 0px',
                        textAlign: 'center',
                        margin: '0 5px',
                        marginTop: '5px',
                        boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>{personal_customResult}</Alert>
                </div>
            )}
        </div>
    );
};

export default Personal_custom;
