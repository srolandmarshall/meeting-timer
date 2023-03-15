import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const AgendaPreview = ({ agenda, meetingTime, timerRunning }) => {
  const [agendaWithTime, setAgendaWithTime] = useState("");
  const [h2Timers, setH2Timers] = useState({});
  const [currentH2Index, setCurrentH2Index] = useState(0);

  useEffect(() => {
    if (agenda.trim() === "") {
      setAgendaWithTime("");
      return;
    }

    const splitAgenda = agenda.split(/[\n\r]/);
    const numH2s = splitAgenda.filter((line) => line.startsWith("##")).length;
    const h2TimeSeconds = Math.round((meetingTime * 60) / numH2s);

    let agendaWithDuration = "";
    let h2TimerValues = {};
    let h2Index = 0;

    splitAgenda.forEach((line) => {
      if (line.startsWith("##")) {
        const h2Timer = convertSecondsToTime(h2TimeSeconds);
        agendaWithDuration += `${line} (${h2Timer})\n`;
        h2TimerValues[h2Index] = h2TimeSeconds;
        h2Index++;
      } else {
        agendaWithDuration += `${line}\n`;
      }
    });

    setAgendaWithTime(agendaWithDuration);
    setH2Timers(h2TimerValues);
  }, [agenda, meetingTime]);

  useEffect(() => {
    if (!timerRunning) {
      return;
    }

    const timer = setInterval(() => {
      setH2Timers((timers) => {
        // Find the next non-zero timer, starting from the current index
        let index = currentH2Index;
        while (timers[index] === 0 && index <= Object.keys(timers).length) {
          index++;
        }
        if (index > Object.keys(timers).length) {
          // All timers have reached 0, stop the interval
          clearInterval(timer);
          return timers;
        }
        const updatedTimer = { ...timers };
        updatedTimer[index] = timers[index] - 1;
        setCurrentH2Index(index);
        return updatedTimer;
      });
    }, 1000);

    // Clear the interval when the component unmounts or the timer is stopped
    return () => clearInterval(timer);
  }, [timerRunning, currentH2Index]);

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
