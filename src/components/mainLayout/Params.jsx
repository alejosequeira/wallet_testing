import React from "react";
import InputField from "./InputField";

const Params = ({ params }) => {
  return (
    <>
      <h1 className="title_params">Test Params</h1>
      <div className="header_gral_params">
        <div className="header_one_params">
          {params.map((param) => (
            <h4 key={param.name} className="card_title_params">
              {param.name}
            </h4>
          ))}
        </div>
        <div className="header_two_params">
          {params.map((param) => (
            <InputField key={param.name} param={param} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Params;
