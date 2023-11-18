import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const { TokenExpiredError } = jwt;
const catchTokenExpiredError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized ! Access Token was Expired" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any =
    req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provides!",
      success: false,
    });
  }
  try {
    const decoded: any = jwt.verify(token, config.get<string>("jwtSecretKey"));
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    catchTokenExpiredError(err, res);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const roles: any = req.roles;
  if (!roles) {
    return res.status(403).send({
      message: "No roles!",
      success: false,
    });
  }
  for (const el of roles) {
    if (el === "ADMIN") {
      next();
    }
  }
  return res.status(401).send({
    message: "Unauthorized",
    success: false,
  });
};
