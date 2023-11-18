import React, { useState } from "react";
import LoginImg from "../assets/login-img.svg";
import Input from "../components/Input";
import UILogo from "../assets/ui-logo.png";
import { Link, useHistory } from "react-router-dom";
import { ILogin, LoginUser } from "../api/auth";
import Backdrop from "../components/Backdrop";
import Spinner from "../components/Spinner";

type Props = {};

const Login = (props: Props) => {
  const history = useHistory();
  const [credentalState, setCredentialState] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const submitHandler = async (e: any) => {
    setShowLoader(true);
    e.preventDefault();
    if (!credentalState.email || !credentalState.password) {
      setShowError(true);
      return setErrMessage("Fill In the required fields");
    }
    const { success, message } = await LoginUser(credentalState);
    if (success) {
      setShowLoader(false);
      return history.push("/create");
    }
    setShowLoader(false);
    setShowError(true);
    setErrMessage(message);
  };
  return (
    <div className="">
      <h1 className="text-center mt-[2rem] font-bold text-lg">
        ACADEMIC AND RESEARCH REPOSITORY OUTPUT WEB APP
      </h1>
      <div className="flex w-[70%] relative py-3 items-center bg-secondary m-auto shadow-lg mt-[5rem] justify-center">
        <div className="w-[50%] border-r border-[#b3b0b0] ">
          <img src={LoginImg} alt="login-img" />
        </div>
        <div className="w-[50%]  ml-[2rem]">
          <div className="absolute w-14 top-[2rem] right-[2rem]">
            <img src={UILogo} alt="ui-logo" />
          </div>
          <h1 className="text-xl font-semibold mb-16">LOGIN</h1>
          <form>
            <Input
              changed={(e) => {
                setShowError(false);
                setCredentialState({
                  ...credentalState,
                  email: e.target.value,
                });
              }}
              type="email"
              placeholder=""
              label="Email"
              width="w-[80%]"
            />
            <Input
              changed={(e) => {
                setShowError(false);
                setCredentialState({
                  ...credentalState,
                  password: e.target.value,
                });
              }}
              type="password"
              placeholder=""
              label="Password"
              width="w-[80%]"
            />
            {showError && (
              <p className="text-[#c83a3a] -mt-6 mb-5">{errMessage}</p>
            )}
            {showLoader && <Backdrop />}
            {showLoader && <Spinner />}
            <div className="-mt-4 mb-[2rem]">
              <p className="text-xs">
                don't have an account?{" "}
                <span className="text-primary">
                  <Link to={"/signup"}>Sign Up</Link>{" "}
                </span>
              </p>
            </div>
            <div className=" flex justify-center w-[80%]">
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
    </div>
  );
};

export default Login;
