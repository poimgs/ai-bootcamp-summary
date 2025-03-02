# AI in Software Engineering

A comprehensive summary of AI's impact on software engineering, based on insights from the [AI Bootcamp](https://ai-bootcamp.org/). This interactive web application provides an overview of how artificial intelligence is transforming software development processes, capabilities, and mindsets.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)

## 🔍 Overview

This project serves as an educational resource that explores various aspects of AI in software engineering, including:

- Introduction to AI in software development
- AI capabilities and their applications
- How AI accelerates the software development lifecycle
- Demystifying AI concepts for developers
- Understanding AI models and modalities
- The necessary mindset shift for working with AI

## ✨ Features

- Interactive navigation with smooth scrolling
- Responsive design for mobile, tablet, and desktop
- Progress bar to track reading progress
- Organized content sections with visual icons
- Modern UI with Tailwind CSS styling

## 🛠️ Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-bootcamp-summary.git
   cd ai-bootcamp-summary
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
ai-bootcamp-summary/
├── dist/                 # Build output
├── node_modules/         # Dependencies
├── public/               # Static assets
├── src/                  # Source code
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   ├── assets/           # Images, fonts, etc.
│   └── components/       # Reusable components
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── package.json          # Project metadata and dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 💻 Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

### Customizing Content

To modify the content sections, edit the `sections` array in `App.tsx` and update the corresponding section components.

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

This project was created as a summary of the [AI Bootcamp](https://ai-bootcamp.org/) learning experience.
