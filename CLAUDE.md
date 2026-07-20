# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

This project uses **pnpm** (pnpm-lock.yaml, pnpm-workspace.yaml) — prefer `pnpm` over `npm`/`yarn`.

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — ESLint (flat config in eslint.config.mjs, extends `eslint-config-next/core-web-vitals`)

There is no test runner configured in this repo.

## Architecture

Next.js App Router app (Next 16.2.6, React 19) that renders NYC crime data on an interactive map using deck.gl over MapLibre.

### Path aliases and entry point

- `@/*` maps to the repo root (see jsconfig.json), so `@/Components/...`, `@/utils/...`, `@/helpers/...` resolve from the top level, not from `app/`.
- `app/page.js` decides which top-level view renders; the active one is `app/(home)/CrimeNYC.js`. `Main.js`, `Test.js`, `NewFilterTest.js` (in `app/(home)/`) and `Components/ViewMapWithMarker.js` are earlier/alternate map experiments left in the tree for reference — not part of the live render path.

### Map rendering stack

- Base map chrome (`Map`, `Source`, `Layer`, `NavigationControl`, `Popup`, `Marker`) comes from `@vis.gl/react-maplibre`.
- Data layers are plain deck.gl layer instances (`ScatterplotLayer`, `HeatmapLayer`, `HexagonLayer`, etc.), not JSX — they're built in the component body and handed to a local `DeckGLOverlay` helper that wraps `MapboxOverlay` (`@deck.gl/mapbox`) via `useControl`. Toggling a layer means adding/removing its instance from a `mapLayersState` array (see `handleLayerPick` in `app/(home)/components/ControlPanel.js`).
- CSV point data (`public/NYC_crime_01.csv`) is read directly by deck.gl layers through `@loaders.gl/csv`'s `CSVLoader` — there is no separate fetch/parse step.
- Category filtering (Felony/Misdemeanor/Violation, see `app/(home)/enums/crime.enums.js`) uses deck.gl's `DataFilterExtension` with a `filterCategories` array kept in state, rather than filtering the dataset in JS.
- `utils/baseMaps.js` centralizes basemap style URLs (Carto, ArcGIS, ICGC, MapLibre demo) used to populate the basemap picker in `ControlPanel`.

### Component conventions

- `Components/inputs/` holds base/unstyled form controls (checkbox, radio, dropdown, progress bar/range); `Components/formik/` wraps those for use as Formik `<Field component={...}>`s, adapting `field`/`form` props to the base component's plain `value`/`onChange`.
- `BaseCheckbox` (`Components/inputs/BaseCheckbox.js`) is multi-purpose: pass `isSwitch` for a toggle switch, `options` for a multi-value checkbox group, or neither for a plain single checkbox.
- Class merging goes through `tailwind-merge`'s `twMerge` wherever a component accepts a `className`-style override prop.

### Known quirk

- `polyfill.js` (imported once from `app/layout.js`) shims `ReactDOM.findDOMNode`, which `@material-tailwind/react` (used in `Components/inputs/ProgressInput.js` / `ProgressRangeInput.js`) still calls despite it being removed from React 19.
