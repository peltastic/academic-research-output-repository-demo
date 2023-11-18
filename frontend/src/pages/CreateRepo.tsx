import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllUserRepo } from "../api/repo";
import CreateRepoButton from "../components/CreateRepoButton";
import CreateRepoModal from "../components/CreateRepoModal";
import {useHistory} from "react-router-dom"

type Props = {};

const CreateRepo = (props: Props) => {
  const history = useHistory()
  const [showRepo, setShowRepo] = useState<boolean>(false);
  const [repoData, setRepoData] = useState<any[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { message, success, data } = await GetAllUserRepo();
    if (success) {
      console.log(data);
      return setRepoData(data);
    }
    history.push("/login")

  };
  return (
    <div className="">
       <h1 className="text-center mt-[2rem] font-bold text-lg">
        ACADEMIC AND RESEARCH REPOSITORY OUTPUT WEB APP
      </h1>
      <div className="ml-[2rem] mt-[2rem]">
        <CreateRepoButton clicked={() => setShowRepo(!showRepo)} />
      </div>
      {showRepo ? (
        <CreateRepoModal
          getData={() => getData()}
          cancelModal={() => setShowRepo(false)}
        />
      ) : (
        ""
      )}
      <div className="">
        <table className="mt-[5rem] w-[70%] ml-[2rem]">
          <tr className=" border-2">
            <th className="py-4 border-r-2">S/N</th>
            <th className="py-4 border-r-2">REPOSITORY NAME</th>
            <th className="py-4 border-r-2">REPOSITORY TYPE</th>
            <th className="py-4 border-r-2">FILES COUNT</th>
            <th>OPTIONS</th>
          </tr>
          {repoData?.map((el, index) => (
            <tr className="text-xs">
              <td className="text-center border-b-2 border-l-2 border-r-2 py-4">
                {index + 1}
              </td>
              <td className="text-center border-b-2 border-l-2 border-r-2 py-4">
                {el?.repo_name}
              </td>
              <td className="text-center border-b-2 border-l-2 border-r-2 py-4">
                {el?.repo_type}
              </td>
              <td className="text-center border-b-2 border-l-2 border-r-2 py-4">
                {el?.repo_files?.length}
              </td>
              <td className="border-b-2 border-l-2 border-r-2">
                <Link to={`/repo/files/${el.id}`}>
                  <button className="mx-auto block text-[#fff] py-1 px-2 bg-[#4e7ec2ee]">
                    View Repo
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CreateRepo;
