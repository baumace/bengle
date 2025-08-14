
# Bengle UI

This is the frontend UI for the Bengle project, built with [Next.js](https://nextjs.org/) and [React](https://react.dev/). It provides a modern, responsive interface for interacting with the Bengle API.

## Features

- Modular component structure (Board, Button, Dropdown, PopUp, SearchBox, Tooltip)
- TypeScript for type safety
- ESLint and Prettier for code quality and formatting
- Docker support for containerized deployment
- Custom global styles and configuration
- Static assets in `public/`
- Dynamic player data fetched from the Bengle API
- Decoupled game and data logic via custom hooks (`useGame`, `usePlayers`)
- Centralized pop-up state management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

```sh
pnpm install
```

### Development

Start the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Linting & Formatting

```sh
pnpm lint
pnpm format
```

### Building for Production

```sh
pnpm build
```

### Running with Docker

Build and run the Docker container:

```sh
docker build -t bengle-ui .
docker run -p 3000:3000 bengle-ui
```

## Project Structure

```
ui/
	src/
		app/           # Next.js app directory
		components/    # Reusable React components
		hooks/         # Custom React hooks
		types/         # TypeScript type definitions
	public/          # Static assets
	Dockerfile       # Docker configuration
	package.json     # Project metadata and scripts
	tsconfig.json    # TypeScript configuration
	eslint.config.mjs# ESLint configuration
	postcss.config.mjs # PostCSS configuration
```