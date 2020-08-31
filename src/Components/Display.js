import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  width: 330px;
  background-color: #111;
  height: 150px;
`;

const Happening = styled.p`
  font-size: 30px;
  margin: 3px;
  padding: 0;
  color: green;
  text-align: center;
`;

const Timer = styled.p`
  font-size: 60px;
  color: green;
  margin: 0;
  text-align: center;
`;

export const Display = (props) => {
  return (
    <Screen>
      <Happening id="timer-label">{props.happening}</Happening>
      <Timer id="time-left">{props.timeLeft}</Timer>
    </Screen>
  );
};
