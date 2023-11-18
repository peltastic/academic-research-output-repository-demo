import { Schema, model } from "mongoose";
export interface IFile {
  file_name: string;
  file_url: string;
  file_type: string[];
}

const fileSchema = new Schema<IFile>({
    file_name: {type: String},
    file_url: {type: String},
    file_type: [{type: String, enum: ["PDF", "IMAGE"]}]
})

const FileModel = model<IFile>("File", fileSchema) 

export default FileModel
