---
## 0.9.0 - 2026-07-20



### New features

#### common-ui

- Reclassify dependencies as peers to reduce duplicate installations & related issues

### Bug fixes

#### common-ui

- Fixed circular dependencies to ensure tsdown compatibility
- Ensured mui 9 compatibility
- Switched to react-router instead of react-router-dom
#### testing

- Fixed ts errors to enable type checked usage

- Migrated package bundling to tsdown

### Dependency updates


- Bump the production-dependencies group with 13 updates
- Bump the development-dependencies group across 1 directory with 11 updates
- Bump the production-dependencies group across 1 directory with 22 updates
- Bump the production-dependencies group with 16 updates
- Bump the development-dependencies group with 9 updates
- Bump the production-dependencies group across 1 directory with 16 updates
- Bump the development-dependencies group across 1 directory with 15 updates
- Bump the production-dependencies group with 18 updates
- Bump the mui group across 1 directory with 4 updates
- Bump the development-dependencies group with 11 updates
- Bump the production-dependencies group across 1 directory with 23 updates
- Bump @mui/x-date-pickers in the mui group across 1 directory
- Bump the production-dependencies group with 8 updates
- Bump the development-dependencies group across 1 directory with 9 updates
- Bump the development-dependencies group with 16 updates
- Bump @mui/material in the mui group across 1 directory
## @northern.tech/common-ui-0.8.2 - 2025-12-01



### Bug fixes

#### common-ui

- Aligned expected id attribute type w/ current Mender reality
## @northern.tech/common-ui-0.8.1 - 2025-11-12



### Bug fixes

#### common-ui

- Fix pagination not re-rendering when only count changes ([ENT-13500](https://northerntech.atlassian.net/browse/ENT-13500))

### Dependency updates


- Bump the development-dependencies group with 12 updates
- Bump the production-dependencies group across 1 directory with 14 updates

---
### All tickets resolved in this release

| Ticket |
|---|
| [ENT-13500](https://northerntech.atlassian.net/browse/ENT-13500) |

## @northern.tech/common-ui-0.8.0 - 2025-10-16



### New features

#### common-ui

- Added own variant of copy to clipboard to avoid dependency decay

### Bug fixes

#### common-ui

- Made use of custom copy to clipboard implementation
- Aligned w/ current Mender codebase
- Aligned pagination appearance closer w/ updated design

### Dependency updates


- Bump the development-dependencies group with 16 updates
- Bump the production-dependencies group across 1 directory with 16 updates
## @northern.tech/common-ui-0.6.1 - 2025-08-22



### Bug fixes

#### store

- Fixed imports of esm unfriendly packages
## @northern.tech/common-ui-0.6.0 - 2025-08-14



### New features

#### common-ui

- Removed mender specific components
#### store

- Made use of types package instead

### Improvements

#### store,common-ui

- Switched package internal imports to relative locations - to remove path mapping differences in vitest vs. tsup

### Bug fixes

#### common

- Added missing date picker dependency

### Dependency updates


- Bump the mui group across 1 directory with 4 updates
- Bump the development-dependencies group across 1 directory with 9 updates
## @northern.tech/common-ui-0.5.1 - 2025-05-27



### Dependency updates


- Bump the development-dependencies group across 1 directory with 16 updates
- Bump the production-dependencies group across 1 directory with 16 updates
## @northern.tech/common-ui-0.5.0 - 2025-03-11



### New features

#### common-ui

- Added more stories for some common components

### Bug fixes

#### common-ui

- Layout adjustments to re-align UI after switch to outlined inputs
- Aligned alert severity with (not) usage

- Re-expanded react version ranges

### Dependency updates


- Bump the development-dependencies group across 1 directory with 14 updates
- Bump the production-dependencies group across 1 directory with 11 updates
## @northern.tech/common-ui-0.3.1 - 2025-01-31



### Dependency updates


- Bump the development-dependencies group across 1 directory with 12 updates
- Bump the production-dependencies group across 1 directory with 17 updates
- Bump the production-dependencies group across 1 directory with 18 updates
## @northern.tech/common-ui-0.3.0 - 2024-12-10



### New features

#### common-ui

- Made TimeframePicker component format and labels configurable
- Added slotProps and fallbackValue props to the TimeframePicker component

- Included helptips in common components to improve encapsulation
- Made packages work with mender build + most tests
## @northern.tech/common-ui-0.1.2 - 2024-11-15



### Bug fixes


- Aligned compile targets & platform for relevant packages
## @northern.tech/common-ui-0.1.1 - 2024-11-14



### Bug fixes


- Extended bundling config to achieve a populated dist folder
## @northern.tech/common-ui-0.1.0 - 2024-11-14



### New features

#### common-ui

- Added lib level access to common components

- Added unified details drawer title component
- Extended import options for component packages
- Aligned peer dependency version requirements with broader set in the other packages
---
