import React, { useState } from "react";
import Backdrop from "./Backdrop";
import Input from "./Input";
import Toggle from "./Toggle";
import { ImCancelCircle } from "react-icons/im";
import Spinner from "./Spinner";
import { CreateUserRepo } from "../api/repo";
import { useHistory } from "react-router-dom";
type Props = {
  cancelModal: () => void;
  getData: () => void
};

const CreateRepoModal = (props: Props) => {
  const history = useHistory();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [repoName, setRepoName] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const submitHandler = async (e: any) => {
    setShowLoader(true);
    e.preventDefault();
    if (!repoName) {
      setShowLoader(false);
      setShowError(true);
      return setErrMessage("Fill In the required fields");
    }
    const payload: {
      repo_name: string;
      repo_type: "private" | "public";
    } = {
      repo_name: repoName,
      repo_type: enabled ? "private" : "public",
    };
    // console.log(payload)
    const { success, message } = await CreateUserRepo(payload);
    if (success) {
      setShowLoader(false);
      props.getData()
      props.cancelModal();
    }
    setShowLoader(false);
    setShowError(true);
    setErrMessage(message);
  };
  return (
    <div>
      <Backdrop />
      <div className=" bg-[#fff] w-[50%] mx-auto px-[2rem] py-[2rem] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <h1 className="text-lg mb-9 font-bold">Enter Repository Information</h1>
        <div
          onClick={props.cancelModal}
          className=" cursor-pointer absolute right-6 top-6 text-xl font-bold text-[#eb3c3c]"
        >
          <ImCancelCircle />
        </div>
        {showLoader && <Backdrop />}
        {showLoader && <Spinner />}
        <form>
          <Input
            type="text"
            placeholder=""
            label="Enter Repo Name"
            width="w-[80%] bg-secondary"
            required
            changed={(e) => {
              setShowError(false);
              setRepoName(e.target.value);
            }}
          />
          <div className="flex items-center">
            <p className="text-base mr-7 font-semibold">PRIVATE</p>
            <Toggle enabled={enabled} setEnabled={() => setEnabled(!enabled)} />
          </div>
          {showError && <p className="text-[#c83a3a] mt-3">{errMessage}</p>}
          <div className="mt-[2rem]">
            <button
              onClick={submitHandler}
              className="bg-primary text-[#fff] py-2 px-4 text-sm"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepoModal;
