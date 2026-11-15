
import {
  Clock3,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

const progressStats = [
  {
    label: "Focus Time",
    value: "1h 40m",
    description: "Time spent focusing",
    icon: Clock3,
  },
  {
    label: "Sessions Completed",
    value: "4",
    description: "Pomodoro sessions",
    icon: CheckCircle2,
  },
  {
    label: "Daily Goal",
    value: "67%",
    description: "2.5 hours target",
    icon: Target,
  },
];

export default function ProgressCard() {
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
          <span>100 / 150 minutes</span>
        </div>

        <div className="daily-goal-track">
          <div className="daily-goal-fill"></div>
        </div>

        <p>You're making great progress. Keep it up!</p>
      </div>
    </section>
  );
}
