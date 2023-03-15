import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const AgendaPreview = ({ agenda, meetingTime, timerRunning }) => {
  const [agendaWithTime, setAgendaWithTime] = useState("");
  const [h2Timers, setH2Timers] = useState([]);
  const [currentH2Index, setCurrentH2Index] = useState(0);

  useEffect(() => {
    if (agenda.trim() === "") {
      setAgendaWithTime("");
      return;
    }

    const splitAgenda = agenda.split(/[\n\r]/);
    const numH2s = splitAgenda.filter((line) => line.startsWith("## ")).length;
    const h2TimeSeconds = Math.round((meetingTime * 60) / numH2s);
    console.log(
      `numH2s: ${numH2s}, meetingTime: ${meetingTime}, h2TimeSeconds: ${h2TimeSeconds}`
    );

    const h2Timers = Array.from({ length: numH2s }, () => h2TimeSeconds);

    setH2Timers(h2Timers);
  }, [agenda, meetingTime]);

  useEffect(() => {
    if (!timerRunning) {
      return;
    }

    const timer = setInterval(() => {
      setH2Timers((timers) => {
        // Find the next non-zero timer, starting from the current index
        let index = currentH2Index;
        while (timers[index] === 0 && index < timers.length - 1) {
          index++;
        }
        const updatedTimers = [...timers];
        updatedTimers[index] = timers[index] - 1;
        setCurrentH2Index(index);
        return updatedTimers;
      });
    }, 1000);

    // Clear the interval when the component unmounts or the timer is stopped
    return () => clearInterval(timer);
  }, [timerRunning, currentH2Index]);

  useEffect(() => {
    if (agenda.trim() === "") {
      setAgendaWithTime("");
      return;
    }

    const splitAgenda = agenda.split(/[\n\r]/);
    let agendaWithDuration = "";
    let h2Index = 0;

    splitAgenda.forEach((line, index) => {
      if (line.startsWith("## ")) {
        const timeRemaining = h2Timers[h2Index];
        h2Index += 1;
        agendaWithDuration += `${line} (${convertSecondsToTime(
          timeRemaining
        )})\n`;
      } else {
        agendaWithDuration += `${line}\n`;
      }
    });

    setAgendaWithTime(agendaWithDuration);
  }, [agenda, h2Timers]);

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
      <p>{JSON.stringify(h2Timers)}</p>
    </div>
  );
};

export default AgendaPreview;
