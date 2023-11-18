import express from "express"
import { createRepo, getAllUserRepo, getRepoFiles } from "../controllers/repo.controller"
import { authorize } from "../utils/authorize"


const router = express.Router()

router.post("/create", authorize ,createRepo)
router.get("/all", authorize, getAllUserRepo)
router.get("/files/:id", authorize, getRepoFiles)


export default router