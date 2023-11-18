import UserModel from "../models/users.model";
import { IUser } from "../models/users.model";


export const CheckEmail = async (email: string): Promise<boolean> => {
  const user_email = await UserModel.findOne({ email });

  const result = user_email ? true : false;
  return result;
};

export const CreateUser = async (body: IUser) => {
    await UserModel.create(body)
}


export const FindEmail = async (email: string) => {
    const user = await UserModel.findOne({email})
    return user
}