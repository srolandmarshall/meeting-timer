import { useState } from "react";
import "./App.css";
import AgendaPreview from "./components/AgendaPreview/AgendaPreview";
import MeetingForm from "./components/MeetingForm/MeetingForm";
import MeetingTimeInput from "./components/MeetingTimeInput/MeetingTimeInput";

function App() {
  const [agenda, setAgenda] = useState("");
  const [meetingTime, setMeetingTime] = useState(60);

  return (
    <div className="App">
      <MeetingTimeInput
        value={meetingTime}
        onChange={(event) => setMeetingTime(event.target.value)}
      />
      <MeetingForm setAgenda={setAgenda} />
      <AgendaPreview agenda={agenda} />
    </div>
  );
}

export default App;
