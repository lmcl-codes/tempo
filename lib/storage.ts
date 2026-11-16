export type Task = {
  id: number;
  title: string;
  category: string;
  completed: boolean;
};

export type FocusSession = {
  id: number;
  date: string;
  duration: number;
};

const TASKS_KEY = "tempo-tasks";
const SESSIONS_KEY = "tempo-focus-sessions";
const CYCLE_KEY = "tempo-completed-focus-sessions";

// Get saved tasks
export function getStoredTasks(): Task[] | null {
  if (typeof window === "undefined") return null;

  try {
    const savedTasks = localStorage.getItem(TASKS_KEY);

    return savedTasks ? JSON.parse(savedTasks) : null;
  } catch {
    return null;
  }
}

// Save tasks
export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  notifyDataUpdated();
}

// Get completed focus sessions
export function getFocusSessions(): FocusSession[] {
  if (typeof window === "undefined") return [];

  try {
    const savedSessions = localStorage.getItem(SESSIONS_KEY);

    return savedSessions ? JSON.parse(savedSessions) : [];
  } catch {
    return [];
  }
}

// Save a completed focus session
export function saveFocusSession(duration: number) {
  if (typeof window === "undefined") return;

  const sessions = getFocusSessions();

  const newSession: FocusSession = {
    id: Date.now(),
    date: [
        new Date().getFullYear(),
        String(new Date().getMonth() + 1).padStart(2, "0"),
        String(new Date().getDate()).padStart(2, "0"),
    ].join("-"),
    duration,
  };

  localStorage.setItem(
    SESSIONS_KEY,
    JSON.stringify([...sessions, newSession])
  );

  notifyDataUpdated();
}

// Notify other components when data changes
export function notifyDataUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("tempo-data-updated"));
  }
}

export function getCompletedFocusSessions(): number {
  if (typeof window === "undefined") return 0;

  const savedCount = localStorage.getItem(CYCLE_KEY);
  return savedCount ? Number(savedCount) : 0;
}

export function saveCompletedFocusSessions(count: number) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CYCLE_KEY, String(count));
}