"use client"
import React, { useState, useEffect } from 'react';
import style from '../sign_typedData/sign_typedData.module.css'
import { Alert, TextField } from '@mui/material';
import testParams from './msgParams.json';

export default function Sign_typedData({ address }) {
    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [signTypedDataV4, setSignTypedDataV4] = useState('');
    const [editedJson, setEditedJson] = useState(JSON.stringify(testParams, null, 2));
    


    const handleSignTypedDataV3 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");
        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v3',
                params: [address, editedJson],
            });
            setSignTypedDataV3(sign);
            console.log(JSON.stringify(editedJson))
        } catch (err) {
            console.error("Error este: "+err);
            setSignTypedDataV3(`Error: ${err.message}`);
        }
    }
    const handleSignTypedDataV4 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, editedJson],
            });
            setSignTypedDataV4(sign);
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
        }
    }

    const handleEditableJsonChange = (e) => {
        const editedData = e.target.value;
        setEditedJson(editedData);     
      };
      

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setEditedJson(fileContent);                
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(editedJson);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "testParams.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };


    return (
        <div className={style.container}>


            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={handleSignTypedDataV3}
                >SIGN TYPED DATA V3
                </button>
                {signTypedDataV3 && (
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

                        }}>{signTypedDataV3}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={handleSignTypedDataV4}
                > SIGN TYPED DATA V4
                </button>
                {signTypedDataV4 && (
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

                        }}>{signTypedDataV4}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formulario}>
                <div className={style.formulario_input}>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".json"
                        onChange={handleFileUpload}
                        className={style.input_file}
                    />
                    <button
                        onClick={handleSubmit}
                        className={style.bouton_download}
                    >
                        <span className={style.bouton_download_span}> Download Sample File</span>
                       </button>
                </div>
                <textarea
                    className={style.textarea_json}
                    value={editedJson}
                    onChange={handleEditableJsonChange}
                />
            </div>           
        </div>
    );
}