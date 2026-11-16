
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Circle,
  CircleCheck,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

import {
  Task,
  getStoredTasks,
  saveTasks,
} from "@/lib/storage";

const initialTasks: Task[] = [];

const taskCategories = [
  "All",
  "General",
  "Work",
  "Study",
  "Personal",
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [newTaskCategory, setNewTaskCategory] = useState("Personal");

  // Load saved tasks when the component mounts
  useEffect(() => {
    const savedTasks = getStoredTasks();

    if (savedTasks !== null) {
      setTasks(savedTasks);
    }

    setIsLoaded(true);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0 ? 0 : (completedTasks / tasks.length) * 100;

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = newTask.trim();

    if (!trimmedTitle) return;

    const task: Task = {
      id: Date.now(),
      title: trimmedTitle,
      category: newTaskCategory,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    setNewTask("");
    setNewTaskCategory("Personal");
  };

  const handleToggleTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
      setEditedTitle("");
    }
  };

  const handleStartEditing = (task: Task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = (id: number) => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) return;

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, title: trimmedTitle } : task
      )
    );

    setEditingId(null);
    setEditedTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
  };

  return (
    <section className="task-card" id="tasks">
      <div className="task-header">
        <div>
          <span className="section-eyebrow">STAY ON TRACK</span>
          <h2>Today's Tasks</h2>
          <p>
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>
      </div>

      <div className="task-progress-track">
        <div
          className="task-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="What needs to get done?"
          aria-label="New task name"
          maxLength={100}
        />

        <select
          value={newTaskCategory}
          onChange={(event) => setNewTaskCategory(event.target.value)}
          className="task-category-select"
        >
          {taskCategories
            .filter((category) => category !== "All")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <button
          className="add-task-button"
          type="submit"
          disabled={!newTask.trim()}
        >
          <Plus size={16} />
          <span>Add task</span>
        </button>
      </form>

          <div className="task-filters">
            {taskCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`task-filter ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="task-status-filters">
  {["All", "Active", "Completed"].map((status) => (
    <button
      key={status}
      type="button"
      className={`task-status-filter ${
        selectedStatus === status ? "active" : ""
      }`}
      onClick={() => setSelectedStatus(status)}
    >
      {status}
    </button>
  ))}
</div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-tasks">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          tasks.filter((task) => {
  const matchesCategory =
    selectedCategory === "All" ||
    task.category === selectedCategory;

  const matchesStatus =
    selectedStatus === "All" ||
    (selectedStatus === "Active" && !task.completed) ||
    (selectedStatus === "Completed" && task.completed);

  return matchesCategory && matchesStatus;
}).map((task) => (
            <div className="task-item" key={task.id}>
              <div className="task-item-main">
                <button
                  className="task-checkbox"
                  type="button"
                  onClick={() => handleToggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? `Mark ${task.title} as incomplete`
                      : `Mark ${task.title} as complete`
                  }
                >
                  {task.completed ? (
                    <CircleCheck size={21} />
                  ) : (
                    <Circle size={21} />
                  )}
                </button>

                <div className="task-details">
                  {editingId === task.id ? (
                    <input
                      className="task-edit-input"
                      value={editedTitle}
                      onChange={(event) =>
                        setEditedTitle(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSaveEdit(task.id);
                        }

                        if (event.key === "Escape") {
                          handleCancelEdit();
                        }
                      }}
                      autoFocus
                      aria-label="Edit task name"
                      maxLength={100}
                    />
                  ) : (
                    <span
                      className={`task-title ${
                        task.completed ? "completed" : ""
                      }`}
                    >
                      {task.title}
                    </span>

                    
                  )}

                  <span className={`task-category ${task.category.toLowerCase()}`}>
  {task.category}
</span>
                </div>
              </div>

              <div className="task-actions">
                {editingId === task.id ? (
                  <>
                    <button
                      className="task-action-button"
                      type="button"
                      onClick={() => handleSaveEdit(task.id)}
                      aria-label="Save task"
                    >
                      <Check size={17} />
                    </button>

                    <button
                      className="task-action-button"
                      type="button"
                      onClick={handleCancelEdit}
                      aria-label="Cancel editing"
                    >
                      <X size={17} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="task-action-button"
                      type="button"
                      onClick={() => handleStartEditing(task)}
                      aria-label={`Edit ${task.title}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="task-action-button delete"
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="task-footer">
        <span>
          {tasks.length === 0
            ? "Your task list is empty"
            : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} in total`}
        </span>
        <span>{Math.round(progress)}% completed</span>
      </div>
    </section>
  );
}
