import React, { useState, useRef, useEffect } from "react";
import UserLog from "./UserLog";
import * as Response from "../Data/Response";
import "../Styles/NewPrompt.css"
function NewPrompt({ onAddPrompt, promptHistory, updateHistory }) {
  let [inputValue, setInputValue] = useState("");
  const inputref = useRef(null)
  function submitForm(e) {
    e.preventDefault();
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

  useEffect(() => {
    inputref.current?.scrollIntoView({ behavior: "smooth" })
  }, [promptHistory])

  return (
    <form className="prompt-form" onSubmit={submitForm}>
        <UserLog />
        <input ref={inputref}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          placeholder="help"
        />
    </form>
  );
}

export default NewPrompt;
