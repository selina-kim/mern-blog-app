import { useRef, useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useAutosizeTextArea from "../utils/useAutosizeTextArea";
import { BlogpostInput } from "../api/blogposts_api";
import CloseEditorDialog from "../components/CloseEditorDialog";
import * as BlogpostApi from "../api/blogposts_api";
import { Navigate } from "react-router-dom";

export function BlogpostEditorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCloseEditorDialog, setShowCloseEditorDialog] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(titleRef.current, title);
  useAutosizeTextArea(summaryRef.current, summary);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() != "") {
      setIsSubmitting(true);
      onSubmit({
        title: title,
        summary: summary,
        content: content,
        thumbnail: "",
      });
      setIsSubmitting(false);
      setRedirect(true);
    }
  }

  async function onSubmit(input: BlogpostInput) {
    try {
      const blogpostResponse = await BlogpostApi.createBlogpost(input);
      // blogpostResponse;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="mx-10 mb-auto mt-10 grid h-full grid-cols-1 gap-y-6">
      <div className="right-0 flex flex-row justify-between">
        <button
          type="button"
          form="blogpost"
          className="w-20 rounded-md border border-black p-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          onClick={() => setShowCloseEditorDialog(true)}
        >
          Close
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          form="blogpost"
          className="w-20 rounded-md bg-violet-500 p-2 text-sm font-medium text-white hover:bg-violet-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        >
          Publish
        </button>
      </div>
      <form id="blogpost" onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-semibold" htmlFor="blogpost-title">
          Title<span className="text-red-500">*</span>
        </label>
        <textarea
          required
          ref={titleRef}
          id="blogpost-title"
          className="w-full resize-none rounded border border-gray-300 px-2 py-1 text-lg placeholder:italic"
          rows={1}
          value={title}
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target?.value)
          }
        />
        <label
          className="block text-sm font-semibold"
          htmlFor="blogpost-summary"
        >
          Summary
        </label>
        <textarea
          ref={summaryRef}
          id="blogpost-summary"
          className="w-full resize-none rounded border border-gray-300 px-2 py-1 text-sm placeholder:italic"
          rows={1}
          value={summary}
          placeholder="Summary"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSummary(e.target?.value)
          }
        />
        <p className="block text-sm font-semibold">Content</p>
        <MDEditor
          data-color-mode="light"
          value={content}
          preview="edit"
          onChange={(value) => {
            setContent(value as string);
          }}
        />
      </form>
      <div className="mt-4">
        <p className="mb-1 border-b-[1px] border-gray-300 text-sm font-semibold">
          Preview
        </p>
        <div className="prose prose-sm prose-my-colors prose-h5:font-medium prose-li:my-0">
          <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {content}
          </Markdown>
        </div>
      </div>

      {showCloseEditorDialog && (
        <CloseEditorDialog onDismiss={() => setShowCloseEditorDialog(false)} />
      )}
    </div>
  );
}
