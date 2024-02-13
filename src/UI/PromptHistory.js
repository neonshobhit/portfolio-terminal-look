import UserLog from "./UserLog";
import PromptAnswer from "./PromptAnswer";
import "../Styles/NewPrompt.css";

function PromptsHistory({ prompts }) {
  return (
    <div>
      {prompts.map((prompt, index) => {
        return (
          <div key={index}>
            <div className="prompt-form">
              <UserLog />
              <p className="prompt-form">{prompt.inputValue}</p>
            </div>
            <PromptAnswer answer={prompt.answer} />
          </div>
        );
      })}
    </div>
  );
}
export default PromptsHistory;
