import { useState } from "react";
import "./App.css";
import AgendaPreview from "./components/AgendaPreview/AgendaPreview";
import MeetingForm from "./components/MeetingForm/MeetingForm";
import MeetingTimeInput from "./components/MeetingTimeInput/MeetingTimeInput";

function App() {
  const [agenda, setAgenda] = useState("");
  const [meetingTime, setMeetingTime] = useState(60);
  /* get the meetingtime value from MeetingTimeInput and pass it to AgendaPreview */

  return (
    <div className="App">
      <MeetingTimeInput
        meetingTime={meetingTime}
        setMeetingTime={setMeetingTime}
      />
      <MeetingForm setAgenda={setAgenda} />
      <AgendaPreview meetingTime={meetingTime} agenda={agenda} />
    </div>
  );
}

export default App;
