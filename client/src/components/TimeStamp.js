import React from "react";

const TimeStamp = ({ time }) => (
  <time dateTime={new Date(time)}>
    {new Date(time).toLocaleString("en-US")}
  </time>
);

export default TimeStamp;
