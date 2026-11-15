
import {
  Clock3,
  CheckSquare,
  ChartNoAxesColumnIncreasing,
  Settings,
  CircleHelp,
} from "lucide-react";

const navigation = [
  {
    label: "Focus",
    href: "#focus",
    icon: Clock3,
    active: true,
  },
  {
    label: "Tasks",
    href: "#tasks",
    icon: CheckSquare,
    active: false,
  },
  {
    label: "Statistics",
    href: "#statistics",
    icon: ChartNoAxesColumnIncreasing,
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Clock3 size={22} />
        </div>
        <span>tempo.</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${item.active ? "active" : ""}`}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <a href="#help" className="nav-link">
          <CircleHelp size={19} strokeWidth={1.8} />
          <span>Help & Support</span>
        </a>

        <a href="#settings" className="nav-link">
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </a>

        <div className="sidebar-footer">
          <p>Find your rhythm.</p>
          <span>Make time for what matters.</span>
        </div>
      </div>
    </aside>
  );
}
