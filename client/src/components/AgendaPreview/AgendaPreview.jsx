import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const AgendaPreview = ({ agenda, meetingTime }) => {
  const [agendaWithTime, setAgendaWithTime] = useState("");

  useEffect(() => {
    if (agenda.trim() === "") {
      setAgendaWithTime("");
      return;
    }

    const splitAgenda = agenda.split(/[\n\r]/);
    const numH2s = splitAgenda.filter((line) => line.startsWith("##")).length;
    const h2TimeSeconds = Math.round((meetingTime * 60) / numH2s);

    let agendaWithDuration = "";

    splitAgenda.forEach((line) => {
      if (line.startsWith("##")) {
        agendaWithDuration += `${line} (${convertSecondsToTime(
          h2TimeSeconds
        )})\n`;
      } else {
        agendaWithDuration += `${line}\n`;
      }
    });

    setAgendaWithTime(agendaWithDuration);
  }, [agenda, meetingTime]);

  // Function to convert seconds to time notation (MM:SS)
  const convertSecondsToTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h3>Agenda Preview</h3>
      <ReactMarkdown>{agendaWithTime}</ReactMarkdown>
    </div>
  );
};

export default AgendaPreview;
