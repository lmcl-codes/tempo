
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-greeting">
        <div className="header-eyebrow">
          <Sparkles size={14} />
          <span>YOUR PERSONAL WORKSPACE</span>
        </div>

        <h1>Good day!</h1>

        <p>
          Make today count, one focused session at a time.
        </p>
      </div>

      <div className="header-message">
        <span className="status-dot"></span>
        <span>Take it one task at a time.</span>
      </div>
    </header>
  );
}
