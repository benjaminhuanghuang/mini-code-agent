import { useRef, useState } from "react";
import { useEvent } from "react-use";
import { MarkdownHooks } from "react-markdown";

import "./App.css";

const vscode = acquireVsCodeApi();

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEvent("message", (event: MessageEvent<string>) => {
    setMessage((prev) => prev + event.data);
  });

  const postMessage = () => {
    vscode.postMessage(input.current?.value);
  };

  return (
    <>
      <p>{message}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <input type="text" ref={input} />
        <button onClick={postMessage}>Post Message</button>
      </div>
      <MarkdownHooks>{message}</MarkdownHooks>
    </>
  );
}

export default App;
