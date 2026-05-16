# Expense Tracker App

Simple personal expense tracker built with React and a small Node/Express backend.

## Core Features

- Add expenses with name, amount, and category
- View expenses in a card-based history list with delete support
- See a running total and category breakdown update automatically
- Preview totals in another currency using a live exchange-rate API

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Currency conversion API: Frankfurter.app

## Project Setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure environment variables

Add the required values in the `.env` files for both apps.

### 3. Run the app

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

### 4. Build for production

```bash
cd frontend
npm run build
```