"use client"
import React, { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

const Personal_custom = ({ address, challenge }) => {
    const [personal_customResult, setPersonal_customResult] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false)
    
    const handlePersonal_custom = async () => {
        try {
            const provider = window.ethereum;
            const msg = `0x${Buffer.from(challenge, 'utf8').toString('hex')}`;
            const sign = await provider.request({
                method: 'personal_sign',
                params: [msg, address],
            });
            setPersonal_customResult(sign);
            setToggleHashZero(true)
        } catch (err) {
            console.error(err);
            setPersonal_customResult(`Error: ${err.message}`);
            setToggleHashZero(false)
        }
    };

    return (
        <div className="formu">
            <button
                className="button"
                onClick={handlePersonal_custom}
            > PERSONAL SIGN
            </button>
            {personal_customResult && (
                <div>
                    <AlertComponent
                        toggle={toggleHashZero}
                        message={personal_customResult}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
                </div>
            )}
        </div>
    );
};

export default Personal_custom;
