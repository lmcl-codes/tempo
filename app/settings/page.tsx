
import Sidebar from "@/components/Sidebar";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <div className="settings-header">
          <span className="section-eyebrow">
            PERSONALIZE YOUR EXPERIENCE
          </span>

          <h1>Settings</h1>

          <p>
            Make Tempo work the way you do.
          </p>
        </div>

        <div className="settings-content">
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <Settings size={19} />
              </div>

              <div>
                <h2>General Settings</h2>
                <p>Customize your productivity experience.</p>
              </div>
            </div>

            <div className="settings-placeholder">
              <p>Your settings will appear here.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
