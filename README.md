## CI

[![Playwright Tests](https://github.com/al1sh0ck/STsis1/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/al1sh0ck/STsis1/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. It is built into GitHub, where the repository already lives, needs no server of its own, is free for public repositories, and supports matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):
- runs on every push and pull request;
- executes `npm ci` with npm caching and installs Chromium with system dependencies;
- splits the full Playwright test suite into 4 parallel shards (`--shard=i/4`);
- the `merge-reports` job merges the shards' blob reports into a single HTML report and JUnit XML file;
- artifacts: `playwright-report` (HTML), `test-results-N` (traces, screenshots, videos, JUnit), and `junit-report` are retained for 14 days (or as configured in the workflow).

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, reporters `list`, `blob`, `junit`, and `trace: 'on-first-retry'`.

### Runtime

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | 35 sec | Not measured (job: 35 sec) | [Run](https://github.com/al1sh0ck/STsis1/actions/runs/44007687817) |
| 4 shards + merge | 1 min 22 sec | 1 min 5 sec | [Run](https://github.com/al1sh0ck/STsis1/actions/runs/44007147108) |

**Conclusion:** In the observed runs, the 4-shard configuration took longer overall (1 min 22 sec) than the no-sharding configuration (35 sec). Although sharding allows tests to execute in parallel across multiple runners, the overhead of starting multiple jobs, installing dependencies, and merging reports outweighed the parallelization benefit for this small test suite.

### Running locally

```bash
npm ci
npx playwright install --with-deps chromium
CI=true npx playwright test