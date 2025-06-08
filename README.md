[![Deploy static content to Pages](https://github.com/qualityshepherd/tappr/actions/workflows/deploy2pages.yml/badge.svg)](https://github.com/qualityshepherd/tappr/actions/workflows/deploy2pages.yml)
# tappr

Minimal E2E test runner using [Tape](https://github.com/substack/tape) and [Puppeteer](https://www.npmjs.com/package/puppeteer) — easy to grok, easy to extend, hard to outgrow.

## Features
- Powered by Tape and Puppeteer
- Simple CLI: `tappr`
- `--headless`, `--headed`, and `--slomo` flags
- Glob-based test discovery — use any file structure
- Minimal wrapper with clear, hackable test DSL (`t.goto`, `t.click`, etc.)
- Easily extensible or swappable
- Should run with Jest, uvu, etc... assuming the runner supports async tests and passes a test object (t) or similar.
- No globals, no magic, no framework lock-in

## Install
- `npm install --save-dev tappr`

## Usage
- npx tappr [options] <glob-patterns>
- eg. `npx tappr --headed --slomo=100 test/**/*.test.js`

## CLI Options
- `--headless` (default) run tests in headless mode
- `--headed` run with visible browser
- `--slomo=N` slow motion mode in ms per action (e.g. `--slomo=250`)

## Extend
The easiest way is just throw `/lib/tappr.js` into your project and edit to taste. Then import it into your tests. Add functionality as you go!

Slightly harder way: fork it and install into your project.

## Writing Tests
Use Tape (or another runner) as usual and wrap your test with tappr thusly:
```javascript
import test from 'tape'
import { tappr } from '../lib/tappr.js'

const site = 'https://example.com'

test('homepage loads', tappr(async t => {
  await t.goto(site)
  t.ok(await t.exists('h1'))
}))
```
