
export default function Home() {
  return (
    <main className="dashboard">
      <aside className="sidebar">
        <h1 className="logo">Tempo</h1>

        <nav>
          <p className="nav-label">MENU</p>
          <a className="active" href="#">◷ Focus</a>
          <a href="#">☷ Tasks</a>
          <a href="#">▥ Statistics</a>
        </nav>

        <div className="sidebar-bottom">
          <p>Find your rhythm.</p>
        </div>
      </aside>

      <section className="main-content">
        <header>
          <div>
            <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
            <h2>Good day! 👋</h2>
            <p>Ready to make today count?</p>
          </div>
        </header>

        <section className="timer-card">
          <p className="eyebrow">POMODORO TIMER</p>

          <div className="timer-tabs">
            <button className="selected">Focus</button>
            <button>Short Break</button>
            <button>Long Break</button>
          </div>

          <div className="timer">25:00</div>

          <p className="timer-caption">
            Time to concentrate.
          </p>

          <button className="start-button">
            Start Focus
          </button>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h3>Today's Tasks</h3>
            <p>Your tasks will appear here.</p>
          </div>

          <div className="panel">
            <h3>Today's Progress</h3>
            <p>0 focus sessions completed</p>
            <p>0 minutes focused</p>
          </div>
        </section>
      </section>
    </main>
  );
}
