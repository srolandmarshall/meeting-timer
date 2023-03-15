import { useState } from "react";
import "./App.css";
import AgendaPreview from "./components/AgendaPreview/AgendaPreview";
import MeetingForm from "./components/MeetingForm/MeetingForm";
import MeetingTimeInput from "./components/MeetingTimeInput/MeetingTimeInput";
import TimerToggle from "./components/TimerToggle/TimerToggle";

function App() {
  const [agenda, setAgenda] = useState("");
  const [meetingTime, setMeetingTime] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleToggleTimer = () => {
    setTimerRunning((prevState) => !prevState);
  };

  return (
    <div className="App">
      <MeetingTimeInput
        meetingTime={meetingTime}
        setMeetingTime={setMeetingTime}
      />
      <MeetingForm setAgenda={setAgenda} />
      <TimerToggle
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        handleToggleTimer={handleToggleTimer}
      />
      <hr />
      <AgendaPreview meetingTime={meetingTime} agenda={agenda} />
    </div>
  );
}

export default App;
