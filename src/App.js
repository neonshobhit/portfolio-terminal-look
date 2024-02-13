
import React, { useState } from "react";
import "./App.css";
import NewPrompt from "./UI/NewPrompt";
import PromptsHistory from "./UI/PromptHistory";
import * as Response from "./Data/Response";
// function UserLog() {
//   return (
//     <div>
//       <h5>guest@shobhit-portfolio:~$</h5>
//     </div>
//   );
// }
// function PromptAnswer({answer}) {
//   return <div>{answer}</div>;
// }

// function PromptsHistory({ prompts }) {
//   return (
//     <div>
//       {prompts.map((prompt, index) => {
//         return (
//           <div key={index}>
//             <UserLog />
//             <h5>{prompt.inputValue}</h5>
//             <PromptAnswer answer={prompt.answer}/>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function NewPrompt({ onAddPrompt }) {
//   const [inputValue, setInputValue] = useState("");

//   function submitForm(e) {
//     e.preventDefault();
//     setInputValue("");
//     onAddPrompt({
//       inputValue,
//       answer: "answer"
//     });
//   }

//   return (
//     <form onSubmit={submitForm}>
//       <span>
//         <UserLog />
//         <input
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//       </span>
//     </form>
//   );
// }

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
      {/* <header className="App-header"> */}
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
      {/* </header> */}
    </div>
  );
}

export default App;
