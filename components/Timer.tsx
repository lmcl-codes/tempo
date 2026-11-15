
import { Clock3, RotateCcw } from "lucide-react";

export default function Timer() {
  return (
    <section className="timer-card">
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
        <div className="timer-mode active">Focus</div>
        <div className="timer-mode">Short Break</div>
        <div className="timer-mode">Long Break</div>
      </div>

      <div className="timer-display">
        <span className="timer-time">25:00</span>
        <span className="timer-caption">TIME TO FOCUS</span>
      </div>

      <div className="timer-progress">
        <div className="timer-progress-fill"></div>
      </div>

      <div className="timer-session">
        <span>Session 1 of 4</span>
        <span>25 minutes</span>
      </div>

      <div className="timer-actions">
        <div className="timer-start-button">
          Start focusing
        </div>

        <div className="timer-reset-button">
          <RotateCcw size={17} />
        </div>
      </div>

      <p className="timer-quote">
        "Small steps lead to big things."
      </p>
    </section>
  );
}
