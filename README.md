# nt-gui

Shared library of UI components across Northern.tech projects

## Local development

A local package repository (yalc) can be used to sync changes between this library and consumer applications (e.g., `mender-server`) without publishing to a remote registry.

#### 1. Install yalc
`npm install -g yalc` or `npm install -g @jimsheen/yalc`

#### 2. In the Library Repository
* **Publish All:** Run `npm run yalc:publish` from the root to build all packages and add them to the local store.
* **Active Development:** Run `npm run dev` within a specific package directory. This starts a watcher that automatically builds and pushes updates to the local store and any linked consumers. NOTE: dts generation is disabled in dev mode to reduce RAM consumption.

#### 3. In the Consumer Application (e.g., mender-server)
* **Link Packages:** Use `yalc add @northern.tech/{package_name}` to point the application to your local build. In `mender-server`, it’s possible to add all packages using `npm run yalc:init`
* **Restore NPM Versions:** Run `yalc remove --all` followed by `npm install` to revert to the official published packages.

> **⚠️ Warning:** `yalc add` modifies your `package.json` with local file paths. **Do not commit these changes** to the repository.