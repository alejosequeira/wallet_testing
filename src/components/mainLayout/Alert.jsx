import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { handleCopyAccountClick } from '@/utils/buttons';

const AlertComponent = ({ toggle, message,error, isCopied, setIsCopied}) => {
    return (
        <Alert severity="" sx={{
            width: "16rem",
            font: 'var(--default-font)',
            fontSize: '0.55rem',
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
            {toggle ? (
                <AlertTitle
                    sx={{
                        fontSize: '13px',
                        fontWeight: '600',
                        margin: '0px 10px 0px 0px',
                        color: 'blue',
                        textAlign: 'center',
                        padding: '0',
                    }}>
                    Success
                    {!isCopied &&
                        <svg onClick={() => handleCopyAccountClick(message, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className="clipboard">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                        </svg>
                    }
                    {isCopied && <span
                        className="text_copied"
                        id="myTooltip">Copied !</span>}
                </AlertTitle>

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
                        <svg onClick={() => handleCopyAccountClick(error, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className="clipboard">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                        </svg>
                    }
                    {isCopied && <span
                        className="text_copied"
                        id="myTooltip">Copied !</span>}
                </AlertTitle>)}
            <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                textAlign: 'center',
                margin: '0px 10px 0px 0px',
                overflowX: 'hidden',
                padding: '0',
            }}>{!error ? (
                <div>
                    {message}
                </div>)
                : (
                    <div>
                        Error: {error}
                    </div>
                )}
            </pre>
        </Alert>
    );
};

export default AlertComponent;
