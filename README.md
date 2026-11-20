<h1 align="center">Rick & Morty · Multiverse Explorer</h1>

<p align="center">
  <a href="https://edgergard.github.io/Rick-and-morty-fe/">Live demo</a> ·
  <a href="https://rickandmortyapi.com/">Rick and Morty API</a>
</p>

A fast, responsive explorer for every character of the Rick and Morty universe, built on the public GraphQL API.

## Features

- Search by name (debounced, `/` to focus) and filter by status, species, type and gender
- All list state lives in the URL, so any search can be shared or bookmarked
- Smart pagination with the previous page kept on screen while the next one loads
- Character page with details, origin and location dimensions, and every appearance grouped by season
- Activity history (viewed characters and searches) persisted in `localStorage`
- Export the current page to CSV
- Loading skeletons, empty and error states, keyboard and screen-reader friendly

## Tech stack

React 19 · TypeScript · Vite 6 · TanStack Query 5 · React Router 7 · Zustand 5 · Tailwind CSS 4 · graphql-request · lucide-react

## Architecture

Feature-sliced layout — each layer may only import from the layers below it:

```
src/
├── app/        # entry point, router, providers, global styles
├── pages/      # route screens: HomePage, CharacterPage, NotFoundPage
├── widgets/    # composite UI blocks: Header, Footer, Pagination
├── features/   # user interactions
│   ├── character-filters/   # URL-backed filter state + FilterBar
│   ├── history/             # zustand store + HistoryDrawer
│   └── export-csv/
├── entities/
│   └── character/  # types, GraphQL queries, React Query hooks, CharacterCard
└── shared/     # api client, config, generic UI kit, helpers
```

- **Server state** — TanStack Query (caching, `keepPreviousData`, retries). Queries use GraphQL variables instead of string interpolation.
- **URL state** — filters and page are read from and written to search params via `useCharacterFilters`.
- **Client state** — a small persisted Zustand store for history; no Redux boilerplate.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint
npm run deploy     # publish dist/ to GitHub Pages
```
