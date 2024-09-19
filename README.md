# MGFit Fitness Tracking App (Frontend)

This is the frontend of the **MGFit Fitness Tracking App** built using **Next.js**. It provides a user-friendly interface for tracking various health metrics, managing workout programs, and exploring the leaderboard. The app also integrates with the backend for authentication and fetching user data.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Folder Structure](#folder-structure)
5. [Environment Variables](#environment-variables)
6. [Technologies Used](#technologies-used)
7. [Scripts](#scripts)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **User Authentication**: Secure login and sign-up via backend APIs (uses NextAuth).
- **Overview Dashboard**: Visualize core health metrics and recommendations.
- **Progress Tracking**: Interactive charts for tracking weight and other fitness data.
- **Training Programs**: Browse through various workout programs.
- **Leaderboard**: View rankings of users based on different fitness metrics.
- **Responsive Design**: Mobile-friendly interface for all devices.
- **Modular Components**: Reusable components for easier development.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitness-tracking-app-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fitness-tracking-app-frontend
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

---

## Running the App

To run the app in development mode:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app in the browser.

To build the app for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## Folder Structure

```
my-app
├── components               # Reusable components
│   ├── charts               # Components for data visualizations
│   ├── overview             # Core health metrics and recommendations
│   └── layout               # Layout components (header, nav, etc.)
├── context                  # React context for state management
├── pages                    # Next.js page routes
├── sass                     # SCSS styles (organized into abstracts, base, components, layout, pages)
├── styles                   # Global CSS and Tailwind setup
├── utils                    # Utility functions for API requests, formatting, etc.
└── public                   # Static assets (fonts, images)
```

### Key Files:

- **_app.js**: Customizes the main app wrapper and handles global states.
- **_document.js**: Enhances the HTML document with metadata and settings.
- **tailwind.config.js**: Tailwind CSS configuration.
- **Header.jsx**: Main header component.
- **CoreMetrics.jsx**: Shows key health metrics in the overview.
- **weightCard.jsx**: Renders weight tracking chart in the dashboard.
- **GeneralContext.jsx**: Provides global context for sharing data across components.
- **api-mapping.jsx**: Helper functions for handling API calls.

---

## Environment Variables

The following environment variables should be defined in a `.env` file in the root directory:

```
NEXT_PUBLIC_API_URL=<Backend API URL>
NEXTAUTH_URL=<NextAuth URL>
```

---

## Technologies Used

- **Next.js**: Framework for React-based web applications with server-side rendering and static generation.
- **React**: JavaScript library for building user interfaces.
- **NextAuth**: Authentication solution for Next.js apps.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **SASS (SCSS)**: CSS preprocessor for writing modular styles.
- **Chart.js**: For creating interactive charts to track fitness data.

---

## Scripts

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Runs the app in production mode.
- `npm run lint`: Lints the codebase using ESLint.

---

## Contributing

Contributions are welcome but we want to reach a second milestone first. Please, follow for updates.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

---