"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Settings, Database, RotateCcw } from "lucide-react";
import {
  getTimerSettings,
  saveTimerSettings,
  DEFAULT_TIMER_SETTINGS,
  saveTasks,
  saveCompletedFocusSessions,
} from "@/lib/storage";

export default function SettingsPage() {
  const [timerSettings, setTimerSettings] = useState({
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    dailyGoal: 150,
    soundEnabled: true,
    darkMode: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedSettings = getTimerSettings();
    setTimerSettings(savedSettings);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTimerSettings(timerSettings);
      window.dispatchEvent(new Event("tempo-settings-updated"));
    }
  }, [timerSettings, isLoaded]);

  const updateSetting = (
    setting: keyof typeof timerSettings,
    value: number | boolean
  ) => {
    setTimerSettings((previous) => ({
      ...previous,
      [setting]: value,
    }));
  };

  const handleResetData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all your Tempo data? This will delete your tasks and focus session history. Your settings will remain unchanged."
    );

    if (!confirmed) return;

    saveTasks([]);
    saveCompletedFocusSessions(0);
    localStorage.removeItem("tempo-focus-sessions");

    window.dispatchEvent(new Event("tempo-data-updated"));

    alert("Your Tempo data has been successfully reset!");
  };
  
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

            <div className="settings-options">
              <div className="setting-item">
                <div>
                  <h3>Focus Duration</h3>
                  <p>How long each focus session lasts.</p>
                </div>
                <select
                  value={timerSettings.focusDuration}
                  onChange={(e) =>
                    updateSetting("focusDuration", Number(e.target.value))
                  }
                >
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="25">25 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Short Break</h3>
                  <p>Duration of your short breaks.</p>
                </div>
                <select
                  value={timerSettings.shortBreakDuration}
                  onChange={(e) =>
                    updateSetting("shortBreakDuration", Number(e.target.value))
                  }
                >
                  <option value="3">3 minutes</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                </select>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Long Break</h3>
                  <p>Duration of your long breaks.</p>
                </div>
                <select
                  value={timerSettings.longBreakDuration}
                  onChange={(e) =>
                    updateSetting("longBreakDuration", Number(e.target.value))
                  }
                >
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Daily Focus Goal</h3>
                  <p>Set your daily target for focused work.</p>
                </div>

                <select
                  value={timerSettings.dailyGoal}
                  onChange={(e) =>
                    updateSetting("dailyGoal", Number(e.target.value))
                  }
                >
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                  <option value="150">150 minutes</option>
                  <option value="180">180 minutes</option>
                  <option value="240">240 minutes</option>
                  <option value="300">300 minutes</option>
                </select>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Timer Sounds</h3>
                  <p>Play a sound when a timer session ends.</p>
                </div>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={timerSettings.soundEnabled}
                    onChange={(e) =>
                      updateSetting("soundEnabled", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Dark Mode</h3>
                  <p>Switch to a darker appearance.</p>
                </div>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={timerSettings.darkMode}
                    onChange={(e) =>
                      updateSetting("darkMode", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>


          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <Database size={19} />
              </div>

              <div>
                <h2>Data Management</h2>
                <p>Manage your saved productivity data.</p>
              </div>
            </div>

            <div className="setting-item">
              <div>
                <h3>Reset Productivity Data</h3>
                <p>
                  Delete all saved tasks and focus session history.
                  Your preferences will remain unchanged.
                </p>
              </div>

              <button
                type="button"
                className="reset-data-button"
                onClick={handleResetData}
              >
                <RotateCcw size={15} />
                Reset Data
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
