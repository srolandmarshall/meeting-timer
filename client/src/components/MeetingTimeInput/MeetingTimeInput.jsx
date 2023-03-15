import React from "react";

const MeetingTimeInput = (props) => {
  const handleMeetingTimeChange = (event) => {
    const time = event.target.value;
    props.setMeetingTime(time);
  };

  return (
    <div className="MeetingTimeInput">
      <label htmlFor="meeting-time">Meeting Time</label>
      <input
        id="meeting-time"
        name="meeting-time"
        type="number"
        value={props.meetingTime}
        onChange={handleMeetingTimeChange}
      />
    </div>
  );
};

export default MeetingTimeInput;
