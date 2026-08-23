# Playwright Demo

A small repository for learning end-to-end testing with [Playwright](https://playwright.dev/).
The example test uses Chromium to exercise a simple YouTube search workflow.

## Prerequisites

- Node.js 18 or newer
- npm
- Internet access, because the example test runs against YouTube

## Setup

Install the project dependencies:

```bash
npm install
```

Install the Chromium browser used by the configured Playwright project:

```bash
npx playwright install chromium
```

## Run the tests

Run the complete test suite:

```bash
npx playwright test
```

Run the tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

## Example workflow

The test in `tests/example.spec.ts` runs serially and:

1. Opens YouTube and verifies that the page title contains “YouTube”.
2. Searches for “Spiderman Trailer” and verifies the search URL.
3. Clicks the first video result and verifies that a watch page opens.

The suite shares one browser page between these steps so that each step continues
from the state created by the previous one.

## Test reports

The Playwright HTML reporter is enabled in `playwright.config.ts`. After a test run,
open the report with:

```bash
npx playwright show-report
```

## Project structure

```text
.
├── tests/
│   └── example.spec.ts       # Example end-to-end test
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project metadata and dependencies
└── playwright-report/        # Generated HTML report
```

## Notes

- The test depends on YouTube's current page structure, selectors, and availability,
	so it may need maintenance if YouTube changes.
- Only the Chromium project is enabled currently. Firefox, WebKit, mobile devices,
	and Microsoft Edge are present as commented configuration examples.
- The generated `playwright-report/` and `test-results/` directories are created by
	Playwright and should not be edited manually.