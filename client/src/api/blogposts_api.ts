import { Blogpost } from "../models/blogpost";
import { BlogpostCard } from "../models/blogpostCard";
import { fetchData } from "./fetch_api";

export async function fetchBlogposts(
  username: string,
): Promise<BlogpostCard[]> {
  const response = await fetchData("/api/blog/" + username, {
    method: "GET",
  });
  return response.json();
}

export async function fetchBlogpost(blogpostId: string): Promise<Blogpost> {
  const response = await fetchData("/api/blog/blogpost/" + blogpostId, {
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

export async function createBlogpost(
  blogpost: BlogpostInput,
): Promise<Blogpost> {
  const response = await fetchData("/api/blog/blogpost/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogpost),
  });
  return response.json();
}

export async function updateBlogpost(
  blogpostId: string,
  blogpost: BlogpostInput,
): Promise<Blogpost> {
  const response = await fetchData("/api/blog/blogpost/" + blogpostId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogpost),
  });
  return response.json();
}

export async function deleteBlogpost(blogpostId: string) {
  await fetchData("/api/blog/blogpost/" + blogpostId, { method: "DELETE" });
}
