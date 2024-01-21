import { SignupError, UnauthorizedError } from "../errors/users_error";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();

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
