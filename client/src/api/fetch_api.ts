import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SignupError, UnauthorizedError } from "../errors/users_error";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://mern-blog-app-server-mocha.vercel.app";

export async function fetchData(input: string, init?: AxiosRequestConfig) {
  try {
    const response: AxiosResponse = await axios(input, init);
    return response.data;
  } catch (error: any) {
    const errorBody = await error.response.data;
    if (errorBody.errors) {
      const errorFields = errorBody.errors;
      throw new SignupError(errorFields);
    } else {
      const errorMessage = errorBody.error;
      if (error.response.status === 401) {
        throw new UnauthorizedError(errorMessage);
      } else {
        throw Error(
          "Request failed with status: " +
            error.response.status +
            " message: " +
            errorMessage,
        );
      }
    }
  }
}
