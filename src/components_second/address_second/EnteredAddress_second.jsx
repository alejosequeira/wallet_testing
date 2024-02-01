'use client';
import { TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import style from './ea_second.module.css'
import BurgerMenu from '../../components/burguer/BurguerMenu';
import NavBar from '../../components/navBar/NavBar';
import Sign from '../sign/Sign';
import Personal_custom from '../personal_sign/personal_custom';
import Sign_typedData from '../sign_typedData/sign_typedData';
import { TextFields } from '@mui/icons-material';



export default function EnteredAddress_second() {
    const [address, setAddress] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
    const [challenge, setChallenge] = useState('Example `personal_sign` message');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleChallengeTextChange = (event) => {
        setChallenge(event.target.value);
    };
    return (
        <div>
            <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={style.pageContainer}>

                <BurgerMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className={`${style.content} ${sidebarOpen ? style.contentShift : ''}`}>

                    <div className={style.header_gral}>
                        <h1 className={style.title_params}>Test Params: </h1>
                        <div className={style.header_one}>
                            <h4 className={style.card_title}>Address </h4>
                            <h4 className={style.card_title}>Message </h4>
                        </div>
                        <div className={style.header_two}>
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
                                        fontSize: 15,
                                        border: '1px solid #434343',
                                        borderRadius: '0px',
                                        height: '20px',
                                        width: '400px',
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
                            />

                            <TextField
                                type="text"
                                id="challengeInput_eht"
                                value={challenge}
                                onChange={handleChallengeTextChange}
                                placeholder='0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a223458364f4d307a77763834665255437857495a6c786c3157644f4c5974577875222c22657068656d5075626c69634b6579223a22584136633541705051374e5332565a426a4950586a627a346b523057732f496f4242454f6f7673365853303d222c2263697068657274657874223a22566e4a554d6c73624e4d50767353652b6641364c6c6b514944457476227d'

                                InputProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: '#434343',
                                        fontSize: 15,
                                        border: '1px solid #434343',
                                        borderRadius: '0px',
                                        height: '20px',
                                        width: '400px',
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
                            />
                        </div>
                    </div>
                    <div className={style.form_test}>
                        <div className={style.block}>
                            <Sign address={address} challenge={challenge} />
                        </div>
                        <div className={style.block}>
                            <Sign_typedData address={address} />
                        </div>
                        <div className={style.block}>
                            <Personal_custom address={address} challenge={challenge} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

