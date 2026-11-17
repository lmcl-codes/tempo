
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
    href: "/#tasks",
    id: "tasks",
    icon: CheckSquare,
  },
  {
    label: "Statistics",
    href: "/#statistics",
    id: "statistics",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("focus");
  

useEffect(() => {
  const sections = navigation
    .map((item) => document.getElementById(item.id))
    .filter((section): section is HTMLElement => section !== null);

  const updateActiveSection = () => {
    const detectionPoint = window.innerHeight * 0.25;

    let currentSection = "focus";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= detectionPoint) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  updateActiveSection();

  window.addEventListener("scroll", updateActiveSection, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
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
        <a
          href="/help"
          className={`nav-link ${pathname === "/help" ? "active" : ""}`}
        >
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
