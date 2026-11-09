# ERP Academy

A frontend-only learning platform for developers learning business and accounting. React, TypeScript, Vite, Tailwind CSS, shadcn-style UI primitives built on Radix, Lucide and React Router. No account, backend, API key or paid service is required.

## Develop

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Vite serves the app under `/Erp-academy/`. Use the existing checkout; each cloud task is already isolated and does not need a worktree.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

## What is included

Eight complete Accounting Fundamentals lessons, each with objectives, explanations, terminology, worked UK battery-distribution examples, workflows, ERP design implications, edge cases, a calculation exercise, a three-question quiz and a revision summary. Seven other subjects have expandable outlines marked upcoming. Includes a searchable glossary, responsive navigation, dark mode, local progress and JSON backup/restore.

A perfect lesson quiz records completion; opening a lesson only records it as started. Confidence status is separate from completion. Successful revision sessions advance through 1, 3, 7, 14 and 30-day intervals. A failed session resets the interval to one day. After five successful revision stages the topic is marked mastered, with continued 30-day reviews. Early practice also advances the schedule. Users may explicitly self-assess confidence without fabricating quiz completion.

Progress lives in localStorage. Export regularly in Settings: clearing browser data or switching browser/origin will not retain it. Imports are validated and replace current progress only after confirmation. No device sync exists. Storage access failures show a warning; use export if browser storage is unavailable.

## Deploy to GitHub Pages

1. Commit and push this project to the `main` branch of `lewisRotchell/Erp-academy`.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. The Deploy ERP Academy workflow runs checks, builds and publishes `dist`. It also supports manual dispatch.

The Vite base is `/Erp-academy/`, matching the case-sensitive repository name. HashRouter allows direct lesson links without server rewrites. If renaming the repository, update `base` in `vite.config.ts`. Publishing through GitHub Pages is separate from preparing this cloud environment.

## Architecture

- `data/courses`: typed educational content and outlines
- `components`: layout, learning UI and reusable quizzes
- `features`: courses, glossary, revision and progress screens
- `hooks/useProgress.tsx`: shared progress state and actions
- `lib/storage.ts`: replaceable progress repository, import validation and revision scheduling
- `types`: course and progress models

Replace `ProgressRepository` and add an asynchronous state/query layer when introducing a backend; lesson content and display components can remain independent. This version intentionally has no authentication or external database.

## Content scope

Examples are simplified educational scenarios, not professional accounting or tax advice. VAT uses the UK standard rate of 20% in the examples and explicitly distinguishes other treatments and schemes. Check current HMRC guidance for real transactions. ERP operational records and Xero’s authoritative accounting ledger have separate responsibilities; the lessons emphasise reconciliation, tax configuration and avoiding duplicate postings.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

If Chromium is already installed (as in this cloud environment), use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` instead of downloading a browser. Tests cover desktop and iPhone-sized viewports, lesson calculations and quiz completion, reload persistence, revision, glossary, upcoming content, navigation, themes and JSON backup/import.

If the default npm cache is not writable, use `npm ci --cache /workspace/.npm-cache` in the cloud environment.
