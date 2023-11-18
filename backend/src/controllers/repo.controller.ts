import { Request, Response } from "express";
import { CreateRepo, GetAllRepo, GetRepo } from "../services/repo.service";

export const createRepo = async (req: Request, res: Response) => {
  const { repo_name, repo_type } = req.body;
  const repo = await CreateRepo(repo_name, repo_type);
  return res.status(200).json({
    success: true,
    message: "Repo Created Successfully",
    data: repo,
  });
};

export const getAllUserRepo = async (req: Request, res: Response) => {
    const repos = await GetAllRepo()
    return res.status(200).json({
      success: true,
      data: repos,
      message: "Repos Retrieved Successfully"
    })
}

export const getRepoFiles = async (req: Request, res: Response) => {
  const {id} = req.params
  const repo = await GetRepo(id)
  return res.status(200).json({
    success: true,
    data: repo
  })
}
