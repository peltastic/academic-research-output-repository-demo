import RepoModel from "../models/repo.model";
import { v4 as uuidv4 } from "uuid";

export const CreateRepo = async (repo_name: string, repo_type: string) => {
  const repo = await RepoModel.create({
    id: uuidv4(),
    repo_name,
    repo_type,
    repo_files: [],
  });
  return repo;
};

export const GetAllRepo = async () => {
  const repos = await RepoModel.find({});
  return repos;
};

export const GetRepo = async (id: string) => {
  const repo = await RepoModel.findOne({id});
  return repo;
};
