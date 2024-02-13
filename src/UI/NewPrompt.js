import React, { useState } from "react";
import UserLog from "./UserLog";
import * as Response from "../Data/Response";
import "../Styles/NewPrompt.css"
function NewPrompt({ onAddPrompt, promptHistory, updateHistory }) {
  let [inputValue, setInputValue] = useState("");

  function submitForm(e) {
    e.preventDefault();
    inputValue = inputValue.toLowerCase()
    if (inputValue==="") {
      onAddPrompt({
        inputValue,
        answer: "",
        action: "",
      });
    }
    const res = Response.parseCommand(inputValue);
    setInputValue("")
    // Yet not supported 0 arg options
    if (res.action === "CLEAR") {
      updateHistory([]);
    } else if (res.action === "IGNORE") {
    } else {
      onAddPrompt({
        inputValue,
        answer: res.answer,
        action: res.action,
      });
    }
  }

  return (
    <form className="prompt-form" onSubmit={submitForm}>
        <UserLog />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
    </form>
  );
}

export default NewPrompt;
