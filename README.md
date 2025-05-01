# 🛍️ Ecommerce Application

**Final project** for the [RS School JavaScript/Front-End 2024Q4](https://rs.school/) course. This is a modern e-commerce web application built with **React**, **TypeScript**, **Vite**, and **Ant Design**. It includes product browsing, cart functionality, and state management.

---

## 📌 Table of Contents

- [📖 Project Purpose](#-project-purpose)
- [🚀 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [📦 Scripts & Usage](#-scripts--usage)
- [🔧 Local Setup & Installation](#-local-setup--installation)
- [🧪 Testing](#-testing)
- [📄 License](#-license)

---

## 📖 Project Purpose

The goal of this project is to:

- Apply modern front-end development skills learned in the RS School JavaScript/Front-End course.
- Build a fully functional and responsive e-commerce application.
- Practice collaboration, Git workflows, and coding standards in a team.

---

## 🚀 Tech Stack

| Category         | Technology                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Framework        | [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)                       |
| Build Tool       | [Vite](https://vitejs.dev/)                                                                         |
| UI Library       | [Ant Design](https://ant.design/)                                                                   |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/)                                                            |
| Routing          | [React Router v7](https://reactrouter.com/)                                                         |
| Linting          | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                                    |
| Testing          | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)                     |
| Git Hooks        | [Husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged) |

---

## 📂 Project Structure

```
ecommerce-application/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
├── .husky/
├── .eslintrc.cjs
├── .prettierrc
├── vite.config.ts
└── package.json
```

---

## 📦 Scripts & Usage

All scripts are run from the root directory using `npm run <script>`:

| Script       | Description                                  |
| ------------ | -------------------------------------------- |
| `dev`        | Starts the Vite dev server with hot reload   |
| `build`      | Builds the project using TypeScript and Vite |
| `preview`    | Serves the built app for local preview       |
| `lint`       | Runs ESLint to analyze code for problems     |
| `format:fix` | Automatically formats code using Prettier    |
| `test`       | Runs unit tests using Vitest                 |
| `test:ui`    | Opens the Vitest UI test runner              |
| `prepare`    | Hook to setup Husky after install            |

### 🧹 Lint-staged

On every commit, `lint-staged` runs ESLint and Prettier only on changed files to ensure consistent style and code quality.

---

## 🔧 Local Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/Avechkina/eCommerce-Application.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

Run all tests:

```bash
npm run test
```

Run with interactive UI:

```bash
npm run test:ui
```

---

## 📄 License

This project is created as part of RS School's educational program and is intended for learning purposes.
