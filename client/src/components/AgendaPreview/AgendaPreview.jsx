import React from "react";
import ReactMarkdown from "react-markdown";

const AgendaPreview = ({ agenda }) => {
  return (
    <div>
      <ReactMarkdown>{agenda}</ReactMarkdown>
    </div>
  );
};

export default AgendaPreview;
