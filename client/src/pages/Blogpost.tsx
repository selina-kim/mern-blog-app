import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Blogpost() {
  const markdownTest = `### Markdown Cheat Sheet

  Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!
  This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax) and [extended syntax](https://www.markdownguide.org/extended-syntax).
  
  #### Basic Syntax
  
  These are the elements outlined in John Gruber's original design document. All Markdown applications support these elements.
  
  ### Heading
  
  ### H3
  #### H4
  ##### H5
  ###### H6
  
  ### Bold
  
  **bold text**
  
  ### Italic
  
  *italicized text*
  
  ### Blockquote
  
  > blockquote
  
  ### Ordered List
  
  1. First item
  2. Second item
  3. Third item
  
  ### Unordered List 
  - First item
  - Second item
  - Third item
  
  ### Code
  
  \` this is code\`
  
  
  ### Horizontal Rule
  
  ---
  
  ### Link
  
  [Markdown Guide](https://www.markdownguide.org)
  
  ### Image
  
  ![alt text](https://www.markdownguide.org/assets/images/tux.png)
  
  ## Extended Syntax
  
  These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.
  
  ### Table
  
  | Syntax | Description |
  | ----------- | ----------- |
  | Header | Title |
  | Paragraph | Text |
  
  ### Fenced Code Block
  
  ~~~json
  {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
  }
  ~~~
  
  ### Footnote
  
  Here's a sentence with a footnote. [^1]
  
  [^1]: This is the footnote.
  
  ### Heading ID
  
  ### My Great Heading {#custom-id}
  
  ### Definition List
  
  term
  : definition
  
  ### Strikethrough
  
  ~~The world is flat.~~
  
  ### Task List
  
  - [ ] Write the press release
  - [ ] Update the website
  - [ ] Contact the media
  
  `;

  return (
    <>
      <div className="mx-16 mb-auto mt-10">
        <div className="mb-8 border-b-[1px] py-8">
          <h1 className="mb-6 text-4xl font-bold">TITLE</h1>
          <h2 className="mb-6 text-lg font-semibold italic">Summary</h2>
          <div className="text-sm leading-tight">
            <p className="font-semibold">Username</p>
            <time className="text-gray-400">2024-01-25 15:30</time>
          </div>
        </div>
        <div className="prose prose-sm prose-my-colors prose-h5:font-medium prose-li:my-0">
          <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {markdownTest}
          </Markdown>
        </div>
      </div>
    </>
  );
}
