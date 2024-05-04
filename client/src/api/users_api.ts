import { User } from "../models/user";
import { fetchData } from "./fetch_api";

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", {
    method: "GET",
    withCredentials: true,
  });
  return response;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signup(credentials: SignupCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(credentials),
  });
  return response;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(credentials),
  });
  return response;
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}
