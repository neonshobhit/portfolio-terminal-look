import React, { useState } from "react";
import "./App.css";
import NewPrompt from "./UI/NewPrompt";
import PromptsHistory from "./UI/PromptHistory";
import * as Response from "./Data/Response";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const prompts = (params.get("prompts") || "")
  const urlCommandsRes = prompts
    .split(",")
    .map(Response.parseCommand)
    .filter((el) => el.action !== "IGNORE");
  const [promptsArray, setPromptsArray] = useState(urlCommandsRes);

  function handleAddPrompt(newPrompt) {
    let splitter = ","
    if (prompts.length === 0) splitter = ""
    navigate(
      `/?prompts=${prompts + splitter + newPrompt.inputValue}`
    );
    setPromptsArray((prevPrompts) => [...prevPrompts, newPrompt]);
  }
  let text = `
  ██████  ██░ ██  ▒█████   ▄▄▄▄    ██░ ██  ██▓▄▄▄█████▓
▒██    ▒ ▓██░ ██▒▒██▒  ██▒▓█████▄ ▓██░ ██▒▓██▒▓  ██▒ ▓▒
░ ▓██▄   ▒██▀▀██░▒██░  ██▒▒██▒ ▄██▒██▀▀██░▒██▒▒ ▓██░ ▒░
  ▒   ██▒░▓█ ░██ ▒██   ██░▒██░█▀  ░▓█ ░██ ░██░░ ▓██▓ ░ 
▒██████▒▒░▓█▒░██▓░ ████▓▒░░▓█  ▀█▓░▓█▒░██▓░██░  ▒██▒ ░ 
▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒░ ▒░▒░▒░ ░▒▓███▀▒ ▒ ░░▒░▒░▓    ▒ ░░   
░ ░▒  ░ ░ ▒ ░▒░ ░  ░ ▒ ▒░ ▒░▒   ░  ▒ ░▒░ ░ ▒ ░    ░    
░  ░  ░   ░  ░░ ░░ ░ ░ ▒   ░    ░  ░  ░░ ░ ▒ ░  ░      
      ░   ░  ░  ░    ░ ░   ░       ░  ░  ░ ░           
                                ░                      
  ` 
  return (
    <div className="App">
      <div style={{"margin-left":"0.8vw"}}>
        <pre>
        {text}


        </pre>
      </div>
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
