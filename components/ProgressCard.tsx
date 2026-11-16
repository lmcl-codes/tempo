
"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  FocusSession,
  getFocusSessions,
} from "@/lib/storage";

const DAILY_GOAL = 150;

export default function ProgressCard() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [today, setToday] = useState("");

  // Load today's date and saved sessions
  useEffect(() => {
    const getTodayKey = () => {
      const date = new Date();

      return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");
    };

    const updateSessions = () => {
      setSessions(getFocusSessions());
    };

    setToday(getTodayKey());
    updateSessions();

    // Listen for newly completed focus sessions
    window.addEventListener("tempo-data-updated", updateSessions);

    return () => {
      window.removeEventListener("tempo-data-updated", updateSessions);
    };
  }, []);

  // Filter sessions completed today
  const todaySessions = sessions.filter(
    (session) => session.date === today
  );

  const completedSessions = todaySessions.length;

  const totalFocusMinutes = todaySessions.reduce(
    (total, session) => total + session.duration,
    0
  );

  const goalProgress = Math.min(
    (totalFocusMinutes / DAILY_GOAL) * 100,
    100
  );

  const formatFocusTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${Number(remainingMinutes.toFixed(2))}m`;

    if (remainingMinutes === 0) return `${hours}h`;

    return `${hours}h ${remainingMinutes}m`;
  };

  const progressStats = [
    {
      label: "Focus Time",
      value: formatFocusTime(totalFocusMinutes),
      description: "Time spent focusing",
      icon: Clock3,
    },
    {
      label: "Sessions Completed",
      value: String(completedSessions),
      description: "Focus sessions today",
      icon: CheckCircle2,
    },
    {
      label: "Daily Goal",
      value: `${Math.round(goalProgress)}%`,
      description: "Of 150-minute target",
      icon: Target,
    },
  ];

  return (
    <section className="progress-card" id="statistics">
      <div className="progress-header">
        <div>
          <span className="section-eyebrow">YOUR ACHIEVEMENTS</span>
          <h2>Today's Progress</h2>
          <p>A little progress goes a long way.</p>
        </div>

        <div className="progress-icon">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="progress-stats">
        {progressStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="progress-stat" key={stat.label}>
              <div className="progress-stat-icon">
                <Icon size={18} />
              </div>

              <div className="progress-stat-details">
                <span className="progress-stat-label">
                  {stat.label}
                </span>

                <span className="progress-stat-value">
                  {stat.value}
                </span>

                <span className="progress-stat-description">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="daily-goal">
        <div className="daily-goal-header">
          <span>Daily focus goal</span>
          <span>
            {totalFocusMinutes.toFixed(2)} / {DAILY_GOAL} minutes
          </span>
        </div>

        <div className="daily-goal-track">
          <div
            className="daily-goal-fill"
            style={{ width: `${goalProgress}%` }}
          />
        </div>

        <p>
          {totalFocusMinutes >= DAILY_GOAL
            ? "You've reached your daily focus goal. Well done!"
            : totalFocusMinutes === 0
              ? "Start your first focus session today!"
              : "You're making great progress. Keep it up!"}
        </p>
      </div>
    </section>
  );
}