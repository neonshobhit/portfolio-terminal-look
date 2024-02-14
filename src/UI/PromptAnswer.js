import React from 'react';
import "../Styles/NewPrompt.css"
function PromptAnswer({answer}) {
  return <div className='prompt-answer' dangerouslySetInnerHTML={{ __html: answer }} />
}
export default PromptAnswer;
