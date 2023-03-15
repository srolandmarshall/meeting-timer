import React from "react";
import ReactMarkdown from "react-markdown";

const AgendaPreview = ({ agenda, meetingTime }) => {
  return (
    <div>
      <h2>{meetingTime}</h2>
      <ReactMarkdown>{agenda}</ReactMarkdown>
    </div>
  );
};

export default AgendaPreview;
