# AI Usage Appendix

## Model Used

* **Model:** Gemini 3 Flash (Google)
* **Purpose:** Task breakdown, step-by-step action planning, terminal troubleshooting, and README formatting.

## Summary of Usage

In accordance with the assignment guidelines, an AI assistant was used as a planning, reference, and formatting tool while implementing the CI pipeline for Playwright tests.

Specifically, the full assignment text was provided to the model with a request to outline a clear, step-by-step execution plan. The configuration files (`playwright.config.ts`, `merge.config.ts`, and `.github/workflows/playwright.yml`) were taken from the official assignment guide templates and adapted to the repository's structure. The AI assistant helped clarify the migration requirement from Python to TypeScript, troubleshoot local execution commands in Windows PowerShell, and format the final CI documentation section in `README.md`.

## Prompts Used

1. **Initial Planning & Step-by-Step Guide:**
   > *"Provide a full breakdown of what needs to be done and give a step-by-step action plan based on the assignment instructions. Also clarify whether existing Python tests need to be migrated to TypeScript and recommend topics to study."*

2. **Environment & Command Troubleshooting:**
   > *"Clarify the syntax for setting the `CI=true` environment variable in Windows PowerShell when running Playwright tests locally."*

3. **Documentation & README Formatting:**
   > *"Provide a clean English template for the CI section in `README.md` including the status badge, pipeline overview, runtime comparison table, and local execution commands."*

## Verification & Adaptation

All guide templates, migrated TypeScript tests, and documentation updates were configured, verified locally, and tested via actual GitHub Actions workflow runs in the repository.