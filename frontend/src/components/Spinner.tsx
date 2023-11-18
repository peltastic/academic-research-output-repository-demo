import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="z-[100] fixed top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%]">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
