
"use client";

import { useEffect, useRef, useState } from "react";
import { Clock3, RotateCcw, Play, Pause } from "lucide-react";
import {
  saveFocusSession,
  getCompletedFocusSessions,
  saveCompletedFocusSessions,
} from "@/lib/storage";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const timerSettings = {
  focus: {
    label: "Focus",
    duration: 10,
    caption: "TIME TO FOCUS",
  },
  shortBreak: {
    label: "Short Break",
    duration: 5 * 60,
    caption: "TAKE A BREATHER",
  },
  longBreak: {
    label: "Long Break",
    duration: 15 * 60,
    caption: "TIME TO RECHARGE",
  },
};

const SESSIONS_BEFORE_LONG_BREAK = 4;

export default function Timer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [seconds, setSeconds] = useState(timerSettings.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [cycleLoaded, setCycleLoaded] = useState(false);

  const completionHandled = useRef(false);

  useEffect(() => {
    setCompletedFocusSessions(getCompletedFocusSessions());
    setCycleLoaded(true);
  }, []);

  useEffect(() => {
    if (cycleLoaded) {
      saveCompletedFocusSessions(completedFocusSessions);
    }
  }, [completedFocusSessions, cycleLoaded]);

  const currentDuration = timerSettings[mode].duration;

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  useEffect(() => {
    if (seconds !== 0 || completionHandled.current) return;

    completionHandled.current = true;
    setIsRunning(false);

    if (mode === "focus") {
      saveFocusSession(currentDuration / 60);

      setCompletedFocusSessions((previous) => {
        const next = previous + 1;

        if (next >= SESSIONS_BEFORE_LONG_BREAK) {
          setMode("longBreak");
          setSeconds(timerSettings.longBreak.duration);
          completionHandled.current = false;
          return 0;
        }

        setMode("shortBreak");
        setSeconds(timerSettings.shortBreak.duration);
        completionHandled.current = false;
        return next;
      });
    } else {
      setMode("focus");
      setSeconds(timerSettings.focus.duration);
      completionHandled.current = false;
    }
  }, [seconds, mode, currentDuration]);

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false);
    completionHandled.current = false;
    setMode(newMode);
    setSeconds(timerSettings[newMode].duration);
  };

  const handleReset = () => {
    setIsRunning(false);
    completionHandled.current = false;
    setSeconds(currentDuration);
  };

  const handleStartPause = () => {
    if (seconds === 0) {
      completionHandled.current = false;
      setSeconds(currentDuration);
    }

    setIsRunning(!isRunning);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const progress =
    ((currentDuration - seconds) / currentDuration) * 100;

  return (
    <section className="timer-card" id="focus">
      <div className="timer-header">
        <div>
          <span className="section-eyebrow">STAY IN THE MOMENT</span>
          <h2>Focus Timer</h2>
        </div>
        <div className="timer-icon">
          <Clock3 size={20} />
        </div>
      </div>

      <div className="timer-modes">
        {(Object.keys(timerSettings) as TimerMode[]).map((timerMode) => (
          <button
            key={timerMode}
            type="button"
            className={`timer-mode ${
              mode === timerMode ? "active" : ""
            }`}
            onClick={() => handleModeChange(timerMode)}
            aria-pressed={mode === timerMode}
          >
            {timerSettings[timerMode].label}
          </button>
        ))}
      </div>

      <div className="timer-display">
        <span className="timer-time">{formatTime(seconds)}</span>
        <span className="timer-caption">
          {timerSettings[mode].caption}
        </span>
      </div>

      <div
        className="timer-progress"
        role="progressbar"
        aria-label="Timer progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="timer-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="timer-session">
        <span>{timerSettings[mode].label} session</span>
        <span>
          {currentDuration % 60 === 0
            ? `${currentDuration / 60} minutes`
            : `${Math.floor(currentDuration / 60)}m ${currentDuration % 60}s`}
        </span>
      </div>

      <p className="timer-cycle">
        Focus sessions: {completedFocusSessions} / {SESSIONS_BEFORE_LONG_BREAK}
      </p>

      <div className="timer-actions">
        <button
          type="button"
          className="timer-start-button"
          onClick={handleStartPause}
        >
          {isRunning ? <Pause size={17} /> : <Play size={17} />}
          <span>
            {isRunning
              ? "Pause"
              : seconds === 0
                ? "Start again"
                : seconds === currentDuration
                  ? "Start focusing"
                  : "Resume"}
          </span>
        </button>

        <button
          type="button"
          className="timer-reset-button"
          onClick={handleReset}
          aria-label="Reset timer"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      <p className="timer-quote">
        "Small steps lead to big things."
      </p>
    </section>
  );
}
