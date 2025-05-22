import React from 'react';

function SummaryButton({ summarizeTodos }) {
  return <button onClick={summarizeTodos}>Summarize and Send to Slack</button>;
}

export default SummaryButton;
