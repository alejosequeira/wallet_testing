import React from "react";

const ContinueTestBtn = ({ fn }) => {
  return (
    <button className="button" style={{ marginTop: 15 }} onClick={fn}>
      Continue the test
    </button>
  );
};

export default ContinueTestBtn;
