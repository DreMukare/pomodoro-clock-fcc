import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Header } from "../Components/Header";
import { Session } from "./Session";
import { Break } from "./Break";
import { Controllers } from "./Controllers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Components/Button";

const Left = styled.div`
  padding: 5px;
`;
const Right = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Main = styled.div`
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 700px;
`;

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

export const Pomodoro = (props) => {
  const [breakLength, setBreakLength] = useState(() => 5);
  const [seshLength, setSeshLength] = useState(() => 25);
  const [timerState, setTimerState] = useState("not-running");
  const [displayTitle, setDisplayTitle] = useState("Session");
  const [secondsLeft, setSecondsLeft] = useState(() => 25 * 60);
  const [clickTimes, setClickTimes] = useState(() => 0);
  const guitar = useRef();

  const handleSeshInc = () => {
    if (seshLength < 60 && timerState === "not-running") {
      setSeshLength(seshLength + 1);
      setSecondsLeft((seshLength + 1) * 60);
    }
  };

  const handleSeshDec = () => {
    if (seshLength > 1 && timerState === "not-running") {
      setSeshLength(seshLength - 1);
      setSecondsLeft((seshLength - 1) * 60);
    }
  };

  const handleBreakInc = () => {
    if (breakLength < 60 && timerState === "not-running") {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDec = () => {
    if (breakLength > 1 && timerState === "not-running") {
      setBreakLength(breakLength - 1);
    }
  };

  let mins = Math.floor(secondsLeft / 60);
  let secs = secondsLeft % 60;

  useEffect(() => {
    const switchDisplayTitleAndState = () => {
      if (displayTitle === "Session") {
        setDisplayTitle("Break");
        setSecondsLeft(breakLength * 60);
      } else if (displayTitle === "Break") {
        setDisplayTitle("Session");
        setSecondsLeft(seshLength * 60);
      }
    };

    let countDown = null;
    if (timerState === "running" && secondsLeft > 0) {
      countDown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (timerState === "running" && secondsLeft === 0) {
      countDown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      guitar.current.play();
      switchDisplayTitleAndState();
    } else {
      clearInterval(countDown);
    }
    return () => clearInterval(countDown);
  }, [timerState, breakLength, seshLength, secondsLeft, displayTitle]);

  const reset = () => {
    setBreakLength(() => 5);
    setSeshLength(() => 25);
    setTimerState("not-running");
    setDisplayTitle("Session");
    setSecondsLeft(() => 25 * 60);
    setClickTimes(0);
    guitar.current.pause();
    guitar.current.currentTime = 0;
  };

  const start = () => {
    if (timerState === "not-running") {
      setTimerState("running");
      setClickTimes(clickTimes + 1);
      setInterval(() => {}, 1000);
    }
  };

  const pause = () => {
    if (timerState === "running") {
      setTimerState("not-running");
      setClickTimes(clickTimes + 1);
    }
  };

  return (
    <div>
      <Header>The Pomodoro Technique Works</Header>
      <Main>
        <Left>
          <Break>
            <Button id="break-increment" onClick={handleBreakInc}>
              <FontAwesomeIcon icon={faLevelUpAlt} />
            </Button>
            <p id="break-length">{breakLength}</p>
            <Button id="break-decrement" onClick={handleBreakDec}>
              <FontAwesomeIcon icon={faLevelDownAlt} />
            </Button>
          </Break>
          <Session>
            <Button id="session-increment" onClick={handleSeshInc}>
              <FontAwesomeIcon icon={faLevelUpAlt} />
            </Button>
            <p id="session-length">{seshLength}</p>
            <Button id="session-decrement" onClick={handleSeshDec}>
              <FontAwesomeIcon icon={faLevelDownAlt} />
            </Button>
          </Session>
        </Left>
        <Right>
          <Screen>
            <Happening id="timer-label">{displayTitle}</Happening>
            <Timer id="time-left">
              {mins < 10 ? ("0" + mins).slice(-2) : mins}:
              {secs < 10 ? ("0" + secs).slice(-2) : secs}
            </Timer>
          </Screen>
          <Controllers>
            <Button
              id="start_stop"
              onClick={timerState === "not-running" ? start : pause}
            >
              <FontAwesomeIcon icon={faPlayCircle} />
              <FontAwesomeIcon icon={faPauseCircle} />
            </Button>
            <Button id="reset" onClick={reset}>
              <FontAwesomeIcon icon={faSpinner} />
            </Button>
          </Controllers>
        </Right>
      </Main>
      <audio
        id="beep"
        preload="auto"
        ref={guitar}
        src="https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/GUITAR%20LOOPS/537[kb]077_echo-bright-guitar-melody.aif.mp3"
      />
    </div>
  );
};
