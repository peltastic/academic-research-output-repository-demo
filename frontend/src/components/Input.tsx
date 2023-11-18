import React from "react";

type Props = {
  type: string;
  placeholder: string;
  width: string;
  label: string;
  required?: boolean
  changed: (e: any) => void
};

const Input = (props: Props) => {
  return (
    <div className="my-3">
      <label className="font-medium block mb-2 text-base">{props.label}</label>
      <input
        className={`${props.width} text-sm outline-none px-6 py-3 mb-4`}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.changed}
      />
    </div>
  );
};

export default Input;
