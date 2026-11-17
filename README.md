# Tempo — Find Your Rhythm.

A Pomodoro timer and productivity web application designed to help you stay focused, organize your tasks, and build better work habits.

**[Live Demo](https://focus-with-tempo.vercel.app/)**

<img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/a08dedbd-21b9-4925-9999-a98a350c5f16" />
<img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/932f938e-7c03-41c3-befb-58eceb222e09" />
<img width="1920" height="1080" alt="5" src="https://github.com/user-attachments/assets/c1e6c4b4-caf9-42b4-80bb-f2860cb62920" />


## Overview

Tempo is a productivity application built around the Pomodoro Technique. It combines a customizable focus timer, task management, and productivity statistics in one simple, thoughtfully designed interface.

Whether you're studying, working, or managing personal projects, Tempo helps you make time for what matters.

## Features

### Focus Timer
- Customizable Focus, Short Break, and Long Break durations.
- Start, pause, resume, and reset controls.
- Automatic session transitions.
- Long Break after every four completed Focus sessions.
- Optional timer completion notification sounds.

### Task Management
- Create, edit, and delete tasks.
- Mark tasks as completed or active.
- Organize tasks into categories: General, Work, Study, and Personal.
- Filter tasks by completion status and category.

### Productivity Statistics
- Track completed focus sessions and total focus time.
- Monitor daily progress against a customizable focus goal.
- View productivity trends through 7-day and 30-day statistics.

### Personalization
- Customize timer durations and daily focus goals.
- Toggle notification sounds.
- Switch between Light Mode and Dark Mode.
- Reset productivity data while retaining personal settings.

### Help & Support
- Getting Started guide.
- Interactive Frequently Asked Questions.
- Productivity tips.
- Application information.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interface |
| TypeScript | Type safety and maintainability |
| CSS | Styling and responsive layouts |
| Lucide React | Interface icons |
| LocalStorage | Client-side data persistence |
| Vercel | Deployment and hosting |

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd tempo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production version locally:

```bash
npm run start
```

## Data Storage

Tempo uses the browser's LocalStorage API to save tasks, timer preferences, and focus session history.

Data is stored locally in the user's browser and is not synchronized across devices or browsers. Clearing browser storage may remove saved application data.

## Design

Tempo features a warm, minimalist interface with a sage-inspired color palette, complemented by the Inter and Fraunces typefaces.

The application supports responsive layouts and Light and Dark Modes to provide a comfortable experience across different screen sizes.

## Future Improvements

- Enhanced productivity insights and statistics.
- Additional timer customization options.
- Further accessibility improvements.

## Acknowledgments

- [Lucide](https://lucide.dev/) for the icon library.
- [Vercel](https://vercel.com/) for application deployment.

---

**Tempo — Find your rhythm. Make time for what matters.**
