import React from "react";

function MeetingTimeInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="meetingTime">Meeting Time: </label>
      <input
        type="number"
        id="meetingTime"
        name="meetingTime"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default MeetingTimeInput;
