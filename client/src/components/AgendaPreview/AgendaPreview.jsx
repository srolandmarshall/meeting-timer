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
    let numH2s = splitAgenda.filter((line) => line.startsWith("##")).length;

    const meetingDuration = parseInt(meetingTime);
    let durationLeft = meetingDuration;
    let agendaWithDuration = "";
    let currentH2Duration = 0;

    splitAgenda.forEach((line) => {
      if (line.startsWith("##")) {
        currentH2Duration = Math.min(
          meetingDuration,
          Math.ceil(durationLeft / numH2s)
        );
        durationLeft -= currentH2Duration;
        numH2s--;

        const minutes = Math.floor(currentH2Duration / 60);
        const seconds = currentH2Duration % 60;
        const timeStr = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;

        agendaWithDuration += `${line} (${timeStr})\n`;
      } else {
        agendaWithDuration += `${line}\n`;
      }
    });

    setAgendaWithTime(agendaWithDuration);
  }, [agenda, meetingTime]);

  return (
    <div>
      <h3>Agenda Preview</h3>
      <ReactMarkdown>{agendaWithTime}</ReactMarkdown>
    </div>
  );
};

export default AgendaPreview;
