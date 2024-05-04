import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SignupError, UnauthorizedError } from "../errors/users_error";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://mern-blog-app-server-mocha.vercel.app";

export async function fetchData(input: string, init?: AxiosRequestConfig) {
  const response: AxiosResponse = await axios(input, init);

  if (response.status == 200 || response.status == 201) {
    return response.data;
  } else {
    const errorBody = await response.data;

    if (errorBody.errors) {
      const errorFields = errorBody.errors;
      throw new SignupError(errorFields);
    } else {
      const errorMessage = errorBody.error;

      if (response.status === 401) {
        throw new UnauthorizedError(errorMessage);
      } else {
        throw Error(
          "Request failed with status: " +
            response.status +
            " message: " +
            errorMessage,
        );
      }
    }
  }
}
