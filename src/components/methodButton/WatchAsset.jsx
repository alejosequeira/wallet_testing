"use client";
import React, { useState } from "react";
import AlertComponent from "@/components/mainLayout/Alert";

function WatchAsset() {
    const [executionMessage, setExecutionMessage] = useState("");
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const [toggleParams, setToggleParams] = useState(false);

    //Default asset to watch
    const [type, setType] = useState("ERC20");
    const [address, setAddress] = useState("0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
    const [symbol, setSymbol] = useState("USDT");
    const [decimals, setDecimals] = useState(6);
    const [image, setImage] = useState("https://polygonscan.com/token/images/tether_32.png");

    const predefinedTokens = [
        {
            type: "ERC20",
            address: "0x2528b12bF1b1B01A01F01b3AE9fBeFC19e444Dff",
            symbol: "EPEPE",
            decimals: 18,
            image: "https://polygonscan.com/token/images/evilkongs_32.png",
        },
        {
            type: "ERC20",
            symbol: "USDC.e",
            address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            decimals: 6,
            image: "https://polygonscan.com/assets/poly/images/svg/logos/token-light.svg?v=24.4.1.0",
        },
    ];

    const handleSelectChange = (e) => {
        const index = e.target.value;
        setType(predefinedTokens[index].type);
        setSymbol(predefinedTokens[index].symbol);
        setAddress(predefinedTokens[index].address);
        setDecimals(predefinedTokens[index].decimals);
        setImage(predefinedTokens[index].image);
    };

    const handleWatchAsset = async () => {
        try {
            const watchAssetResult = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: type,
                    options: {
                        address: address,
                        symbol: symbol,
                        decimals: decimals,
                        image: image,
                    },
                },
            });

            console.log(watchAssetResult);
            setExecutionMessage("watchAssetButton executed correctly");
            setToggleHashZero(true);
        } catch (error) {
            console.error(error);
            setExecutionMessage(`${error.message}`);
            setToggleHashZero(false);
        }
    };

    return (
        <div className="formulario1">
            <button className="button" onClick={handleWatchAsset}>
                WATCH ASSET
            </button>
            <button onClick={() => setToggleParams(!toggleParams)} className="toggleButton">
                {toggleParams ? "Hide Params" : "Show Params"}
            </button>
            {toggleParams && (
                <>
                    <select onChange={handleSelectChange}>
                        <option value="">Select a token</option>
                        {predefinedTokens.map((token, index) => (
                            <option key={index} value={index}>
                                {token.symbol}
                            </option>
                        ))}
                    </select>
                    <div className="formulario_grid">
                        <label htmlFor="fromInput">Type:</label>
                        <input type="text" className="formulario_grid_input" id="fromInput" value={type} onChange={(e) => setType(e.target.value)} />
                        <label htmlFor="fromInput">Address:</label>
                        <input
                            type="text"
                            className="formulario_grid_input"
                            id="fromInput"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="fromInput">Symbol:</label>
                        <input
                            type="text"
                            className="formulario_grid_input"
                            id="fromInput"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                        <label htmlFor="fromInput">Decimals:</label>
                        <input
                            type="text"
                            className="formulario_grid_input"
                            id="fromInput"
                            value={decimals}
                            onChange={(e) => setDecimals(e.target.value)}
                        />
                        <label htmlFor="fromInput">Image:</label>
                        <input
                            type="text"
                            className="formulario_grid_input"
                            id="fromInput"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </>
            )}

            {executionMessage && (
                <div>
                    <AlertComponent toggle={toggleHashZero} message={executionMessage} isCopied={isCopied} setIsCopied={setIsCopied} />
                </div>
            )}
        </div>
    );
}

export default WatchAsset;
