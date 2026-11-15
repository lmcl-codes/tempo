
import { Plus, Circle, CircleCheck, MoreHorizontal } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Review project requirements",
    category: "Work",
    completed: true,
  },
  {
    id: 2,
    title: "Finish website homepage",
    category: "Development",
    completed: false,
  },
  {
    id: 3,
    title: "Read 10 pages of a book",
    category: "Personal",
    completed: false,
  },
];

export default function TaskList() {
  const completedTasks = tasks.filter((task) => task.completed).length;

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

        <button className="add-task-button" type="button">
          <Plus size={16} />
          <span>Add task</span>
        </button>
      </div>

      <div className="task-progress-track">
        <div
          className="task-progress-fill"
          style={{
            width: `${(completedTasks / tasks.length) * 100}%`,
          }}
        />
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <div className="task-item-main">
              <span className="task-checkbox">
                {task.completed ? (
                  <CircleCheck size={21} />
                ) : (
                  <Circle size={21} />
                )}
              </span>

              <div className="task-details">
                <span
                  className={`task-title ${
                    task.completed ? "completed" : ""
                  }`}
                >
                  {task.title}
                </span>

                <span className="task-category">
                  {task.category}
                </span>
              </div>
            </div>

            <button
              className="task-more-button"
              type="button"
              aria-label={`More options for ${task.title}`}
            >
              <MoreHorizontal size={19} />
            </button>
          </div>
        ))}
      </div>

      <button className="view-tasks-button" type="button">
        View all tasks
      </button>
    </section>
  );
}
