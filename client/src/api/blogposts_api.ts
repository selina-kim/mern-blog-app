import { BlogpostCard } from "../models/blogpostCard";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchBlogposts(): Promise<BlogpostCard[]> {
  const response = await fetchData("/api/blogposts", {
    method: "GET",
  });
  return response.json();
}

export interface BlogpostInput {
  title: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
}

export async function createBlogpost(blogpost: BlogpostInput) {
  const response = await fetchData("/api/blogposts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogpost),
  });
  return response.json();
}

export async function deleteBlogpost(blogpostId: string) {
  await fetchData("/api/blogposts/" + blogpostId, { method: "DELETE" });
}
