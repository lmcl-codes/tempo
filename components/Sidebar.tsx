
"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  CheckSquare,
  ChartNoAxesColumnIncreasing,
  Settings,
  CircleHelp,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Focus",
    href: "/",
    id: "focus",
    icon: Clock3,
  },
  {
    label: "Tasks",
    href: "#tasks",
    id: "tasks",
    icon: CheckSquare,
  },
  {
    label: "Statistics",
    href: "#statistics",
    id: "statistics",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("focus");
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    navigation.forEach((item) => {
      const section = document.getElementById(item.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Clock3 size={22} />
        </div>
        <span>Tempo</span>
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
                className={`nav-link ${
                  pathname === "/" && activeSection === item.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
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

        <a
  href="/settings"
  className={`nav-link ${pathname === "/settings" ? "active" : ""}`}
>
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
