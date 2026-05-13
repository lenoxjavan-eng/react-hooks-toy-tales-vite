# Practice Challenge: Toy Tales

Andy has misplaced his toys again, and your job is to help him manage them.
This project is a Vite + React app that uses `json-server` for a simple toy API.

## Quick Start

1. Run `npm install` to install dependencies.
2. Start the fake API server with `npm run server`.
3. In another terminal, run `npm run dev`.
4. Open the app in your browser at `http://localhost:5173`.
5. Run `npm run test` to execute the test suite.

## What this app does

- Fetches toy data from `http://localhost:3001/toys`
- Displays toys in the collection view
- Lets you add a new toy via the form
- Lets you donate a toy, removing it locally and from the server
- Lets you like a toy and updates its likes count on the server

## Recommended local workflow

- `npm run server` to launch the JSON API server on `http://localhost:3001`
- `npm run dev` to launch the React app on `http://localhost:5173`
- `npm run test` to run the unit tests

## Notes

- The toy data is stored in `db.json`.
- The app is intentionally small and uses React hooks for state and effects.
- If the server is not running, the app shows a loading/error state.

## Preview

![Toy Tales app screenshot](./app-screenshot.png)
