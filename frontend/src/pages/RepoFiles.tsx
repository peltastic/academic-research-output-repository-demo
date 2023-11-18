import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRepo } from "../api/repo";
import { VscEmptyWindow } from "react-icons/vsc";
import {GrAdd} from "react-icons/gr"

type Props = {};

const RepoFiles = (props: Props) => {
  const location = useLocation();
  const [repoData, setRepoData] = useState({
    repo_name: "",
    repo_files: [],
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const path = location.pathname.split("/");
    const { message, success, data } = await getRepo(path[path.length - 1]);
    if (success) {
      setRepoData(data);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-[5rem] ml-6">
        {repoData?.repo_name} Repository
      </h1>

      {repoData.repo_files.length === 0 && (
        <div className="fixed  left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="text-[10rem]">
            <VscEmptyWindow />
          </div>
            <p className="text-center">Not Files Uploaded yet</p>
        </div>
      )}
      <div className="cursor-pointer p-7 fixed shadow-md bottom-[4rem] right-[4rem] text-3xl rounded-full">
        <GrAdd />
      </div>
    </div>
  );
};

export default RepoFiles;
