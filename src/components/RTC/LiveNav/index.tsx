import React, { useState, useEffect, useRef, useCallback } from "react";
import { Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { updateCourse, ClassState } from "../../../redux/live/liveReducer";
import LiveSettings from "./components/LiveSettings";
import Icon from "../../Icon";
import { getHMSString } from "../../../modules/utils";
import { NetworkQualityEvaluation } from "../utils/helpers";
import "./styles.scss";
import { AppDispatch, RootState } from "../../../redux/store";
import { client, useAgoraLiveState } from "../context";

const LiveNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(false);
  const [time, updateTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [rtt, updateRtt] = useState(0);
  const [quality, updateQuality] = useState("unknown");
  const { state: { showSettings }, actions: { joinChannel, setSettings } } = useAgoraLiveState();

  const course = useSelector((state: RootState) => state.Live.course);
  const courseState = course.courseState;
  // TODO:Get role here
  const role = 1;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (timerActive) {
      interval = setInterval(() => {
        const { RTT, Duration } = client.getRTCStats();
        updateRtt(RTT);
        !ref.current && updateTime(Duration);
      }, 1000);
    } else if (!timerActive && time !== 0) {
      interval && clearInterval(interval);
    }
    return () => {
      if (timerActive) {
        interval && clearInterval(interval);
        setTimerActive(false);
      }
    };
  }, [time, timerActive]);

  useEffect(() => {
    client.on("network-quality", (stats) => {
      const quality = NetworkQualityEvaluation(stats);
      !ref.current && updateQuality(quality);
    });
    return () => {
      client.off("network-quality", () => { });
    };
  }, []);

  useEffect(() => {
    if (courseState === ClassState.STARTED && !timerActive) {
      setTimerActive(true);
    }
    if (timerActive && courseState === ClassState.CLOSED) {
      setTimerActive(false);;
    }
  }, [courseState, timerActive]);

  const lock = useRef(false);

  useEffect(() => {
    return () => {
      lock.current = true;
    };
  }, []);

  const updateClassState = useCallback(async () => {
    if (!lock.current) {
      lock.current = true;
      joinChannel && await joinChannel();
      dispatch(updateCourse({ courseState: (courseState + 1) > 1 ? 0 : 1, }))
      lock.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseState, dispatch]);

  const handleClick = useCallback((type) => {
    if (type === "setting") {
      setSettings && setSettings(true);
    } else if (type === "exit") {
      console.log("R u sure to exit the room");
    } else if (type === "classState") {
      updateClassState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateClassState]);

  const handleCardConfirm = useCallback((type) => {
    switch (type) {
      case "setting":
        setSettings && setSettings(false);
        return;
      case "exitRoom":
        console.log("R u sure to exit room");
        return;
      default:
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav className="justify-content-between live-nav-container">
        <Nav.Item className="network-state d-flex flex-row">
          <div className="mx-2">
            Delay: <span className="field-val">{`${rtt}ms`}</span>
          </div>
          <div className="mx-2">
            Network: <span className="field-val">{`${quality}`}</span>
          </div>
        </Nav.Item>
        <Nav.Item className="class-title d-flex flex-row">
          <div className="mx-2">{"Course Name"}</div>
          {role === 1 ? (
            <Button
              size="sm"
              variant={courseState ? "danger" : "success"}
              className="mx-2"
              onClick={() => handleClick("classState")}
            >
              {courseState ? "STOP" : "START"}
            </Button>
          ) : null}
        </Nav.Item>
        <Nav.Item className="menu d-flex flex-row">
          <div className="mx-2">
            <Icon iconStyle="solid" icon="clock" />
            <span className="ml-2 time">{getHMSString(time * 1000)}</span>
          </div>
          <Button variant="link" onClick={() => handleClick("setting")}>
            <Icon iconStyle="solid" icon="cog" />
          </Button>
        </Nav.Item>
      </Nav>
      {showSettings ? (
        <LiveSettings />
      ) : null}
    </>
  );
};

export default LiveNav;
