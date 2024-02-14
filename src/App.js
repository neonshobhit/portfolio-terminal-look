
import React, { useState } from "react";
import "./App.css";
import NewPrompt from "./UI/NewPrompt";
import PromptsHistory from "./UI/PromptHistory";
import * as Response from "./Data/Response";

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlCommandsRes = (params.get("prompts") || "")
    .split(",")
    .map(Response.parseCommand)
    .filter((el) => el.action !== "IGNORE");
  const [promptsArray, setPromptsArray] = useState(urlCommandsRes);

  function handleAddPrompt(newPrompt) {
    setPromptsArray((prevPrompts) => [...prevPrompts, newPrompt]);
  }
  console.log(promptsArray);
  return (
    <div className="App">
      <div className="prompt">
        <PromptsHistory prompts={promptsArray} />
      </div>
      <div className="prompt">
        <NewPrompt
          onAddPrompt={handleAddPrompt}
          promptHistory={promptsArray}
          updateHistory={setPromptsArray}
        />

      </div>
    </div>
  );
}

export default App;
