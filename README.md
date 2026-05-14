# Vue 3 + Vite + Docker

This project is set up with Vue 3, Vite, and Docker for easy development.

## Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. Build and start the container:
```bash
docker-compose up --build
```

2. Access the application at `http://localhost:5173`

3. Stop the container:
```bash
docker-compose down
```

### Development
The container uses hot-reload, so any changes to your source files will automatically refresh in the browser.

## Local Development (without Docker)

1. Install dependencies:
```bash
pnpm install
```

2. Run development server:
```bash
pnpm dev
```

## About This Template

This template uses Vue 3 `<script setup>` SFCs. Check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
