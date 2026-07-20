---
## 0.15.1 - 2026-07-20



### Bug fixes

#### testing

- Openapi spec update
- Return empty pending email state ([MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251) |

## @northern.tech/testing-0.15.0 - 2026-07-13



### New features

#### testing

- Added new email change handlers in msw ([MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950))

### Bug fixes

#### testing

- Openapi spec update
- Adjusted email endpoint

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950) |

## @northern.tech/testing-0.14.1 - 2026-07-09



### Bug fixes

#### testing

- Fixed deployment retries value type in the msw

### Dependency updates


- Bump the production-dependencies group across 1 directory with 9 updates
- Bump @mui/material in the mui group across 1 directory
## @northern.tech/testing-0.14.0 - 2026-06-30



### New features

#### testing

- Reclassify dependencies as peers to reduce duplicate installations & related issues

### Bug fixes

#### testing

- Openapi spec update

### Dependency updates


- Bump js-yaml from 5.0.0 to 5.1.0
## @northern.tech/testing-0.13.3 - 2026-06-23



### Bug fixes

#### testing

- Openapi spec update
- Added rbac support for software releases & manifests endpoint

### Dependency updates


- Bump js-yaml from 4.2.0 to 5.0.0
## @northern.tech/testing-0.13.2 - 2026-06-15



### Bug fixes

#### testing

- Account for added wait for modal transitions to run after recent mui update
- Openapi spec update
- Added compatible types to software mock

### Dependency updates


- Bump the production-dependencies group with 8 updates
- Bump the development-dependencies group across 1 directory with 9 updates
## @northern.tech/testing-0.13.1 - 2026-06-04



### Bug fixes

#### testing

- Added support for tags in software retrieval
- Switched to name_prefix in software retrieval
- Simplified version info to only rely on server repo tag if available
- Openapi spec update
- Switched to react-router instead of react-router-dom

### Dependency updates


- Bump the development-dependencies group with 11 updates
## @northern.tech/testing-0.13.0 - 2026-05-27



### New features

#### testing

- Added support for tag based manifest filtering

### Bug fixes

#### testing

- Openapi spec update
## @northern.tech/testing-0.12.1 - 2026-05-20



### Bug fixes

#### testing

- Openapi spec update
- Added OAuth linking endpoint mock ([MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205))

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205) |

## @northern.tech/testing-0.12.0 - 2026-05-19



### New features

#### testing

- Added support for software list retrieval
- Added oauth linking support
- Added manifest manipulation support

### Bug fixes

#### testing

- Openapi spec update
- Allowed getting multiple software items by name
## @northern.tech/testing-0.11.0 - 2026-05-13



### New features

#### testing

- Extended support for manifest & software request handling
- Added support for uniform phase deployment processing

### Bug fixes

#### testing

- Openapi spec update

### Dependency updates


- Bump the production-dependencies group with 18 updates
- Bump the development-dependencies group across 1 directory with 15 updates
## @northern.tech/testing-0.10.1 - 2026-04-23



### Bug fixes

#### testing

- Openapi spec update
- Updated Mui to v9
## @northern.tech/testing-0.10.0 - 2026-04-21



### New features

#### testing

- Added manifest mock data handling to allow redux based testing

### Bug fixes

#### testing

- Openapi spec update
## @northern.tech/testing-0.9.1 - 2026-04-17



### Bug fixes

#### testing

- Used named import for OpenAPIBackend to fix ESM interop
## @northern.tech/testing-0.9.0 - 2026-04-17



### New features

#### testing

- Added validation script to enforce spec compliance in msw handlers ([QA-1539](https://northerntech.atlassian.net/browse/QA-1539))

### Bug fixes

#### testing

- Openapi spec update

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1539](https://northerntech.atlassian.net/browse/QA-1539) |

## @northern.tech/testing-0.8.4 - 2026-04-15



### Bug fixes

#### testing

- Openapi spec update
- Fixed ts errors to enable type checked usage

- Migrated package bundling to tsdown
## @northern.tech/testing-0.8.3 - 2026-04-01



### Bug fixes

#### testing

- Ensure package content ([QA-1039](https://northerntech.atlassian.net/browse/QA-1039))

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1039](https://northerntech.atlassian.net/browse/QA-1039) |

## @northern.tech/testing-0.8.2 - 2026-03-31



### Bug fixes

#### testing

- Ensured package content
## @northern.tech/testing-0.8.1 - 2026-03-31



### Bug fixes

#### testing

- Ensured non-reporting utils package gets used in testing package
## @northern.tech/testing-0.8.0 - 2026-03-05



### Bug fixes

#### testing

- Added tiers support to sp tenant
## @northern.tech/testing-0.7.1 - 2026-02-18



### Bug fixes

#### testing

- Let deployments search rely on non-deprecated endpoint
## @northern.tech/testing-0.7.0 - 2026-02-10



### Bug fixes

#### testing

- Products mock
## @northern.tech/testing-0.6.0 - 2026-02-02



### New features

#### testing

- Added rendering helper to ease url state mocking

### Bug fixes

#### testing

- Aligned provided abortcontroller w/  functionality expected by jsdom
## @northern.tech/testing-0.5.1 - 2026-01-23



### Bug fixes

#### testing

- Aligned faulty update type mock w/ api response reality
## @northern.tech/testing-0.5.0 - 2026-01-12



### Bug fixes

#### testing

- Adjusted invoice preview mock response ([MEN-8878](https://northerntech.atlassian.net/browse/MEN-8878))

### Dependency updates


- Bump the development-dependencies group across 1 directory with 11 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8878](https://northerntech.atlassian.net/browse/MEN-8878) |

## @northern.tech/testing-0.4.0 - 2025-12-15



### New features

#### store

- Made use of combined device counts endpoint & adjusted related tracking state
## @northern.tech/testing-0.3.0 - 2025-12-01



### New features

#### testing

- Added support for tiered device limits
## @northern.tech/testing-0.2.3 - 2025-11-04



### Bug fixes

#### testing

- Align time mock handling w/ vitest + rtl recommendations by providing proper `beforeEach` util

### Dependency updates


- Bump the production-dependencies group across 1 directory with 14 updates
## @northern.tech/testing-0.2.2 - 2025-10-02



### Bug fixes

#### testing

- Aligned MSW handlers w/ store & current Mender
## @northern.tech/testing-0.2.1 - 2025-08-24



### Bug fixes

#### testing

- Synced msw handlers with current mender
## @northern.tech/testing-0.2.0 - 2025-08-22



### New features

#### testing

- Also handle user existence checking
## @northern.tech/testing-0.1.0 - 2025-08-14



### New features

#### testing

- Added testing package ([MEN-8006](https://northerntech.atlassian.net/browse/MEN-8006))

### Bug fixes


- Relaxed package dependencies to ease updates in dependent projects

### Dependency updates


- Bump the development-dependencies group across 1 directory with 9 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8006](https://northerntech.atlassian.net/browse/MEN-8006) |

---
