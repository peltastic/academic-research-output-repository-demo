import axios from "axios";
import { privateInstance } from "./variables";

export const CreateUserRepo = async (body: {
  repo_name: string;
  repo_type: "private" | "public";
}): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const res = await privateInstance.post("/repo/create", body);
    return { success: res.data.success, message: res.data.message };
  } catch (err: any) {
    return {
      success: err.response.data.success,
      message: err.response.data.message,
    };
  }
};

export const GetAllUserRepo = async (): Promise<{
  message: string;
  success: boolean;
  data?: any;
}> => {
  try {
    const res = await privateInstance.get("/repo/all");
    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      success: err.response.data.success,
      message: err.response.data.message,
    };
  }
};

export const getRepo = async (
  id: string
): Promise<{
  message: string;
  success: boolean;
  data?: any;
}> => {
  try {
    const res = await privateInstance.get(`/repo/files/${id}`);
    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      success: err.response.data.success,
      message: err.response.data.message,
    };
  }
};
