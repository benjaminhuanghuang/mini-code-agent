import { useRef, useState } from "react";
import { useEvent } from "react-use";

import "./App.css";

const vscode = acquireVsCodeApi();

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEvent("message", (event: MessageEvent<string>) => {
    setMessage(event.data);
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
