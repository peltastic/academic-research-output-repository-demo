import React from "react";
import { GrFormAdd } from "react-icons/gr";

type Props = {
  clicked: () => void
};

const CreateRepoButton = (props: Props) => {
  return (
    <div onClick={props.clicked} className="border w-[10rem] cursor-pointer">
      <GrFormAdd className="text-[10rem]" />
      <p className="font-bold text-center mb-2">CREATE NEW REPO</p>
    </div>
  );
};

export default CreateRepoButton;
