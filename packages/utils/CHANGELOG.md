---
## 0.14.0 - 2026-08-06



### New features

#### utils

- Add v2alpha inventory endpoint ([MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633))

### Dependency updates


- Bump the development-dependencies group with 16 updates
- Bump the development-dependencies group across 1 directory with 22 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633) |

## @northern.tech/utils-0.13.0 - 2026-06-30



### New features

#### utils

- Reclassify dependencies as peers to reduce duplicate installations & related issues
## @northern.tech/utils-0.12.0 - 2026-06-23



### New features

#### utils

- Added rbac support for software releases & manifests endpoint

### Dependency updates


- Bump the production-dependencies group with 8 updates
- Bump the development-dependencies group across 1 directory with 9 updates
## @northern.tech/utils-0.11.1 - 2026-06-04



### Bug fixes

#### utils

- Switched to react-router instead of react-router-dom

### Dependency updates


- Bump the development-dependencies group with 11 updates
- Bump the production-dependencies group across 1 directory with 23 updates
## @northern.tech/utils-0.11.0 - 2026-05-27



### New features

#### utils

- Added support for uniform + device count based deployment phase definitions
- Added support for uniform deployments delay conversion to ui consumable units

### Dependency updates


- Bump the production-dependencies group with 18 updates
- Bump the development-dependencies group across 1 directory with 15 updates
## @northern.tech/utils-0.10.0 - 2026-04-22



### New features

#### utils

- Added support for nested attributes on custom attributes sorter
## @northern.tech/utils-0.9.0 - 2026-04-21



### New features

#### utils

- Added support for feature preview endpoints
## @northern.tech/utils-0.8.4 - 2026-04-15



### Bug fixes

#### utils

- Fixed circular dependencies to ensure tsdown compatibility
- Aligned pagination, sort + issue options w/ expanded usage across the codebase

- Migrated package bundling to tsdown

### Dependency updates


- Bump the production-dependencies group across 1 directory with 16 updates
- Bump the development-dependencies group across 1 directory with 15 updates
## @northern.tech/utils-0.8.3 - 2026-04-01



### Bug fixes

#### utils

- Ensure package content ([QA-1039](https://northerntech.atlassian.net/browse/QA-1039))

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1039](https://northerntech.atlassian.net/browse/QA-1039) |

## @northern.tech/utils-0.8.2 - 2026-03-31



### Bug fixes

#### utils

- Ensured package content
## @northern.tech/utils-0.8.1 - 2026-03-31



### Bug fixes

#### utils

- Removed leftover reporting reference that could disturb gui selectors
## @northern.tech/utils-0.8.0 - 2026-03-14



### Bug fixes

#### store

- Ensured all filtering options have a readable title ([MEN-9485](https://northerntech.atlassian.net/browse/MEN-9485))
#### utils

- Made use of generated attribute scope definitions

### Dependency updates


- Bump the production-dependencies group with 13 updates
- Bump the development-dependencies group across 1 directory with 11 updates
- Bump the production-dependencies group across 1 directory with 22 updates
- Bump the production-dependencies group with 16 updates
- Bump the development-dependencies group with 9 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9485](https://northerntech.atlassian.net/browse/MEN-9485) |

## @northern.tech/utils-0.7.2 - 2025-11-04



### Bug fixes

#### utils

- Increased compatibility w/ vitest hooks as they require named functions

### Dependency updates


- Bump the development-dependencies group with 12 updates
- Bump the production-dependencies group across 1 directory with 14 updates
## @northern.tech/utils-0.7.1 - 2025-10-30



### Bug fixes

#### utils

- Ensured all filtering options have a readable title
## @northern.tech/utils-0.7.0 - 2025-10-16



### New features

#### utils

- Let utils rely on newer backend type definitions

### Dependency updates


- Bump the development-dependencies group with 16 updates
## @northern.tech/utils-0.6.3 - 2025-08-19



### Bug fixes

#### utils

- Unified api url access for multi api version services

### Dependency updates


- Bump the production-dependencies group across 1 directory with 16 updates
## @northern.tech/utils-0.6.2 - 2025-03-11



### Bug fixes

#### utils

- Fixed dateRangeToUnix function where start date was off by -1 day in some cases ([MEN-8150](https://northerntech.atlassian.net/browse/MEN-8150))

### Dependency updates


- Bump the production-dependencies group across 1 directory with 11 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8150](https://northerntech.atlassian.net/browse/MEN-8150) |

## @northern.tech/utils-0.6.1 - 2025-02-24



### Bug fixes

#### utils

- Fixed an issue that would prevent (not) finding software in an artifact without newer style software
## @northern.tech/utils-0.6.0 - 2025-02-14



### New features

#### utils

- Added more types & enabled type checking

### Bug fixes

#### utils

- Aligned with Mender state to keep Mender only utils in product codebase

- Re-expanded react version ranges
## @northern.tech/utils-0.5.0 - 2025-02-05



### New features

#### utils,store

- Moved store focused utils to store package

### Dependency updates


- Bump the production-dependencies group across 1 directory with 18 updates
## @northern.tech/utils-0.4.1 - 2024-12-16



### Bug fixes

#### utils

- Added dayjs to dependencies
- Set explicit extension on dayjs utc plugin import
## @northern.tech/utils-0.4.0 - 2024-12-13



### New features

#### utils

- Added dateRangeToUnix function to helpers
## @northern.tech/utils-0.3.0 - 2024-12-10



### New features


- Made packages work with mender build + most tests

### Dependency updates


- Bump tsup
- Bump the production-dependencies group across 1 directory with 17 updates
## @northern.tech/utils-0.1.4 - 2024-11-15



### Bug fixes


- Aligned compile targets & platform for relevant packages
## @northern.tech/utils-0.1.3 - 2024-11-14



### Bug fixes


- Extended bundling config to achieve a populated dist folder
## @northern.tech/utils-0.1.2 - 2024-11-06



### Bug fixes


- Added missing license to utils & root packages
## @northern.tech/utils-0.1.1 - 2024-11-06



### Bug fixes

#### utils

- Marked utils as public package to allow npmjs publishing

- Allowed more flexible dependency versions
## @northern.tech/utils-0.1.0 - 2024-11-05



### New features


- Basic repository setup ([ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150))

---
### All tickets resolved in this release

| Ticket |
|---|
| [ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150) |

---
