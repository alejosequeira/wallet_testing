'use client';
import React, { useState } from 'react';
import style from './signtypedata.module.css';
import { Alert, Button } from '@mui/material';

const SignTypeData = ({ address }) => {
    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [signTypedDataV4, setSignTypedDataV4] = useState('');

    const handleSignTypedDataV3 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");
        const chainIdInt = 137;

        const msgParams= {
            types: {
              EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
              ],
              OrderComponents: [
                { name: 'offerer', type: 'address' },
                { name: 'zone', type: 'address' },
                { name: 'offer', type: 'OfferItem[]' },
                { name: 'consideration', type: 'ConsiderationItem[]' },
                { name: 'orderType', type: 'uint8' },
                { name: 'startTime', type: 'uint256' },
                { name: 'endTime', type: 'uint256' },
                { name: 'zoneHash', type: 'bytes32' },
                { name: 'salt', type: 'uint256' },
                { name: 'conduitKey', type: 'bytes32' },
                { name: 'counter', type: 'uint256' },
              ],
              OfferItem: [
                { name: 'itemType', type: 'uint8' },
                { name: 'token', type: 'address' },
                { name: 'identifierOrCriteria', type: 'uint256' },
                { name: 'startAmount', type: 'uint256' },
                { name: 'endAmount', type: 'uint256' },
              ],
              ConsiderationItem: [
                { name: 'itemType', type: 'uint8' },
                { name: 'token', type: 'address' },
                { name: 'identifierOrCriteria', type: 'uint256' },
                { name: 'startAmount', type: 'uint256' },
                { name: 'endAmount', type: 'uint256' },
                { name: 'recipient', type: 'address' },
              ],
            },
            primaryType: 'OrderComponents',
            domain: {
              name: 'Seaport',
              version: '1.5',
              verifyingContract: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
            },
            message: {
              offerer: '0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954',
              offer: [
                {
                  itemType: '2',
                  token: '0x06CbC40095C8Aa4Bf4a83A24A72EF4e511CbD67C',
                  identifierOrCriteria: '0',
                  startAmount: '1',
                  endAmount: '1',
                },
              ],
              consideration: [
                {
                  itemType: '1',
                  token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                  identifierOrCriteria: '0',
                  startAmount: '975000000000000000',
                  endAmount: '975000000000000000',
                  recipient: '0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954',
                },
                {
                  itemType: '1',
                  token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                  identifierOrCriteria: '0',
                  startAmount: '25000000000000000',
                  endAmount: '25000000000000000',
                  recipient: '0x0000a26b00c1F0DF003000390027140000fAa719',
                },
              ],
              startTime: '1706558876',
              endTime: '1706645274',
              orderType: '0',
              zone: '0x0000000000000000000000000000000000000000',
              zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
              salt: '24446860302761739304752683030156737591518664810215442929805956489435592037505',
              conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
              counter: '0',
            },
          };
          

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v3',
                params: [address, JSON.stringify(msgParams)],
            });
            setSignTypedDataV3(sign);
        } catch (error) {
            console.log('Error signing typed data V3: ', error);
            console.error(error);
            setSignTypedDataV3(`Error: ${error.message}`);
        }
        console.log("execute")
    };
    const handleSignTypedDataV4 = async () => {
        const chainIdInt = 137;

        const msgParams = {
            domain: {
                chainId: chainIdInt.toString(),
                name: 'Ether Mail',
                verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                version: '1',
            },
            message: {
                contents: 'Hello, Bob!',
                from: {
                    name: 'Cow',
                    wallets: [
                        '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                    ],
                },
                to: [
                    {
                        name: 'Bob',
                        wallets: [
                            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                            '0xB0B0b0b0b0b0B000000000000000000000000000',
                        ],
                    },
                ],
                attachment: '0x',
            },
            primaryType: 'Mail',
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Group: [
                    { name: 'name', type: 'string' },
                    { name: 'members', type: 'Person[]' },
                ],
                Mail: [
                    { name: 'from', type: 'Person' },
                    { name: 'to', type: 'Person[]' },
                    { name: 'contents', type: 'string' },
                    { name: 'attachment', type: 'bytes' },
                ],
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallets', type: 'address[]' },
                ],
            },
        };

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(msgParams)],
            });
            setSignTypedDataV4(sign);
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
        }
    };

    return (
        <div className={style.formu}>
            <div className={style.form}>
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
            <div className={style.form}>
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
        </div>
    );
};

export default SignTypeData;
