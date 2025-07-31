import { useState } from "react";
import { useEvent } from "react-use";

import "./App.css";

const vscode = acquireVsCodeApi();

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEvent("message", (event: MessageEvent<string>) => {
    setMessage(event.data);
  });

  const postMessage = () => {
    vscode.postMessage("postMessage from React App");
  };

  return (
    <>
      <p>{message}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={postMessage}>Post Message to VS Code</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
