import { Schema, model } from "mongoose";
import { IFile } from "./files.model";

interface IRepo {
  id: string;
  repo_name: string;
  repo_files: IFile[];
  repo_type: "private" | "public";
}

const repoSchema = new Schema<IRepo>({
  id: { type: String, required: true },
  repo_name: { type: String, required: true },
  repo_files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
  repo_type: { type: String, enum: ["private", "public"], required: true },
});

const RepoModel = model<IRepo>("Repo", repoSchema);

export default RepoModel;
