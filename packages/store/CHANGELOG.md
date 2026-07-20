---
## 0.41.2 - 2026-07-15



### Bug fixes

#### store

- Filter test device count by accepted devices ([MEN-9959](https://northerntech.atlassian.net/browse/MEN-9959))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9959](https://northerntech.atlassian.net/browse/MEN-9959) |
## @northern.tech/store-0.41.1 - 2026-07-13



### Bug fixes

#### store

- Adjusted email endpoint## @northern.tech/store-0.41.0 - 2026-07-13



### New features

#### store

- Added new email change endpoints ([MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950) |
## @northern.tech/store-0.40.0 - 2026-07-09



### New features

#### store

- Added incompatible tier to deployment substates ([MEN-9631](https://northerntech.atlassian.net/browse/MEN-9631))

### Bug fixes

#### store

- Aligned deployment mock with types

### Dependency updates


- Bump the development-dependencies group with 16 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9631](https://northerntech.atlassian.net/browse/MEN-9631) |
## @northern.tech/store-0.39.0 - 2026-06-30



### New features

#### store

- Reclassify dependencies as peers to reduce duplicate installations & related issues

### Bug fixes

#### store

- Reconsider device offline state based on most recently updated backend value ([MEN-9906](https://northerntech.atlassian.net/browse/MEN-9906))
- Give clearer feedback when device limits are reached during auth set change attempts ([MEN-9595](https://northerntech.atlassian.net/browse/MEN-9595))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9906](https://northerntech.atlassian.net/browse/MEN-9906) |
| [MEN-9595](https://northerntech.atlassian.net/browse/MEN-9595) |
## @northern.tech/store-0.38.0 - 2026-06-25



### New features

#### store

- Added a pure software fetch thunk ([MEN-9212](https://northerntech.atlassian.net/browse/MEN-9212))

### Improvements

#### store

- Removed notification handling on group creation & defer to application to handle it ([MEN-9872](https://northerntech.atlassian.net/browse/MEN-9872))
- Let device thunks filenames reflect absence of react components

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9872](https://northerntech.atlassian.net/browse/MEN-9872) |
| [MEN-9212](https://northerntech.atlassian.net/browse/MEN-9212) |
## @northern.tech/store-0.37.0 - 2026-06-23



### New features

#### store

- Added test device flag support ([MEN-9584](https://northerntech.atlassian.net/browse/MEN-9584))

### Bug fixes

#### store

- Guard deployment name decoding against invalid escapes ([ME-682](https://northerntech.atlassian.net/browse/ME-682))
- Fixed version information indirection that prevented new version info from getting shown

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-682](https://northerntech.atlassian.net/browse/ME-682) |
| [MEN-9584](https://northerntech.atlassian.net/browse/MEN-9584) |
## @northern.tech/store-0.36.3 - 2026-06-15



### Improvements

#### gui

- Unified delayed data refresh pattern

### Bug fixes

#### store

- Provide a better context for software & manifest retrieval failures ([MEN-9853](https://northerntech.atlassian.net/browse/MEN-9853))
- Fixed an issue that prevented showing device distribution information w/ multiple groups ([MEN-9856](https://northerntech.atlassian.net/browse/MEN-9856))
- Retrieve manifest tag list more frequently to have newly added tags reflected w/o reload ([MEN-9849](https://northerntech.atlassian.net/browse/MEN-9849))
- Retrieve release tag list on release changes to reflected new tags w/o reload

### Dependency updates


- Bump the production-dependencies group with 8 updates
- Bump the development-dependencies group across 1 directory with 9 updates
- Bump the mui group across 1 directory with 4 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9853](https://northerntech.atlassian.net/browse/MEN-9853) |
| [MEN-9856](https://northerntech.atlassian.net/browse/MEN-9856) |
| [MEN-9849](https://northerntech.atlassian.net/browse/MEN-9849) |
## @northern.tech/store-0.36.2 - 2026-06-04



### Bug fixes

#### store

- Simplified version info to only rely on server repo tag if available
- Switched to react-router instead of react-router-dom

### Dependency updates


- Bump the development-dependencies group with 11 updates
- Bump the production-dependencies group across 1 directory with 23 updates## @northern.tech/store-0.36.1 - 2026-05-28



### Bug fixes

#### store

- Switched to name_prefix in software retrieval## @northern.tech/store-0.36.0 - 2026-05-28



### New features

#### store

- Added a way to check for release existence to prevent misleading links in manifests ([MEN-9669](https://northerntech.atlassian.net/browse/MEN-9669))

### Bug fixes

#### store

- Added support for tags, kind and type filtering for software thunk

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9669](https://northerntech.atlassian.net/browse/MEN-9669) |
## @northern.tech/store-0.35.0 - 2026-05-27



### New features

#### store

- Added support for uniform deployment phase definition history ([MEN-9001](https://northerntech.atlassian.net/browse/MEN-9001))
- Added support for tag based manifest filtering ([MEN-9560](https://northerntech.atlassian.net/browse/MEN-9560))

### Bug fixes

#### store

- Wait for timeout before resolving
- Pass undefined when empty string passed to software endpoint
- Let external device integrations get refreshed on integration removal as well

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9001](https://northerntech.atlassian.net/browse/MEN-9001) |
| [MEN-9560](https://northerntech.atlassian.net/browse/MEN-9560) |
## @northern.tech/store-0.34.0 - 2026-05-20



### New features

#### store

- Let default deployment retries setting no longer be defined on deployment creation ([MEN-8723](https://northerntech.atlassian.net/browse/MEN-8723))
- Added OAuth linking endpoint ([MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8723](https://northerntech.atlassian.net/browse/MEN-8723) |
| [MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205) |
## @northern.tech/store-0.33.0 - 2026-05-19



### New features

#### store

- Added support for software list retrieval
- Added support for manifest meta data manipulation

### Improvements

#### store

- Optimized existence focused selectors to avoid single software processing

### Bug fixes

#### store

- Propagate the error message when uploading manifest file## @northern.tech/store-0.32.0 - 2026-05-13



### New features

#### store

- Extended support for manifest handling
- Added initial support for software based artifact handling
- Added support for uniform phase deployment processing

### Bug fixes

#### store

- Ensured mui 9 compatibility
- Ensured software tags handling is done consistently

### Dependency updates


- Bump the production-dependencies group with 18 updates
- Bump the development-dependencies group across 1 directory with 15 updates
- Bump the mui group across 1 directory with 4 updates## @northern.tech/store-0.31.0 - 2026-04-21



### New features

#### store

- Added support for manifest artifacts ([MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411))
- Added manifest benefit information to show for plan nudges ([MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411))

### Improvements

#### store

- Let tab handling reflect changed release page focus

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411) |
## @northern.tech/store-0.30.2 - 2026-04-17



### Bug fixes

#### store

- Cleaned up sent properties in thunks and tests ([QA-1539](https://northerntech.atlassian.net/browse/QA-1539))

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1539](https://northerntech.atlassian.net/browse/QA-1539) |
## @northern.tech/store-0.30.1 - 2026-04-15



### Improvements

#### store

- Made store init slightly more redux thunk compliant
- Made some more thunks rely on async structure + clear value returns

### Bug fixes

#### store

- Fixed faulty serialization check exemption
- Fixed faulty type export type annotation
- Extended store type coverage to ease store root type coverage

- Migrated package bundling to tsdown

### Dependency updates


- Bump the production-dependencies group across 1 directory with 16 updates
- Bump the development-dependencies group across 1 directory with 15 updates## @northern.tech/store-0.30.0 - 2026-03-30



### New features

#### store

- Allow easier caller access of retrieved artifact url w/o relying on store processing## @northern.tech/store-0.29.0 - 2026-03-20



### New features

#### store

- Let artifacts, releases & manifests share an understandable path ([MEN-9413](https://northerntech.atlassian.net/browse/MEN-9413))

### Improvements

#### store

- Removed reliance on jwt content to detect potential session token info deviation

### Bug fixes

#### store

- Added ai log analysis timeout override to support slow analysis

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9413](https://northerntech.atlassian.net/browse/MEN-9413) |
## @northern.tech/store-0.28.0 - 2026-03-12



### New features

#### store

- Added a selector for enabled tiers ([MEN-9465](https://northerntech.atlassian.net/browse/MEN-9465))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9465](https://northerntech.atlassian.net/browse/MEN-9465) |
## @northern.tech/store-0.27.0 - 2026-03-12



### New features

#### store

- Let device/release selections no longer persist when navigating to a new page ([MEN-9293](https://northerntech.atlassian.net/browse/MEN-9293))
- Added `artifact_too_big` to deployment substates ([MEN-9456](https://northerntech.atlassian.net/browse/MEN-9456))

### Bug fixes

#### store

- Fixed a 2fa nudge issue for oauth users ([MEN-9417](https://northerntech.atlassian.net/browse/MEN-9417))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9417](https://northerntech.atlassian.net/browse/MEN-9417) |
| [MEN-9293](https://northerntech.atlassian.net/browse/MEN-9293) |
| [MEN-9456](https://northerntech.atlassian.net/browse/MEN-9456) |
## @northern.tech/store-0.26.1 - 2026-03-10



### Bug fixes

#### store

- Fixed tenant creation endpoint ([MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880) |
## @northern.tech/store-0.26.0 - 2026-03-09



### New features

#### store

- Propagated the email verification error to UI ([MEN-9260](https://northerntech.atlassian.net/browse/MEN-9260))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9260](https://northerntech.atlassian.net/browse/MEN-9260) |
## @northern.tech/store-0.25.0 - 2026-03-09



### New features

#### store

- Allowed deployments search to find devices using configured id attribute too## @northern.tech/store-0.24.1 - 2026-03-06



### Bug fixes


- Moved edit limits request transformation to store utils ([MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880) |
## @northern.tech/store-0.24.0 - 2026-03-05



### New features

#### store

- Added tiers support to sp tenant## @northern.tech/store-0.23.0 - 2026-03-02



### New features

#### store

- Added support for orchestrator manifests feature flag ([MEN-9399](https://northerntech.atlassian.net/browse/MEN-9399))

### Bug fixes

#### store

- Ensured successful email activation is cleaned up after ([MEN-9419](https://northerntech.atlassian.net/browse/MEN-9419))

### Dependency updates


- Bump the development-dependencies group with 9 updates
- Bump the production-dependencies group with 13 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9399](https://northerntech.atlassian.net/browse/MEN-9399) |
| [MEN-9419](https://northerntech.atlassian.net/browse/MEN-9419) |
## @northern.tech/store-0.22.0 - 2026-02-18



### Breaking changes

- *(store)* Let deployments search rely on non-deprecated endpoint

### New features

#### store

- Added dynamic group fetching thunk ([ME-550](https://northerntech.atlassian.net/browse/ME-550))

### Bug fixes

#### store

- Removed mender client links ([QA-1468](https://northerntech.atlassian.net/browse/QA-1468))
- Fixed the order of the plans when parsing products

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-550](https://northerntech.atlassian.net/browse/ME-550) |
| [QA-1468](https://northerntech.atlassian.net/browse/QA-1468) |
## @northern.tech/store-0.21.0 - 2026-02-10



### New features

#### store

- Added product retrieval and parsing ([MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277))
- Updated subscription preview parsing to support per-tier addons ([MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277))

### Bug fixes

#### store

- Let subscription page handle products retrieval to prevent erroneous on-prem requests

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277) |
## @northern.tech/store-0.19.2 - 2026-02-02



### Bug fixes

#### store

- Remove reports when associated group is removed
- Updated the add-ons description ([MEN-9275](https://northerntech.atlassian.net/browse/MEN-9275))
- Handle the empty reports case
- Aligned auditlogs hint visibility to correct plan

### Dependency updates


- Bump the production-dependencies group with 16 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9275](https://northerntech.atlassian.net/browse/MEN-9275) |
## @northern.tech/store-0.19.1 - 2026-01-27



### Bug fixes

#### store

- Fixed an issue that would require re-login when relying on sso in some situations ([ME-365](https://northerntech.atlassian.net/browse/ME-365))

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-365](https://northerntech.atlassian.net/browse/ME-365) |
## @northern.tech/store-0.18.0 - 2026-01-23



### New features

#### store

- Allowed finer grained navigation event handling

### Bug fixes

#### store

- Aligned faulty update type mock w/ api response reality## @northern.tech/store-0.17.0 - 2026-01-21



### New features

#### store

- Added security alert dismission timestamp ([MEN-9095](https://northerntech.atlassian.net/browse/MEN-9095))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9095](https://northerntech.atlassian.net/browse/MEN-9095) |
## @northern.tech/store-0.16.0 - 2026-01-15



### New features

#### store

- Added support for feature flag to revert new theme
- Added device limit stats selector ([MEN-8882](https://northerntech.atlassian.net/browse/MEN-8882))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8882](https://northerntech.atlassian.net/browse/MEN-8882) |
## @northern.tech/store-0.14.0 - 2026-01-08



### New features

#### store

- Added feature flag for MCU ([MEN-9205](https://northerntech.atlassian.net/browse/MEN-9205))

### Dependency updates


- Bump the development-dependencies group across 1 directory with 11 updates
- Bump the production-dependencies group across 1 directory with 22 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9205](https://northerntech.atlassian.net/browse/MEN-9205) |
## @northern.tech/store-0.13.0 - 2025-12-15



### New features

#### store

- Made slice types available consistently
- Made use of combined device counts endpoint & adjusted related tracking state## @northern.tech/store-0.12.0 - 2025-12-08



### New features

#### store

- Added firstLoginTimestamp for feedback form delay ([MEN-8896](https://northerntech.atlassian.net/browse/MEN-8896))

### Bug fixes

#### store

- Do not encode empty msgpack fixmap on close

### Dependency updates


- Bump the production-dependencies group with 13 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8896](https://northerntech.atlassian.net/browse/MEN-8896) |
## @northern.tech/store-0.11.0 - 2025-12-02



### New features

#### store

- Added support for tiered device limits
- Added mcu onboarding support ([MEN-8583](https://northerntech.atlassian.net/browse/MEN-8583))

### Bug fixes

#### store

- Ensured initialization skips enterprise/ hosted information when on os only
- Let device limits only be considered if they are set

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8583](https://northerntech.atlassian.net/browse/MEN-8583) |
## @northern.tech/store-0.9.0 - 2025-11-04



### New features

#### store

- Let store rely on newer backend type definitions

### Bug fixes

#### store

- Aligned chinese Mender deployment location w/ reality
- Rectified user setting selector confusion w/ global settings to align w/ Mender
- Aligned type usage w/ updated backend specs
- Adopted reintroduced delta job related types
- Fixed an issue that prevented getting detailed delta gen information
- Fixed an issue that prevented updating sso settings for existing configs
- Removed duplicated yes function to ease vitest usage

### Dependency updates


- Bump the development-dependencies group with 12 updates
- Bump the production-dependencies group across 1 directory with 14 updates## @northern.tech/store-0.5.3 - 2025-10-02



### Bug fixes

#### store

- Aligned store interactions w/ current Mender

### Dependency updates


- Bump the development-dependencies group with 16 updates
- Bump the production-dependencies group across 1 directory with 16 updates## @northern.tech/store-0.5.2 - 2025-08-26



### Bug fixes

#### store

- Aligned store w/ mender to remove demo features
- Aligned snackbar open state automation w/ mender## @northern.tech/store-0.5.1 - 2025-08-24



### Bug fixes

#### store

- Aligned license report location w/ mender
- Additional adjustment for esm compatibility## @northern.tech/store-0.5.0 - 2025-08-22



### New features

#### store

- Added email existence checking thunk to centralize msw handling

### Bug fixes

#### store

- Fixed imports of esm unfriendly packages
- Removed country flags as their exported ref was not usable externally
- Synced app state selectors w/ mender## @northern.tech/store-0.4.0 - 2025-08-14



### New features

#### store

- Made use of types package instead
- Colocated mock data with slices they correspond to
#### types

- Added base types package meant for nt-gui internal use

### Improvements

#### store,common-ui

- Switched package internal imports to relative locations - to remove path mapping differences in vitest vs. tsup

### Dependency updates


- Bump the production-dependencies group across 1 directory with 11 updates
- Bump the production-dependencies group across 1 directory with 16 updates
- Bump the mui group across 1 directory with 4 updates## @northern.tech/store-0.3.4 - 2025-02-14



### New features

#### utils,store

- Moved store focused utils to store package

### Bug fixes

#### common,store

- Fixed references to now moved utility functions
#### store

- Aligned onboarding handling with removed onboardingmanager
- Aligned dependencies with referenced packages
- Aligned sorting behaviour with type expectation & single sorting function

- Re-expanded react version ranges## @northern.tech/store-0.3.3 - 2025-01-31



### Bug fixes

#### store

- Removed reliance on test config in package code
- Added missing type for device data retrieval

### Dependency updates


- Bump the production-dependencies group across 1 directory with 18 updates## @northern.tech/store-0.3.2 - 2024-12-13



### Bug fixes

#### store

- Fixed end date filters out today's entries in the Audit log and Devices## @northern.tech/store-0.3.1 - 2024-12-10



### Bug fixes


- Aligned helptips location after migration to common-ui
- Fixed linter setup after dependency updates & removed now unused override

### Dependency updates


- Bump the production-dependencies group across 1 directory with 17 updates## @northern.tech/store-0.3.0 - 2024-12-10



### New features


- Made packages work with mender build + most tests

### Bug fixes

#### store

- Fixed an issue that caused version information to be parsed wrong
- Reintroduced locations definition to allow build to pass## @northern.tech/store-0.2.1 - 2024-11-15



### Bug fixes


- Aligned compile targets & platform for relevant packages
- Fixed store package export## @northern.tech/store-0.2.0 - 2024-11-15



### New features


- Aligned store code with mender-server repository## @northern.tech/store-0.1.3 - 2024-11-15



### Bug fixes

#### store

- Fixed type generation issue bypassing type only files## @northern.tech/store-0.1.1 - 2024-11-06



### Bug fixes


- Allowed more flexible dependency versions## @northern.tech/store-0.1.0 - 2024-11-05



### New features


- Basic repository setup ([ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150))

---
### All tickets resolved in this release

| Ticket |
|---|
| [ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150) |
---
