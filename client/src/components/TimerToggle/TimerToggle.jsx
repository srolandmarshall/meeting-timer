import React from "react";

const TimerToggle = (props) => {
  return (
    <button onClick={props.handleToggleTimer}>
      {props.timerRunning ? "Stop Timer" : "Start Timer"}
    </button>
  );
};

export default TimerToggle;
