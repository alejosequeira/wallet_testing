import React from 'react';
import { TextField } from '@mui/material';

const Params = ({ params }) => {
    const InputField = ({ param }) => (
        <TextField
            type="text"
            value={param.value}
            onChange={(event) => param.onChange(event)}
            InputProps={{
                sx: {
                    color: 'white',
                    backgroundColor: '#434343',
                    fontSize: '0.65rem',
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
        />
    );

    return (
        <div className="header_gral_params">
            <h1 className="title_params">Test Params: </h1>
            <div className="header_one_params">
                {params.map(param => (
                    <h4 key={param.name} className="card_title_params">{param.name}</h4>
                ))}
            </div>
            <div className="header_two_params">
                {params.map(param => (
                    <InputField key={param.name} param={param} />
                ))}
            </div>
        </div>
    );
};

export default Params;

