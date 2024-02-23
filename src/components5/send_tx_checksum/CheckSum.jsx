"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import style from './checkSum.module.css';
import { Alert, TextField, AlertTitle } from '@mui/material';
import testParams from '../../components_second/sign_typedData/msgParams.json';
import erc20Params from '../../components_second/sign_typedData/erc20Params.json';


export default function CheckSum() {

    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [toggleHashV3, setToggleHashV3] = useState(false);
    const [signTypedDataV4, setSignTypedDataV4] = useState('');
    const [toggleHashV4, setToggleHashV4] = useState(false);
    const [editedJson, setEditedJson] = useState(JSON.stringify(testParams, null, 2));
    const [editedJson2, setEditedJson2] = useState(JSON.stringify(erc20Params, null, 2));

    const [displayJson, setDisplayJson] = useState(editedJson);
    const [displayContract, setDisplayContract] = useState(false);

    const [address, setAddress] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd953');
    const [isValid, setIsValid] = useState(false);

    const validateAddressChecksum = () => {
        try {
            const isValidChecksum = Web3.utils.checkAddressChecksum(address);
            setIsValid(isValidChecksum);
        } catch (error) {
            console.error('Validation error:', error);
            setIsValid(false);
        }
    };

    const toggleDisplay = () => {
        setDisplayContract(!displayContract);
        if (displayContract) {
            setDisplayJson(editedJson);
        } else {
            setDisplayJson(editedJson2);
        }
    };

    const handleSignTypedDataV3 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");
        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v3',
                params: [address, displayJson],
            });
            setSignTypedDataV3(sign);
            setToggleHashV3(true)
            console.log(JSON.stringify(editedJson))
        } catch (err) {
            console.error("Error este: " + err);
            setSignTypedDataV3(`Error: ${err.message}`);
            setToggleHashV3(false)
        }
    }
    const handleSignTypedDataV4 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, displayJson],
            });
            setSignTypedDataV4(sign);
            setToggleHashV4(true)
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
            setToggleHashV4(false)
        }
    }

    const handleEditableJsonChange = (e) => {
        const editedData = e.target.value;
        if (displayContract) {
            setEditedJson(editedData);
        } else {
            setEditedJson2(editedData);
        }
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
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
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(editedJson2);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "erc20Params.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className={style.container}>
            <div className={style.formu_ADDRESS}>
                <label htmlFor="addressInput_eht" className={style.label_address}>Enter an Address</label>
               
                <TextField
                    type="text"
                    id="addressInput_eht"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder='0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954...'

                    InputProps={{
                        sx: {
                            color: 'white',
                            backgroundColor: '#434343',
                            fontSize: "0.65rem",
                            border: '1px solid rgb(222, 222, 222)',
                            borderRadius: '5px',
                            height: '1rem',
                            width: '17rem',
                            boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                            textDecoration: 'none',
                            padding: '0 10px',
                            '&:focus': {
                                border: '1px solid #434343',
                            },
                        },
                    }}
                    inputProps={{
                        sx: {
                            height: '20px',
                            textAlign: 'center',
                        },
                    }}
                /></div>

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

                        }}>
                             {toggleHashV3 ? (
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: 'blue',
                                        textAlign: 'center',
                                    }}>
                                    Tnx Hash: </AlertTitle>

                            ) : (
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: '#ad0424',
                                        textAlign: 'center',
                                    }}>
                                    Error: </AlertTitle>)}
                            {signTypedDataV3}</Alert>
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

                        }}>
                        {toggleHashV4 ? (
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: 'blue',
                                        textAlign: 'center',
                                    }}>
                                    Tnx Hash: </AlertTitle>

                            ) : (
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: '#ad0424',
                                        textAlign: 'center',
                                    }}>
                                    Error: </AlertTitle>)}
                        
                        {signTypedDataV4}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={validateAddressChecksum}
                > Validate CheckSum
                </button>
                {isValid ? (
                    <div>
                        <Alert severity="" sx={{
                            width: "14.5rem",
                            maxWidth: "14.5rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center'

                        }}>
                        
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: 'green',                                        
                                        textAlign: 'center',
                                    }}>
                                    Address has a valid EIP-55 checksum. </AlertTitle>                       
                        </Alert>
                    </div>
                ):
                <div>
                        <Alert severity="" sx={{
                            width: "14.5rem",
                            maxWidth: "14.5rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center'

                        }}> 
                        <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: '#ad0424',
                                        textAlign: 'center',
                                    }}>
                                    Address CheckSum is invalid. </AlertTitle>                                              
                        </Alert>
                    </div>
                }
            </div>
            
            <div className={style.formulario}>
                <input
                    type="file"
                    id="fileInput"
                    accept=".json"
                    onChange={handleFileUpload}
                    className={style.input_file}
                />
            
                <div className={style.formulario_input}>
                    <button
                        onClick={handleSubmit2}
                        className={style.bouton_download}
                    >
                        <span className={style.bouton_download_span}> Download ERC20 Permit sample</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={style.bouton_download}
                    >
                        <span className={style.bouton_download_span}> Download OpenSea Contract sample</span>
                    </button>
                </div>

                <div className={style.textareaContainer}>
                    <button className={style.toggleButton} onClick={toggleDisplay}>
                        {displayContract ? 'ERC20' : 'OpenSea'}
                    </button>
                    <textarea
                        className={style.textarea_json}
                        value={displayJson}
                        onChange={handleEditableJsonChange}
                    ></textarea>

                </div>

            </div>
        </div>
    );
}