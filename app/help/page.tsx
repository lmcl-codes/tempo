
"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  CircleHelp,
  Timer,
  Lightbulb,
  Info,
  Play,
  ListTodo,
  ChartNoAxesColumnIncreasing,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function HelpPage() {
    const faqs = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time management method that divides work into focused intervals followed by short breaks. Tempo uses this approach to help you stay productive without forgetting to rest.",
  },
  {
    question: "Can I customize my timer durations?",
    answer:
      "Yes! Visit Settings to customize your Focus Duration, Short Break, and Long Break durations according to your preferences.",
  },
  {
    question: "What happens when a timer finishes?",
    answer:
      "Tempo plays a notification sound if enabled and automatically switches to the next session. After four completed focus sessions, it schedules a Long Break.",
  },
  {
    question: "Are my tasks and progress saved?",
    answer:
      "Yes. Tempo stores your tasks, focus session history, and preferences in your browser's local storage. Your data remains available when you revisit the app using the same browser, unless you clear it or reset your data.",
  },
  {
    question: "Can I use Tempo in Dark Mode?",
    answer:
      "Absolutely! Open Settings and enable Dark Mode to switch between Tempo's light and dark appearances.",
  },
  {
    question: "What happens when I reset my data?",
    answer:
      "Reset Data removes your saved tasks, focus session history, and completed focus session cycle. Your timer preferences and appearance settings remain unchanged.",
  },
];
const [openFaq, setOpenFaq] = useState<number | null>(null);
const productivityTips = [
  {
    title: "Start with one priority",
    description:
      "Choose one important task before starting your focus session. Having a clear priority makes it easier to stay on track.",
    icon: "01",
  },
  {
    title: "Minimize distractions",
    description:
      "Silence unnecessary notifications, close unrelated tabs, and create a workspace that helps you concentrate.",
    icon: "02",
  },
  {
    title: "Take your breaks seriously",
    description:
      "Step away from your screen, stretch, or grab some water. Short breaks help you recharge for the next session.",
    icon: "03",
  },
  {
    title: "Be realistic with your goals",
    description:
      "Set achievable daily focus targets. Consistency matters more than trying to accomplish everything at once.",
    icon: "04",
  },
];

  return (
    <main className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <div className="help-header">
          <span className="section-eyebrow">
            HERE TO HELP YOU
          </span>

          <h1>Help & Support</h1>

          <p>
            Everything you need to make the most of your time with Tempo.
          </p>
        </div>

        
<div className="help-content">
  <section className="help-card">
    <div className="help-card-header">
      <div className="help-card-icon">
        <Timer size={19} />
      </div>

      <div>
        <h2>Getting Started</h2>
        <p>Learn the basics of using Tempo.</p>
      </div>
    </div>

    <div className="help-guide-list">
      <div className="help-guide-item">
        <div className="help-guide-number">01</div>
        <div>
          <h3>Start a Focus session</h3>
          <p>
            Head to the Focus page, choose your preferred timer mode,
            and select Start Focusing when you're ready to begin.
          </p>
        </div>
      </div>

      <div className="help-guide-item">
        <div className="help-guide-number">02</div>
        <div>
          <h3>Take regular breaks</h3>
          <p>
            Switch between Short Break and Long Break to give yourself
            time to recharge. Tempo automatically moves between sessions
            when a timer finishes.
          </p>
        </div>
      </div>

      <div className="help-guide-item">
        <div className="help-guide-number">03</div>
        <div>
          <h3>Organize your tasks</h3>
          <p>
            Add tasks, assign categories, and mark completed activities
            to keep track of what needs to get done.
          </p>
        </div>
      </div>

      <div className="help-guide-item">
        <div className="help-guide-number">04</div>
        <div>
          <h3>Track your progress</h3>
          <p>
            Visit Statistics to review your completed focus sessions,
            focus time, and productivity trends.
          </p>
        </div>
      </div>

      <div className="help-guide-item">
        <div className="help-guide-number">05</div>
        <div>
          <h3>Personalize your experience</h3>
          <p>
            Open Settings to customize timer durations, daily focus goals,
            notification sounds, and your preferred appearance.
          </p>
        </div>
      </div>
    </div>
  </section>

<section className="help-card">
  <div className="help-card-header">
    <div className="help-card-icon">
      <CircleHelp size={19} />
    </div>

    <div>
      <h2>Frequently Asked Questions</h2>
      <p>Quick answers to common questions about Tempo.</p>
    </div>
  </div>

  <div className="faq-list">
    {faqs.map((faq, index) => (
      <div className="faq-item" key={index}>
        <button
          type="button"
          className="faq-question"
          onClick={() =>
            setOpenFaq(openFaq === index ? null : index)
          }
          aria-expanded={openFaq === index}
        >
          <span>{faq.question}</span>

          <ChevronDown
            size={17}
            className={openFaq === index ? "faq-chevron open" : "faq-chevron"}
          />
        </button>

        {openFaq === index && (
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</section>

<section className="help-card">
  <div className="help-card-header">
    <div className="help-card-icon">
      <Lightbulb size={19} />
    </div>

    <div>
      <h2>Productivity Tips</h2>
      <p>Small habits that make a big difference.</p>
    </div>
  </div>

  <div className="productivity-tips">
    {productivityTips.map((tip) => (
      <div className="productivity-tip" key={tip.icon}>
        <span className="productivity-tip-number">
          {tip.icon}
        </span>

        <div>
          <h3>{tip.title}</h3>
          <p>{tip.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>

<section className="help-card about-tempo-card">
  <div className="help-card-header">
    <div className="help-card-icon">
      <Info size={19} />
    </div>

    <div>
      <h2>About Tempo</h2>
      <p>A little more about your productivity companion.</p>
    </div>
  </div>

  <div className="about-tempo-content">
    <div className="about-tempo-brand">
      <div className="about-tempo-logo">
        <Timer size={25} />
      </div>

      <div>
        <h3>Tempo</h3>
        <span>Find your rhythm.</span>
      </div>
    </div>

    <p className="about-tempo-description">
      Tempo is a simple productivity application designed to help
      you manage your time, organize your tasks, and build better
      focus habits through the Pomodoro Technique.
    </p>

    <div className="about-tempo-footer">
      <span>Version 1.0.0</span>
      <span>Made for mindful productivity.</span>
    </div>
  </div>
</section>

</div>

      </div>
    </main>
  );
}
