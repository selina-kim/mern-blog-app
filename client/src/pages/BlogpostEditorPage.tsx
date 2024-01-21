import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useAutosizeTextArea from "../utils/useAutosizeTextArea";
import EditorCloseDialog from "../components/EditorCloseDialog";
import * as BlogpostApi from "../api/blogposts_api";
import { Navigate, useParams } from "react-router-dom";
import { Blogpost } from "../models/blogpost";
import * as BlogpostsApi from "../api/blogposts_api";
import EditorPublishDialog from "../components/EditorPublishDialog";
import EditorTitleEmptyDialog from "../components/EditorTitleEmptyDialog";
import { User } from "../models/user";

interface BlogpostEditorPageProps {
  loggedInUser: User | null;
}

export function BlogpostEditorPage({ loggedInUser }: BlogpostEditorPageProps) {
  const [blogpostId, setBlogpostId] = useState("");
  const { origBlogpostId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEditorCloseDialog, setShowEditorCloseDialog] = useState(false);
  const [showEditorPublishDialog, setShowEditorPublishDialog] = useState(false);
  const [showEditorTitleEmptyDialog, setShowEditorTitleEmptyDialog] =
    useState(false);
  const [redirectBlogpost, setRedirectBlogpost] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (origBlogpostId) {
      async function loadBlogpost() {
        try {
          const origBlogpost = await BlogpostsApi.fetchBlogpost(
            origBlogpostId!,
          );
          setTitle(origBlogpost.title);
          origBlogpost.summary ? setSummary(origBlogpost.summary) : "";
          origBlogpost.content ? setContent(origBlogpost.content) : "";
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
      loadBlogpost();
    }
  }, []);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(titleRef.current, title);
  useAutosizeTextArea(summaryRef.current, summary);

  function checkSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() == "") {
      setShowEditorTitleEmptyDialog(true);
    } else setShowEditorPublishDialog(true);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      let blogpostResponse: Blogpost;
      if (origBlogpostId) {
        blogpostResponse = await BlogpostApi.updateBlogpost(origBlogpostId, {
          title: title,
          summary: summary,
          content: content,
          thumbnail: "",
        });
      } else {
        blogpostResponse = await BlogpostApi.createBlogpost({
          title: title,
          summary: summary,
          content: content,
          thumbnail: "",
        });
      }
      setBlogpostId(blogpostResponse._id);
      setRedirectBlogpost(true);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    setIsSubmitting(false);
  }

  function redirectBack() {
    if (!origBlogpostId) setRedirectHome(true);
    else {
      setBlogpostId(origBlogpostId);
      setRedirectBlogpost(true);
    }
  }

  if (redirectHome) return <Navigate to="/" />;
  if (redirectBlogpost) return <Navigate to={`/blogpost/${blogpostId}`} />;

  return (
    <div className="grid grid-cols-1 gap-y-6 px-8 py-8">
      <div className="right-0 flex flex-row justify-between">
        <button
          type="button"
          form="blogpost"
          className="w-20 rounded-md border border-black p-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          onClick={() => setShowEditorCloseDialog(true)}
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
      <form id="blogpost" onSubmit={checkSubmit} noValidate>
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

      {showEditorCloseDialog && (
        <EditorCloseDialog
          onDismiss={() => setShowEditorCloseDialog(false)}
          onConfirm={redirectBack}
        />
      )}
      {showEditorPublishDialog && (
        <EditorPublishDialog
          onDismiss={() => setShowEditorPublishDialog(false)}
          onConfirm={handleSubmit}
        />
      )}
      {showEditorTitleEmptyDialog && (
        <EditorTitleEmptyDialog
          onDismiss={() => setShowEditorTitleEmptyDialog(false)}
        />
      )}
    </div>
  );
}
