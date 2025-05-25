---

# Full Stack Developer Challenge: Restaurant Listing App

**Author**: Zion Ogochukwu Ebite

**Date**: May 25, 2025

---

## Overview

A full-stack restaurant listing app built with **React + TypeScript (Frontend)** and **tRPC + Prisma + PostgreSQL (Backend)**. Users can browse restaurants, view details, and mark favorites. The UI is responsive and mirrors the provided design and mock data.

---

## Objective

Build a responsive web app that lets users:

- View restaurants with name, description, rating, and image
- Mark/unmark favorites (via heart icon)
- Use tRPC endpoints to retrieve/manage data
- Match provided UI design
- Work well on mobile and desktop

---

## Tech Stack

### Frontend

- **React + TypeScript**
- **SCSS** for styling
- Components: `Header`, `Item`, `Rating`, `SearchInput`, `Button*`
- Features: Search bar, sliders, favorites, responsive layout

### Backend

- **tRPC** for API
- **PostgreSQL** via **Prisma**
- Endpoints: `getRestaurants`, `addFavorite`

---

## Achievements

- Fully functional and visually consistent with design
- Heart icon toggles favorites using `addFavorite`
- Clean UI with sliders, ratings, and navigation
- Responsive layout and modular SCSS
- Individual restaurant pages and cart support
- Global state managed via React Context

---

## Implementation

### Frontend Structure

- `App.tsx` wraps the app
- `Components/`: Reusable UI (e.g., `Item`, `Rating`)
- `Pages/`: Views like `Home`, `Menu`, `Product`
- `Containers/`: `Filter`, `Skeleton`, etc.
- Routing via `react-router-dom`
- State managed using custom context + reducer
- Strong typing via interfaces (`ItemProps`, `RatingProps`)

### Backend Details

- tRPC routes under `/api/trpc/restaurant.*`
- Prisma model:

```
model Restaurant {
  id           String   @id @default(uuid())
  name         String
  description  String
  category     String
  city         String
  priceRange   String
  rating       Float
  ratingCount  Int
  featuredText String?
  images       String[]
  isFavorite   Boolean  @default(false)
}

```

---

## Next Steps

- Add **authentication** (JWT) for user-based favorites
- Add **pagination** to `getRestaurants`
- Enhance **error handling** and add retry logic
- Improve **search** with debounce and server-side filtering
- Strengthen **accessibility** (ARIA, keyboard nav)
- Add **unit/integration tests** (Jest, RTL, tRPC)
- Introduce **dark mode**, **animations**, and **spacing audit**
- Expand DB schema (`reviews`, `menuItems`)
- Add **Redis caching** and a robust **Prisma seed script**
- **Apply `React.memo` and `useMemo` to prevent unnecessary re-renders in `Item` and `Rating`.**

---

## Setup

1. Clone repo
2. Run `npm install`
3. Configure `.env` for DB
4. Run `prisma migrate dev`
5. Start with `npm run dev`

---# coding_test_ui
