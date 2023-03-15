import React, { useState } from "react";
import "./MeetingForm.css";

function MeetingForm(props) {
  const [agendaText, setAgendaText] = useState("");

  const handleAgendaChange = (event) => {
    const text = event.target.value;
    setAgendaText(text);
    props.setAgenda(text);
  };

  return (
    <div className="MeetingForm">
      <label htmlFor="agenda-text">Agenda Maker</label>
      <textarea
        id="agenda-text"
        name="agenda-text"
        value={agendaText}
        onChange={handleAgendaChange}
      />
    </div>
  );
}

export default MeetingForm;
