## CI

[![Playwright Tests](https://github.com/al1sh0ck/STsis1/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/<owner>/<repo>/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. It is built into GitHub, where the repository already lives, needs no server of its own, is free for public repositories, and supports matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):
- runs on every push and pull request;
- executes `npm ci` with npm caching and installs Chromium with system dependencies;
- splits the full Playwright test suite into 4 parallel shards (`--shard=i/4`);
- the `merge-reports` job merges the shards' blob reports into a single HTML report and JUnit XML file;
- artifacts: `playwright-report` (HTML), `test-results-N` (traces, screenshots, videos, JUnit), and `junit-report` are retained for 14 days.

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, reporters `list`, `blob`, `junit`, and `trace: 'on-first-retry'`.

### Runtime

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | X min Y s | X min Y s | [run](link_to_1_shard_run) |
| 4 shards + merge | X min Y s | X min Y s | [run](link_to_4_shards_run) |

*Median of 3 runs via `workflow_dispatch`. Conclusion: Splitting the test suite into 4 shards parallelizes execution across runners, reducing the actual test execution step duration (though total workflow time includes environment setup overhead for each shard).*

### Running locally

```bash
npm ci
npx playwright install --with-deps chromium
CI=true npx playwright test