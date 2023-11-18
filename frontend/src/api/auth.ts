import axios from "axios";
import { baseUrl } from "./variables";

export interface ILogin {
  email: string;
  password: string;
}

export async function LoginUser(body: ILogin): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const res = await axios.post(baseUrl + "/users/login", body);
    localStorage.setItem("token", res.data.token)
    return { success: res.data.success, message: res.data.message };
  } catch (err: any) {
    return {
      success: err.response.data.success,
      message: err.response.data.message,
    };
  }
}

export async function SignupUser(body: ILogin): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const res = await axios.post(baseUrl + "/users/signup", body);
    return { success: res.data.success, message: res.data.message };
  } catch (err: any) {
    return {
      success: err.response.data.success,
      message: err.response.data.message,
    };
  }
}
