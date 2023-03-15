import React from "react";
import "./MeetingForm.css";

function MeetingForm(props) {
  const handleAgendaChange = (event) => {
    const text = event.target.value;
    props.setAgenda(text);
  };

  return (
    <div className="MeetingForm">
      <label htmlFor="agenda-text">Agenda Maker</label>
      <textarea
        id="agenda-text"
        name="agenda-text"
        value={props.agenda}
        onChange={handleAgendaChange}
      />
    </div>
  );
}

export default MeetingForm;
