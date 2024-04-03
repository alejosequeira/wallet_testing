"use client";
import React, { useState } from "react";
import testParams from "../.././api/openSeaEIP_712.json";
import erc20Params from "../.././api/erc20Token.json";
import AlertComponent from "@/components/mainLayout/Alert";

const SignTypeData = ({ address }) => {
  const [showForm, setShowForm] = useState(false);
  const [signTypedData, setSignTypedData] = useState({ v3: "", v4: "" });
  const [jsonFiles, setJsonFiles] = useState({
    testParams: JSON.stringify(testParams, null, 2),
    erc20Params: JSON.stringify(erc20Params, null, 2),
  });
  const [currentJson, setCurrentJson] = useState("testParams");
  const [toggleHashZero, setToggleHashZero] = useState({ v3: "false", v4: "false" });

  const [isCopiedv3, setIsCopiedv3] = useState(false);
  const [isCopiedv4, setIsCopiedv4] = useState(false);
  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  };

  const handleSignTypedData = async (version) => {
    try {
      const sign = await window.ethereum.request({
        method: `eth_signTypedData_${version}`,
        params: [address, jsonFiles[currentJson]],
      });
      setSignTypedData((prev) => ({ ...prev, [version]: sign }));
      setToggleHashZero((prev) => ({ ...prev, [version]: true }));
    } catch (err) {
      console.error("Signing error:", err);
      setSignTypedData((prev) => ({ ...prev, [version]: `${err.message}` }));
      setToggleHashZero((prev) => ({ ...prev, [version]: false }));
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const fileContent = await file.text();
      setJsonFiles((prev) => ({
        ...prev,
        [currentJson]: fileContent,
      }));
    }
  };

  const downloadJson = (jsonName) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonFiles[jsonName]);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${jsonName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className='formulario1'>
      <button className='button' onClick={() => handleSignTypedData("v3")}>
        SIGN TYPED DATA V3
      </button>
      {signTypedData.v3 && (
        <div>
          <AlertComponent
            toggle={toggleHashZero.v3}
            message={signTypedData.v3}
            isCopied={isCopiedv3}
            setIsCopied={setIsCopiedv3}
          />
        </div>
      )}
      <button className='button' onClick={() => handleSignTypedData("v4")}>
        SIGN TYPED DATA V4
      </button>
      {signTypedData.v4 && (
        <div>
          <AlertComponent
            toggle={toggleHashZero.v4}
            message={signTypedData.v4}
            isCopied={isCopiedv4}
            setIsCopied={setIsCopiedv4}
          />
        </div>
      )}
      <button onClick={toggleFormDisplay} className='toggleButton'>
        {showForm ? "Hide SIGN Params" : "Show SIGN Params"}
      </button>

      {showForm && (
        <>
          <div className='formulario_one'>
            <input type='file' accept='.json' onChange={handleFileUpload} className='upload_file' />

            <button onClick={() => downloadJson("erc20Params")} className='button_download'>
              Download ERC20 Permit sample
            </button>
            <button onClick={() => downloadJson("testParams")} className='button_download'>
              Download OpenSea Contract sample
            </button>

            <div style={{ position: "relative" }}>
              <button
                className='toggle_absolute_button'
                onClick={() => setCurrentJson((prev) => (prev === "testParams" ? "erc20Params" : "testParams"))}>
                {currentJson === "testParams" ? "OpenSea" : "ERC20"}
              </button>
              <textarea
                className='textarea_json'
                value={jsonFiles[currentJson]}
                onChange={(e) => setJsonFiles((prev) => ({ ...prev, [currentJson]: e.target.value }))}></textarea>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignTypeData;
