import React from "react";

const TimerToggle = (props) => {
  return (
    <button onClick={props.handleToggleTimer}>
      {props.timerRunning ? "Pause Timer" : "Start Timer"}
    </button>
  );
};

export default TimerToggle;
