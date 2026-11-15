
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import ProgressCard from "@/components/ProgressCard";

export default function Home() {
  return (
    <main className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <div className="dashboard-content">
          <div className="dashboard-primary">
            <Timer />
            <ProgressCard />
          </div>

          <div className="dashboard-secondary">
            <TaskList />
          </div>
        </div>
      </div>
    </main>
  );
}
