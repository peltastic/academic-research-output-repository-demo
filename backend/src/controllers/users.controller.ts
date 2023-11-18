import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { CheckEmail, CreateUser, FindEmail } from "../services/users.service";
import jwt from "jsonwebtoken";
import config from "config";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).send({
      message: "Password too Short",
      success: false
    });
  }
  const emailExists = await CheckEmail(email);
  if (emailExists) {
    return res.status(400).send({
      message: "Email Already Exists!",
      success: false
    });
  }
  await CreateUser({ email, password, roles: ["USER"] });
  return res.status(201).json({
    success: true,
    message: "User Signed Up Successfully",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const body = req.body;
  const emailExists = await CheckEmail(body.email);
  if (!emailExists) {
    return res.status(401).send({
      message: "Invalid Email or Password",
      success: false
    });
  }
  const user: any = await FindEmail(body.email);
  const isValidPassword = await bcrypt.compare(body.password, user?.password);
  if (!isValidPassword) {
    return res.status(401).send({
      message: "Invalid Email or Password",
      success: false
    });
  }
  const payload = {
    user_id: user?._id,
    email: user?.email,
    roles: user?.email,
  };

  const token = jwt.sign(payload, config.get<string>("jwtSecretKey"), {
    expiresIn: "30d"
  });
  return res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    token,
  });
};

