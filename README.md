# Cookie Clicker Gift Code Generator

[![CI](https://github.com/jacobjordan94/cookie-clicker-gift-code-generator/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jacobjordan94/cookie-clicker-gift-code-generator/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Try it live →](https://cookie-clicker-gift-code-generator.jacob-jordan.me/)**

A web app for creating [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) gift codes. Choose how many cookies to send (1–1000), write an optional note, pick a box design, and copy the code it generates.

To redeem a code, paste it into Cookie Clicker's "Redeem a gift" option. Like the game, codes expire after a day or two, so generate a new one rather than reusing an old one.

## How the codes work

A gift code is this string, encoded as UTF-8 and then Base64:

```
MAIL|<timestamp>|<cookies>|<box design>|<message>|
```

| Field        | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| `timestamp`  | When the gift was created, in milliseconds since 1970 (`Date.now()`)                 |
| `cookies`    | Whole number from 1 to 1000                                                          |
| `box design` | Position of the box's icon in the game's sprite sheet, as `column row` (e.g. `34 6`) |
| `message`    | Up to 4 lines of 25 characters each; any `\|` is replaced with `/$/`                 |

The encoding code is in [`src/utils/encode.ts`](src/utils/encode.ts).

## Development

Built with React, TypeScript, Vite and Tailwind CSS.

```sh
npm install
npm run dev            # start the dev server (shows type and lint errors as you work)
npm run build          # type-check and build into dist/
npm run preview        # serve the built app
npm test               # run the tests once
npm run test:watch     # re-run the tests on every change
npm run lint           # run oxlint
npm run format         # format all files with Prettier
npm run format:check   # check formatting without changing anything
```

Every push to `main` and every pull request runs lint, the format check, the tests and the build on GitHub Actions.

## Project layout

```
src/
  App.tsx              holds the app's state and lays out the window
  components/          cookie amount, message, box picker, gift code output
  utils/encode.ts      builds the gift code
  utils/message.ts     enforces the note's 4-line, 25-characters-per-line limit
  utils/cookies.ts     turns the cookie input into a whole number from 1 to 1000
  index.css            styles that copy the game's look
public/                images taken from the game (sprite sheet, frame, backgrounds)
```

Tests sit next to the code they test, as `*.test.ts`.

## Deployment

The app is hosted on Cloudflare Pages at [cookie-clicker-gift-code-generator.jacob-jordan.me](https://cookie-clicker-gift-code-generator.jacob-jordan.me/). Every push to `main` deploys automatically, and other branches get their own preview addresses. Pages builds straight from the repository with these settings:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |

Cloudflare reads the Node.js version from `.node-version`.

## Disclaimer

This is a fan-made tool and isn't affiliated with Orteil or DashNet. The images in `public/` come from Cookie Clicker and belong to their creators.

## License

The source code is available under the [MIT License](LICENSE). The license doesn't cover the Cookie Clicker images in `public/` (see [Disclaimer](#disclaimer)).
