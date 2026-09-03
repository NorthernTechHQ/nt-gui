---
## 0.46.1 - 2026-09-03



### Bug fixes

#### store

- Cleanup user preference on logouts off all kinds ([460dcd7](https://github.com/NorthernTechHQ/nt-gui/commit/460dcd70a4292ae3dd182b649dda1611fcd853ff)) by @mzedel
## @northern.tech/store-0.46.0 - 2026-09-02



### New features

#### store

- Allow initial theme rendering depend on browser storage until server settings arrive ([f9c3b87](https://github.com/NorthernTechHQ/nt-gui/commit/f9c3b873723ed0d55f98c6d51783d524d917859e)) by @mzedel
- Made it possible to retrieve signed manifest download urls too ([MEN-10105](https://northerntech.atlassian.net/browse/MEN-10105)) ([371e7d9](https://github.com/NorthernTechHQ/nt-gui/commit/371e7d930543a3a2b71cd78a2ca6a7bc5a77360c)) by @mzedel

### Bug fixes

#### store

- Align deployment phase configuration tracking w/ updated ui ([2ae6144](https://github.com/NorthernTechHQ/nt-gui/commit/2ae6144a0aab4e1f40b23c87891301a0ee464f95)) by @mzedel
- Align manifest software attribute name w/ client reported value ([MEN-10075](https://northerntech.atlassian.net/browse/MEN-10075)) ([4764f19](https://github.com/NorthernTechHQ/nt-gui/commit/4764f19dbd4b810df324df663b0180dbb7699c52)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-10075](https://northerntech.atlassian.net/browse/MEN-10075) |
| [MEN-10105](https://northerntech.atlassian.net/browse/MEN-10105) |

## @northern.tech/store-0.45.1 - 2026-09-01



### Bug fixes

#### store

- Use reduce to enrich device data ([MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831)) ([adb84de](https://github.com/NorthernTechHQ/nt-gui/commit/adb84decf1d65373ede3f9b0973a8651789fa138)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831) |

## @northern.tech/store-0.45.0 - 2026-08-28



### New features

#### store

- Added a user-invitation endpoint ([MEN-9743](https://northerntech.atlassian.net/browse/MEN-9743)) ([ebaf053](https://github.com/NorthernTechHQ/nt-gui/commit/ebaf05377b8dc367cd94a98318416e06a75fe436)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9743](https://northerntech.atlassian.net/browse/MEN-9743) |

## @northern.tech/store-0.44.0 - 2026-08-25



### New features

#### store

- Added support for split organization info retrieval ([MEN-9580](https://northerntech.atlassian.net/browse/MEN-9580)) ([66a39a0](https://github.com/NorthernTechHQ/nt-gui/commit/66a39a0beed3a2347328d63eaa2879f6bfd8dab4)) by @mzedel
- Added search endpoint feature flag ([MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831)) ([b1fe7b3](https://github.com/NorthernTechHQ/nt-gui/commit/b1fe7b3d6391abc60c340eeb443ca41e1bcf32f9)) by @mineralsfree
- Add new device search endpoint thunk ([MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831)) ([54ecbae](https://github.com/NorthernTechHQ/nt-gui/commit/54ecbae2d2e2c4d56c4e649c503af0caef47306b)) by @mineralsfree

### Bug fixes

#### store

- Reject failed software tag updates ([MEN-9986](https://northerntech.atlassian.net/browse/MEN-9986)) ([838f063](https://github.com/NorthernTechHQ/nt-gui/commit/838f06390d602b5b34859080e5dd81214795d149)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9986](https://northerntech.atlassian.net/browse/MEN-9986) |
| [MEN-9580](https://northerntech.atlassian.net/browse/MEN-9580) |
| [MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831) |

## @northern.tech/store-0.43.0 - 2026-08-12



### New features

#### store

- Use per-tenant test device limits ([MEN-10015](https://northerntech.atlassian.net/browse/MEN-10015)) ([f019e65](https://github.com/NorthernTechHQ/nt-gui/commit/f019e6584aa235b7c2bd6d99925bf16ab679d8cb)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-10015](https://northerntech.atlassian.net/browse/MEN-10015) |

## @northern.tech/store-0.42.0 - 2026-08-06



### New features

#### store

- Add system components endpoint handling ([MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633)) ([3586ed1](https://github.com/NorthernTechHQ/nt-gui/commit/3586ed12ff828e6022803b93d031c15d7606d35a)) by @mineralsfree

### Bug fixes

#### store

- Only treat non-preview hosted domains as hosted ([3b71c51](https://github.com/NorthernTechHQ/nt-gui/commit/3b71c5175031c8c9fbacf83a04a5a53c62484ed1)) by @claude
- Detect on-prem enterprise by probing the organization endpoint ([6f4956f](https://github.com/NorthernTechHQ/nt-gui/commit/6f4956f37140fd3cf967d27508693e458c3b5a44)) by @claude
- Let os users see a stable dashboard instead of waiting for limit information ([7ed0cd3](https://github.com/NorthernTechHQ/nt-gui/commit/7ed0cd3f8b8c0411611e1c596f2c3fba75822341)) by @mzedel

### Dependency updates


- Bump the development-dependencies group across 1 directory with 22 updates ([e5d4f38](https://github.com/NorthernTechHQ/nt-gui/commit/e5d4f38771dd91cc6d04898af13d229f77125549)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633) |

## @northern.tech/store-0.41.3 - 2026-07-29



### Bug fixes

#### store

- Update the email pending email thunk test ([MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251)) ([66aa891](https://github.com/NorthernTechHQ/nt-gui/commit/66aa891696bcf34f844b9e1f428daa5249815df0)) by @mineralsfree
- Revert system scope URL handling ([MEN-9796](https://northerntech.atlassian.net/browse/MEN-9796)) ([3b33bf3](https://github.com/NorthernTechHQ/nt-gui/commit/3b33bf3c2e0c7d933d6a9e00f792696557b68dbe)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251) |
| [MEN-9796](https://northerntech.atlassian.net/browse/MEN-9796) |

## @northern.tech/store-0.41.2 - 2026-07-20



### New features

#### store

- Rename system attributes to default ([MEN-9796](https://northerntech.atlassian.net/browse/MEN-9796)) ([eda8170](https://github.com/NorthernTechHQ/nt-gui/commit/eda81702bc7de42ad0eb0b5c571dd2e69ce261d2)) by @mineralsfree

### Bug fixes

#### store

- Filter test device count by accepted devices ([MEN-9959](https://northerntech.atlassian.net/browse/MEN-9959)) ([d5ded3a](https://github.com/NorthernTechHQ/nt-gui/commit/d5ded3a7a62427bbdc481e2bc199aea961d69a61)) by @bahaa-ghazal
- Updated terminal message decoder dependency ([f2745dc](https://github.com/NorthernTechHQ/nt-gui/commit/f2745dc4c6d2dbe2385abac38e460d397916d558)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9959](https://northerntech.atlassian.net/browse/MEN-9959) |
| [MEN-9796](https://northerntech.atlassian.net/browse/MEN-9796) |

## @northern.tech/store-0.41.1 - 2026-07-13



### Bug fixes

#### store

- Adjusted email endpoint ([9f7e17d](https://github.com/NorthernTechHQ/nt-gui/commit/9f7e17d1e488d31d7f7d454873147d1581eef8f3)) by @mineralsfree
## @northern.tech/store-0.41.0 - 2026-07-13



### New features

#### store

- Added new email change endpoints ([MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950)) ([feda139](https://github.com/NorthernTechHQ/nt-gui/commit/feda139cc1eeab79fbf7490a66d4204c337eeb9e)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950) |

## @northern.tech/store-0.40.0 - 2026-07-09



### New features

#### store

- Added incompatible tier to deployment substates ([MEN-9631](https://northerntech.atlassian.net/browse/MEN-9631)) ([ce3e58b](https://github.com/NorthernTechHQ/nt-gui/commit/ce3e58b6ae9677dcebe4ae0d4a66ab9609753215)) by @mineralsfree

### Bug fixes

#### store

- Aligned deployment mock with types ([53577c1](https://github.com/NorthernTechHQ/nt-gui/commit/53577c1af9d1a02bbd7d4680484e4c0afab40b44)) by @mineralsfree

### Dependency updates


- Bump the development-dependencies group with 16 updates ([96c4c2a](https://github.com/NorthernTechHQ/nt-gui/commit/96c4c2af04e5cba047a90f54e9f78305acbe6ffb)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9631](https://northerntech.atlassian.net/browse/MEN-9631) |

## @northern.tech/store-0.39.0 - 2026-06-30



### New features

#### store

- Reclassify dependencies as peers to reduce duplicate installations & related issues ([e5938a4](https://github.com/NorthernTechHQ/nt-gui/commit/e5938a4e01335e5279bb5c3836602694ee01eb3e)) by @mzedel

### Bug fixes

#### store

- Reconsider device offline state based on most recently updated backend value ([MEN-9906](https://northerntech.atlassian.net/browse/MEN-9906)) ([0ac8588](https://github.com/NorthernTechHQ/nt-gui/commit/0ac8588a107b45b714981705f009d5882bf9961f)) by @mzedel
- Give clearer feedback when device limits are reached during auth set change attempts ([MEN-9595](https://northerntech.atlassian.net/browse/MEN-9595)) ([a3234bb](https://github.com/NorthernTechHQ/nt-gui/commit/a3234bb33161f4fe81574fded54add3264ceda23)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9906](https://northerntech.atlassian.net/browse/MEN-9906) |
| [MEN-9595](https://northerntech.atlassian.net/browse/MEN-9595) |

## @northern.tech/store-0.38.0 - 2026-06-25



### New features

#### store

- Added a pure software fetch thunk ([MEN-9212](https://northerntech.atlassian.net/browse/MEN-9212)) ([d8a5abc](https://github.com/NorthernTechHQ/nt-gui/commit/d8a5abc18d0b4bea140b5840d97cf20c9ed73f0b)) by @mineralsfree

### Improvements

#### store

- Removed notification handling on group creation & defer to application to handle it ([MEN-9872](https://northerntech.atlassian.net/browse/MEN-9872)) ([85b65b5](https://github.com/NorthernTechHQ/nt-gui/commit/85b65b58a410779677ad302d1505cc3dd3cb5f5e)) by @mzedel
- Let device thunks filenames reflect absence of react components ([eadc1a6](https://github.com/NorthernTechHQ/nt-gui/commit/eadc1a6f4781c1a1a827a41fbe767b06aa46c15c)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9872](https://northerntech.atlassian.net/browse/MEN-9872) |
| [MEN-9212](https://northerntech.atlassian.net/browse/MEN-9212) |

## @northern.tech/store-0.37.0 - 2026-06-23



### New features

#### store

- Added test device flag support ([MEN-9584](https://northerntech.atlassian.net/browse/MEN-9584)) ([5148f27](https://github.com/NorthernTechHQ/nt-gui/commit/5148f2724414be73a8b5b951967ff86d8d549766)) by @mineralsfree

### Bug fixes

#### store

- Guard deployment name decoding against invalid escapes ([ME-682](https://northerntech.atlassian.net/browse/ME-682)) ([13792a1](https://github.com/NorthernTechHQ/nt-gui/commit/13792a12ad8c5929553e9d4acddd6b28a838ddac)) by @nickanderson
- Fixed version information indirection that prevented new version info from getting shown ([1a7e4a6](https://github.com/NorthernTechHQ/nt-gui/commit/1a7e4a6f9db4bd2d1e8a9485acf1eb5b603a3a64)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-682](https://northerntech.atlassian.net/browse/ME-682) |
| [MEN-9584](https://northerntech.atlassian.net/browse/MEN-9584) |

## @northern.tech/store-0.36.3 - 2026-06-15



### Improvements

#### gui

- Unified delayed data refresh pattern ([18ce7e2](https://github.com/NorthernTechHQ/nt-gui/commit/18ce7e2335bfc214b782565e3873392ea178acf6)) by @mzedel

### Bug fixes

#### store

- Provide a better context for software & manifest retrieval failures ([MEN-9853](https://northerntech.atlassian.net/browse/MEN-9853)) ([2eb74de](https://github.com/NorthernTechHQ/nt-gui/commit/2eb74de14e1a19c8f489c52698ab6d84df1a2978)) by @mzedel
- Fixed an issue that prevented showing device distribution information w/ multiple groups ([MEN-9856](https://northerntech.atlassian.net/browse/MEN-9856)) ([6e1ee8b](https://github.com/NorthernTechHQ/nt-gui/commit/6e1ee8b964a146f5faffd4e73567089349ff35ff)) by @mzedel
- Retrieve manifest tag list more frequently to have newly added tags reflected w/o reload ([MEN-9849](https://northerntech.atlassian.net/browse/MEN-9849)) ([c8dd41b](https://github.com/NorthernTechHQ/nt-gui/commit/c8dd41bcacc32590163283b62208524dc8d69856)) by @mzedel
- Retrieve release tag list on release changes to reflected new tags w/o reload ([84eeb1a](https://github.com/NorthernTechHQ/nt-gui/commit/84eeb1a77b0a80aaa10d2cfd1ffda7d0a95d121b)) by @mzedel

### Dependency updates


- Bump the production-dependencies group with 8 updates ([59d90e3](https://github.com/NorthernTechHQ/nt-gui/commit/59d90e3e954d05414420091388acdf32be9cd6ef)) by @dependabot[bot]
- Bump the development-dependencies group across 1 directory with 9 updates ([a0df33c](https://github.com/NorthernTechHQ/nt-gui/commit/a0df33c9e16152e8e0d2acffd694012dacb2948a)) by @dependabot[bot]
- Bump the mui group across 1 directory with 4 updates ([81d31b9](https://github.com/NorthernTechHQ/nt-gui/commit/81d31b9d4900ef8f24f7c50d9a5ae61b9ced5205)) by @dependabot[bot]

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

- Simplified version info to only rely on server repo tag if available ([35b70d9](https://github.com/NorthernTechHQ/nt-gui/commit/35b70d981ef9be32dddb26942d05612611f83314)) by @mzedel
- Switched to react-router instead of react-router-dom ([0794900](https://github.com/NorthernTechHQ/nt-gui/commit/0794900afdc2e02402940d6b781c1b7bc1b700c6)) by @mineralsfree

### Dependency updates


- Bump the development-dependencies group with 11 updates ([bfa7337](https://github.com/NorthernTechHQ/nt-gui/commit/bfa7337d11ca6e9eb97638b881589f0df0f42ccb)) by @dependabot[bot]
- Bump the production-dependencies group across 1 directory with 23 updates ([9f4db3e](https://github.com/NorthernTechHQ/nt-gui/commit/9f4db3e60484d7e73dce369b9fdaaeb453fa4592)) by @dependabot[bot]
## @northern.tech/store-0.36.1 - 2026-05-28



### Bug fixes

#### store

- Switched to name_prefix in software retrieval ([c67940f](https://github.com/NorthernTechHQ/nt-gui/commit/c67940f9c0e80bcc73ec90979e8c496ea4953f08)) by @mineralsfree
## @northern.tech/store-0.36.0 - 2026-05-28



### New features

#### store

- Added a way to check for release existence to prevent misleading links in manifests ([MEN-9669](https://northerntech.atlassian.net/browse/MEN-9669)) ([030cfa7](https://github.com/NorthernTechHQ/nt-gui/commit/030cfa7676d468e828d7d829e983261d050516c1)) by @mzedel

### Bug fixes

#### store

- Added support for tags, kind and type filtering for software thunk ([a0756ac](https://github.com/NorthernTechHQ/nt-gui/commit/a0756acc610c5cadd91c81a4df0d7ad94c2284a8)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9669](https://northerntech.atlassian.net/browse/MEN-9669) |

## @northern.tech/store-0.35.0 - 2026-05-27



### New features

#### store

- Added support for uniform deployment phase definition history ([MEN-9001](https://northerntech.atlassian.net/browse/MEN-9001)) ([becd6a1](https://github.com/NorthernTechHQ/nt-gui/commit/becd6a18b5621d802701a651efbe0b368105948d)) by @mzedel
- Added support for tag based manifest filtering ([MEN-9560](https://northerntech.atlassian.net/browse/MEN-9560)) ([578016f](https://github.com/NorthernTechHQ/nt-gui/commit/578016fe4a551b16c532d599e073738f8b8a8bd9)) by @mzedel

### Bug fixes

#### store

- Wait for timeout before resolving ([97368f2](https://github.com/NorthernTechHQ/nt-gui/commit/97368f2b4ab65558ac64b998e592353fdab3e9a4)) by @mineralsfree
- Pass undefined when empty string passed to software endpoint ([dd604c9](https://github.com/NorthernTechHQ/nt-gui/commit/dd604c9a4d79569efc36ae55c8d8be613f167660)) by @mineralsfree
- Let external device integrations get refreshed on integration removal as well ([0ba6783](https://github.com/NorthernTechHQ/nt-gui/commit/0ba67839e74eb53a9a32b9badeadef4033e2a3ad)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9001](https://northerntech.atlassian.net/browse/MEN-9001) |
| [MEN-9560](https://northerntech.atlassian.net/browse/MEN-9560) |

## @northern.tech/store-0.34.0 - 2026-05-20



### New features

#### store

- Let default deployment retries setting no longer be defined on deployment creation ([MEN-8723](https://northerntech.atlassian.net/browse/MEN-8723)) ([7a02998](https://github.com/NorthernTechHQ/nt-gui/commit/7a029986ee8313613c663916442551f8a5ed623c)) by @mzedel
- Added OAuth linking endpoint ([MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205)) ([0095b24](https://github.com/NorthernTechHQ/nt-gui/commit/0095b243b7641ee855a4806d339d96ab2ea6ac69)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8723](https://northerntech.atlassian.net/browse/MEN-8723) |
| [MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205) |

## @northern.tech/store-0.33.0 - 2026-05-19



### New features

#### store

- Added support for software list retrieval ([7cf592b](https://github.com/NorthernTechHQ/nt-gui/commit/7cf592b11dd8ea6180a8ea10417f5b50661adfa0)) by @mzedel
- Added support for manifest meta data manipulation ([f1e687b](https://github.com/NorthernTechHQ/nt-gui/commit/f1e687bb9bcccabf4d92afd7965c44b43515e383)) by @mzedel

### Improvements

#### store

- Optimized existence focused selectors to avoid single software processing ([6ec9813](https://github.com/NorthernTechHQ/nt-gui/commit/6ec981321b147e738813e1902244405efa85cf61)) by @mzedel

### Bug fixes

#### store

- Propagate the error message when uploading manifest file ([236d1b9](https://github.com/NorthernTechHQ/nt-gui/commit/236d1b9119da86f4236a5069611a7a1e6cffb3ea)) by @mineralsfree
## @northern.tech/store-0.32.0 - 2026-05-13



### New features

#### store

- Extended support for manifest handling ([ea36d38](https://github.com/NorthernTechHQ/nt-gui/commit/ea36d380786aefc3099290a1a8b02ed68ce55934)) by @mzedel
- Added initial support for software based artifact handling ([e40200a](https://github.com/NorthernTechHQ/nt-gui/commit/e40200a48546d3954309445ce38bfc5ba2370c84)) by @mzedel
- Added support for uniform phase deployment processing ([af3aa60](https://github.com/NorthernTechHQ/nt-gui/commit/af3aa6004d873e80fc85466d720749b2de7a50dc)) by @mzedel

### Bug fixes

#### store

- Ensured mui 9 compatibility ([75e943d](https://github.com/NorthernTechHQ/nt-gui/commit/75e943d728723a27bc8b7eb375b690bd30daa69f)) by @mzedel
- Ensured software tags handling is done consistently ([9289ec7](https://github.com/NorthernTechHQ/nt-gui/commit/9289ec7c38e1ff4ffa83f588c7009be9e4955dea)) by @mzedel

### Dependency updates


- Bump the production-dependencies group with 18 updates ([57c9c86](https://github.com/NorthernTechHQ/nt-gui/commit/57c9c86cf97e594bd2924941091592828aaca051)) by @dependabot[bot]
- Bump the development-dependencies group across 1 directory with 15 updates ([6300680](https://github.com/NorthernTechHQ/nt-gui/commit/630068080fd9a2936344fc80d0536a5f08567ce2)) by @dependabot[bot]
- Bump the mui group across 1 directory with 4 updates ([6f2ce4f](https://github.com/NorthernTechHQ/nt-gui/commit/6f2ce4f4ebceddbe9cf57dde524a672f2b099399)) by @dependabot[bot]
## @northern.tech/store-0.31.0 - 2026-04-21



### New features

#### store

- Added support for manifest artifacts ([MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411)) ([ff6a544](https://github.com/NorthernTechHQ/nt-gui/commit/ff6a544ef23db6c6910c58de6d34f5fe29ed570f)) by @mzedel
- Added manifest benefit information to show for plan nudges ([MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411)) ([7142eb0](https://github.com/NorthernTechHQ/nt-gui/commit/7142eb084cca5412eda3d2951647c78ad11e2cde)) by @mzedel

### Improvements

#### store

- Let tab handling reflect changed release page focus ([2625c20](https://github.com/NorthernTechHQ/nt-gui/commit/2625c208f04eb306831e70d0c49dfb9a032ae212)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9411](https://northerntech.atlassian.net/browse/MEN-9411) |

## @northern.tech/store-0.30.2 - 2026-04-17



### Bug fixes

#### store

- Cleaned up sent properties in thunks and tests ([QA-1539](https://northerntech.atlassian.net/browse/QA-1539)) ([3d29ee4](https://github.com/NorthernTechHQ/nt-gui/commit/3d29ee4897abe2189d1b0bb121bf24e8c1fa5f86)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1539](https://northerntech.atlassian.net/browse/QA-1539) |

## @northern.tech/store-0.30.1 - 2026-04-15



### Improvements

#### store

- Made store init slightly more redux thunk compliant ([f26f7df](https://github.com/NorthernTechHQ/nt-gui/commit/f26f7dfdf1270967db75c14eafd60054fb3d6662)) by @mzedel
- Made some more thunks rely on async structure + clear value returns ([8d69a58](https://github.com/NorthernTechHQ/nt-gui/commit/8d69a58848990a9363741342bca540b50dc20cd1)) by @mzedel

### Bug fixes

#### store

- Fixed faulty serialization check exemption ([9f99800](https://github.com/NorthernTechHQ/nt-gui/commit/9f99800a77093ad9fe26434b6e1be0dd48a03939)) by @mzedel
- Fixed faulty type export type annotation ([27c2b24](https://github.com/NorthernTechHQ/nt-gui/commit/27c2b245df9e9521ea0e289f5ac9a36b6a19fd5c)) by @mzedel
- Extended store type coverage to ease store root type coverage ([7897282](https://github.com/NorthernTechHQ/nt-gui/commit/789728220a1d1c5b6cb8b4f3c2bb360c7a0811e7)) by @mzedel

- Migrated package bundling to tsdown ([400f54c](https://github.com/NorthernTechHQ/nt-gui/commit/400f54c686c6ea202e8de54f82c64ac5a1a0ac19)) by @mzedel

### Dependency updates


- Bump the production-dependencies group across 1 directory with 16 updates ([e126f19](https://github.com/NorthernTechHQ/nt-gui/commit/e126f19d588aad317860f8733ffa774d6754efef)) by @dependabot[bot]
- Bump the development-dependencies group across 1 directory with 15 updates ([1b2ee22](https://github.com/NorthernTechHQ/nt-gui/commit/1b2ee2265b28be505210079f0d755d05ef4b66f9)) by @dependabot[bot]
## @northern.tech/store-0.30.0 - 2026-03-30



### New features

#### store

- Allow easier caller access of retrieved artifact url w/o relying on store processing ([3b6a2de](https://github.com/NorthernTechHQ/nt-gui/commit/3b6a2dec496e878b2172eb9396835095c4564aac)) by @mzedel
## @northern.tech/store-0.29.0 - 2026-03-20



### New features

#### store

- Let artifacts, releases & manifests share an understandable path ([MEN-9413](https://northerntech.atlassian.net/browse/MEN-9413)) ([de7b474](https://github.com/NorthernTechHQ/nt-gui/commit/de7b474d9103847e1a94df4a6b61f8330ce1f272)) by @mzedel

### Improvements

#### store

- Removed reliance on jwt content to detect potential session token info deviation ([8226e79](https://github.com/NorthernTechHQ/nt-gui/commit/8226e7919322dd02d6e5d90955c2903ab43557fa)) by @mzedel

### Bug fixes

#### store

- Added ai log analysis timeout override to support slow analysis ([5e48da4](https://github.com/NorthernTechHQ/nt-gui/commit/5e48da426d9bdfd4c0a92e19c2b6f5190d2ca2d1)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9413](https://northerntech.atlassian.net/browse/MEN-9413) |

## @northern.tech/store-0.28.0 - 2026-03-12



### New features

#### store

- Added a selector for enabled tiers ([MEN-9465](https://northerntech.atlassian.net/browse/MEN-9465)) ([24cc1d6](https://github.com/NorthernTechHQ/nt-gui/commit/24cc1d614174b013f07a1fb009d3be0a07a9c11e)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9465](https://northerntech.atlassian.net/browse/MEN-9465) |

## @northern.tech/store-0.27.0 - 2026-03-12



### New features

#### store

- Let device/release selections no longer persist when navigating to a new page ([MEN-9293](https://northerntech.atlassian.net/browse/MEN-9293)) ([212aa7d](https://github.com/NorthernTechHQ/nt-gui/commit/212aa7dc74cffa601aadb7537fbfd703bd2dd76e)) by @mzedel
- Added `artifact_too_big` to deployment substates ([MEN-9456](https://northerntech.atlassian.net/browse/MEN-9456)) ([2655bd1](https://github.com/NorthernTechHQ/nt-gui/commit/2655bd193338852d51d733da94aa9f6daf295731)) by @frodeha

### Bug fixes

#### store

- Fixed a 2fa nudge issue for oauth users ([MEN-9417](https://northerntech.atlassian.net/browse/MEN-9417)) ([e48797b](https://github.com/NorthernTechHQ/nt-gui/commit/e48797b3e0e561700e9a9b3b15f79b37cb768513)) by @mineralsfree

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

- Fixed tenant creation endpoint ([MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880)) ([2b722f7](https://github.com/NorthernTechHQ/nt-gui/commit/2b722f78b66dcda4ea7c3515fa08c6efc21974aa)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880) |

## @northern.tech/store-0.26.0 - 2026-03-09



### New features

#### store

- Propagated the email verification error to UI ([MEN-9260](https://northerntech.atlassian.net/browse/MEN-9260)) ([01cd656](https://github.com/NorthernTechHQ/nt-gui/commit/01cd656c12c65cd6ae0ad7bcc8c6741d77aa3953)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9260](https://northerntech.atlassian.net/browse/MEN-9260) |

## @northern.tech/store-0.25.0 - 2026-03-09



### New features

#### store

- Allowed deployments search to find devices using configured id attribute too ([e79e858](https://github.com/NorthernTechHQ/nt-gui/commit/e79e85863d563ca72a292bcdf114eddca7e2fff1)) by @mzedel
## @northern.tech/store-0.24.1 - 2026-03-06



### Bug fixes


- Moved edit limits request transformation to store utils ([MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880)) ([a3ab84c](https://github.com/NorthernTechHQ/nt-gui/commit/a3ab84cd4d2fc19a1252a97e7099201ace0b1e0c)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8880](https://northerntech.atlassian.net/browse/MEN-8880) |

## @northern.tech/store-0.24.0 - 2026-03-05



### New features

#### store

- Added tiers support to sp tenant ([c4ee281](https://github.com/NorthernTechHQ/nt-gui/commit/c4ee28110f3bed770dc1c378295a074fc8b9964d)) by @mineralsfree
## @northern.tech/store-0.23.0 - 2026-03-02



### New features

#### store

- Added support for orchestrator manifests feature flag ([MEN-9399](https://northerntech.atlassian.net/browse/MEN-9399)) ([c084fce](https://github.com/NorthernTechHQ/nt-gui/commit/c084fce1b0acf947ad88ee33779a8184a324f821)) by @mzedel

### Bug fixes

#### store

- Ensured successful email activation is cleaned up after ([MEN-9419](https://northerntech.atlassian.net/browse/MEN-9419)) ([6562bdf](https://github.com/NorthernTechHQ/nt-gui/commit/6562bdf0896c254e10e91e5736b7713ac2f1a0a5)) by @mzedel

### Dependency updates


- Bump the development-dependencies group with 9 updates ([a762495](https://github.com/NorthernTechHQ/nt-gui/commit/a7624957a353f5fc4a2c026c23588a6c2dcc6af6)) by @dependabot[bot]
- Bump the production-dependencies group with 13 updates ([9003c82](https://github.com/NorthernTechHQ/nt-gui/commit/9003c820ce9589f466b7b3e672a7097e9df20918)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9399](https://northerntech.atlassian.net/browse/MEN-9399) |
| [MEN-9419](https://northerntech.atlassian.net/browse/MEN-9419) |

## @northern.tech/store-0.22.0 - 2026-02-18



### Breaking changes

- *(store)* Let deployments search rely on non-deprecated endpoint ([06dab26](https://github.com/NorthernTechHQ/nt-gui/commit/06dab26bde2a307f73439fa4ff16935dcc1d6c48)) by @mzedel

### New features

#### store

- Added dynamic group fetching thunk ([ME-550](https://northerntech.atlassian.net/browse/ME-550)) ([582bde8](https://github.com/NorthernTechHQ/nt-gui/commit/582bde89be5849f86ebcf052139081603f5d3043)) by @mineralsfree

### Bug fixes

#### store

- Removed mender client links ([QA-1468](https://northerntech.atlassian.net/browse/QA-1468)) ([2beda54](https://github.com/NorthernTechHQ/nt-gui/commit/2beda543ae4f0254b44ff7f7a0261abea5eb72d4)) by @mineralsfree
- Fixed the order of the plans when parsing products ([2474b35](https://github.com/NorthernTechHQ/nt-gui/commit/2474b35555f86c90e7a10799dbfe4adb38ede0bf)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-550](https://northerntech.atlassian.net/browse/ME-550) |
| [QA-1468](https://northerntech.atlassian.net/browse/QA-1468) |

## @northern.tech/store-0.21.0 - 2026-02-10



### New features

#### store

- Added product retrieval and parsing ([MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277)) ([62c5a6c](https://github.com/NorthernTechHQ/nt-gui/commit/62c5a6c0b59d37e86c481c305f6dd677a030aca2)) by @mineralsfree
- Updated subscription preview parsing to support per-tier addons ([MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277)) ([c798295](https://github.com/NorthernTechHQ/nt-gui/commit/c79829521585d9a812fc1e38ae15b09b48156908)) by @mineralsfree

### Bug fixes

#### store

- Let subscription page handle products retrieval to prevent erroneous on-prem requests ([a9e89ae](https://github.com/NorthernTechHQ/nt-gui/commit/a9e89ae3dca67163400756497f30fefb50daeab7)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9277](https://northerntech.atlassian.net/browse/MEN-9277) |

## @northern.tech/store-0.19.2 - 2026-02-02



### Bug fixes

#### store

- Remove reports when associated group is removed ([bbbc095](https://github.com/NorthernTechHQ/nt-gui/commit/bbbc0950318d3838be7d559268d0eac70b0d72da)) by @mineralsfree
- Updated the add-ons description ([MEN-9275](https://northerntech.atlassian.net/browse/MEN-9275)) ([f386747](https://github.com/NorthernTechHQ/nt-gui/commit/f3867474c7abd6cf433d30abedfef0e3e42bdb62)) by @mineralsfree
- Handle the empty reports case ([7c2b038](https://github.com/NorthernTechHQ/nt-gui/commit/7c2b0385d7c3a8ff3e05b76727bba15322ac96f3)) by @mineralsfree
- Aligned auditlogs hint visibility to correct plan ([4f5bd8f](https://github.com/NorthernTechHQ/nt-gui/commit/4f5bd8f4745f0215c1f0011e5f7bd6d6e1f0a904)) by @mzedel

### Dependency updates


- Bump the production-dependencies group with 16 updates ([fbddc2e](https://github.com/NorthernTechHQ/nt-gui/commit/fbddc2efe4114db78133d6ec8523f5c76203513d)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9275](https://northerntech.atlassian.net/browse/MEN-9275) |

## @northern.tech/store-0.19.1 - 2026-01-27



### Bug fixes

#### store

- Fixed an issue that would require re-login when relying on sso in some situations ([ME-365](https://northerntech.atlassian.net/browse/ME-365)) ([653f009](https://github.com/NorthernTechHQ/nt-gui/commit/653f00968941af9d508e7d44fa394789f30583f7)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [ME-365](https://northerntech.atlassian.net/browse/ME-365) |

## @northern.tech/store-0.18.0 - 2026-01-23



### New features

#### store

- Allowed finer grained navigation event handling ([77f32b1](https://github.com/NorthernTechHQ/nt-gui/commit/77f32b1460b9b69ab875f22bb7583c77fef2a4c0)) by @mzedel

### Bug fixes

#### store

- Aligned faulty update type mock w/ api response reality ([9de44da](https://github.com/NorthernTechHQ/nt-gui/commit/9de44dad6735a411c21fef7728c2cc00048bbf70)) by @mzedel
## @northern.tech/store-0.17.0 - 2026-01-21



### New features

#### store

- Added security alert dismission timestamp ([MEN-9095](https://northerntech.atlassian.net/browse/MEN-9095)) ([30abe5a](https://github.com/NorthernTechHQ/nt-gui/commit/30abe5ab61e2754919fc9ccb67503c7ad20a8f72)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9095](https://northerntech.atlassian.net/browse/MEN-9095) |

## @northern.tech/store-0.16.0 - 2026-01-15



### New features

#### store

- Added support for feature flag to revert new theme ([49e43a2](https://github.com/NorthernTechHQ/nt-gui/commit/49e43a25e2226798fbb29be3350de154d0565509)) by @mzedel
- Added device limit stats selector ([MEN-8882](https://northerntech.atlassian.net/browse/MEN-8882)) ([ec730e5](https://github.com/NorthernTechHQ/nt-gui/commit/ec730e5b389da6edb2f9213eaeb372f4c2847382)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8882](https://northerntech.atlassian.net/browse/MEN-8882) |

## @northern.tech/store-0.14.0 - 2026-01-08



### New features

#### store

- Added feature flag for MCU ([MEN-9205](https://northerntech.atlassian.net/browse/MEN-9205)) ([5a66d7e](https://github.com/NorthernTechHQ/nt-gui/commit/5a66d7e18690c4048b785a57af86f9bdd5fa1a9e)) by @mineralsfree

### Dependency updates


- Bump the development-dependencies group across 1 directory with 11 updates ([1f7d179](https://github.com/NorthernTechHQ/nt-gui/commit/1f7d1796e187d123c3bb7e70d6c30ceeb5d2b8f2)) by @dependabot[bot]
- Bump the production-dependencies group across 1 directory with 22 updates ([1b8ff80](https://github.com/NorthernTechHQ/nt-gui/commit/1b8ff80f1cf4cc55c53e93fe9762fd13483bc121)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9205](https://northerntech.atlassian.net/browse/MEN-9205) |

## @northern.tech/store-0.13.0 - 2025-12-15



### New features

#### store

- Made slice types available consistently ([77c506e](https://github.com/NorthernTechHQ/nt-gui/commit/77c506ea6f6b536c5ed243d7ab2b82ff0489626f)) by @mzedel
- Made use of combined device counts endpoint & adjusted related tracking state ([4d0bb34](https://github.com/NorthernTechHQ/nt-gui/commit/4d0bb34af23d726019e4b7d906701c9bc2b60c60)) by @mzedel
## @northern.tech/store-0.12.0 - 2025-12-08



### New features

#### store

- Added firstLoginTimestamp for feedback form delay ([MEN-8896](https://northerntech.atlassian.net/browse/MEN-8896)) ([00d2612](https://github.com/NorthernTechHQ/nt-gui/commit/00d26124d4774a94b1dfd3a9f56c104e5feb0083)) by @mineralsfree

### Bug fixes

#### store

- Do not encode empty msgpack fixmap on close ([8349f07](https://github.com/NorthernTechHQ/nt-gui/commit/8349f07784f29e40d57dcd0f17ec26c31b490ff4)) by @alfrunes

### Dependency updates


- Bump the production-dependencies group with 13 updates ([2974d94](https://github.com/NorthernTechHQ/nt-gui/commit/2974d9490fb03757039994db7667f3e252be0144)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8896](https://northerntech.atlassian.net/browse/MEN-8896) |

## @northern.tech/store-0.11.0 - 2025-12-02



### New features

#### store

- Added support for tiered device limits ([97eb3bb](https://github.com/NorthernTechHQ/nt-gui/commit/97eb3bb8b37b9270dd411a003cbb6fd761701d4b)) by @mzedel
- Added mcu onboarding support ([MEN-8583](https://northerntech.atlassian.net/browse/MEN-8583)) ([7b5f6f0](https://github.com/NorthernTechHQ/nt-gui/commit/7b5f6f0021f21f4465f416da87157e42e23e356b)) by @mineralsfree

### Bug fixes

#### store

- Ensured initialization skips enterprise/ hosted information when on os only ([e66e3a9](https://github.com/NorthernTechHQ/nt-gui/commit/e66e3a9d20f1ff5b23bbe345226495db51c0b976)) by @mzedel
- Let device limits only be considered if they are set ([f3c381f](https://github.com/NorthernTechHQ/nt-gui/commit/f3c381f88f2831b72456fd1ea6e51d33baeed7ff)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8583](https://northerntech.atlassian.net/browse/MEN-8583) |

## @northern.tech/store-0.9.0 - 2025-11-04



### New features

#### store

- Let store rely on newer backend type definitions ([5ade1e1](https://github.com/NorthernTechHQ/nt-gui/commit/5ade1e12697c5edf61b205f1720761e586596a88)) by @mzedel

### Bug fixes

#### store

- Aligned chinese Mender deployment location w/ reality ([0cc8161](https://github.com/NorthernTechHQ/nt-gui/commit/0cc81618bfb41e4ad8c9bfbe1205949b24edde7e)) by @mzedel
- Rectified user setting selector confusion w/ global settings to align w/ Mender ([bca8f1a](https://github.com/NorthernTechHQ/nt-gui/commit/bca8f1aca73218c0ff3820027b306eb42a1172f8)) by @mzedel
- Aligned type usage w/ updated backend specs ([3af8a38](https://github.com/NorthernTechHQ/nt-gui/commit/3af8a3869041defac33d6651729537fd438cc109)) by @mzedel
- Adopted reintroduced delta job related types ([8722498](https://github.com/NorthernTechHQ/nt-gui/commit/8722498acca64d4771980cd78f308e2d04a2d627)) by @mzedel
- Fixed an issue that prevented getting detailed delta gen information ([093f711](https://github.com/NorthernTechHQ/nt-gui/commit/093f7119cf2d4322adfc2d352f7a90876ef78241)) by @mzedel
- Fixed an issue that prevented updating sso settings for existing configs ([5d2b9e3](https://github.com/NorthernTechHQ/nt-gui/commit/5d2b9e33c0744a8e88cdefa4d05f985f6c7783e5)) by @mzedel
- Removed duplicated yes function to ease vitest usage ([6b31671](https://github.com/NorthernTechHQ/nt-gui/commit/6b316712000a879b5bc9db8207eb464ceb722a16)) by @mzedel

### Dependency updates


- Bump the development-dependencies group with 12 updates ([3df6050](https://github.com/NorthernTechHQ/nt-gui/commit/3df6050827d57ee2957a78ea1ee609b5a1afa734)) by @dependabot[bot]
- Bump the production-dependencies group across 1 directory with 14 updates ([9669175](https://github.com/NorthernTechHQ/nt-gui/commit/96691756e8cb9785b170c9e7c2e94daa218b16b2)) by @dependabot[bot]
## @northern.tech/store-0.5.3 - 2025-10-02



### Bug fixes

#### store

- Aligned store interactions w/ current Mender ([3a27287](https://github.com/NorthernTechHQ/nt-gui/commit/3a27287df37b8935cefaf89a8f50a1a1c10d0e2f)) by @mzedel

### Dependency updates


- Bump the development-dependencies group with 16 updates ([f3ef7b1](https://github.com/NorthernTechHQ/nt-gui/commit/f3ef7b14ba1b7f5e427f23e434bd914cec024f42)) by @dependabot[bot]
- Bump the production-dependencies group across 1 directory with 16 updates ([d6290f9](https://github.com/NorthernTechHQ/nt-gui/commit/d6290f9f8dcf01354b9604e415937064fe4a900f)) by @dependabot[bot]
## @northern.tech/store-0.5.2 - 2025-08-26



### Bug fixes

#### store

- Aligned store w/ mender to remove demo features ([81512d2](https://github.com/NorthernTechHQ/nt-gui/commit/81512d2925cce055d1f8fc4fc66877824b1372a1)) by @mzedel
- Aligned snackbar open state automation w/ mender ([a78beaa](https://github.com/NorthernTechHQ/nt-gui/commit/a78beaade61972a836c03b47b79510b14e4b5d77)) by @mzedel
## @northern.tech/store-0.5.1 - 2025-08-24



### Bug fixes

#### store

- Aligned license report location w/ mender ([294b140](https://github.com/NorthernTechHQ/nt-gui/commit/294b14054fa97cdb80a4d7d15759f6223aa177f2)) by @mzedel
- Additional adjustment for esm compatibility ([3808f01](https://github.com/NorthernTechHQ/nt-gui/commit/3808f01e4a8c379e63a599a74c92ffa08e56ead4)) by @mzedel
## @northern.tech/store-0.5.0 - 2025-08-22



### New features

#### store

- Added email existence checking thunk to centralize msw handling ([a587361](https://github.com/NorthernTechHQ/nt-gui/commit/a5873617f28bf2f29c48dcc176f676d01d3e168f)) by @mzedel

### Bug fixes

#### store

- Fixed imports of esm unfriendly packages ([d52a3d7](https://github.com/NorthernTechHQ/nt-gui/commit/d52a3d7dae5199b83f0e73dd3a6c10cf30118bb3)) by @mzedel
- Removed country flags as their exported ref was not usable externally ([4a12781](https://github.com/NorthernTechHQ/nt-gui/commit/4a12781e8e02efb1f465c5f7034789058c3ab927)) by @mzedel
- Synced app state selectors w/ mender ([eff0a98](https://github.com/NorthernTechHQ/nt-gui/commit/eff0a98e1a72029cf8f7872682d6c9957d486f91)) by @mzedel
## @northern.tech/store-0.4.0 - 2025-08-14



### New features

#### store

- Made use of types package instead ([2474698](https://github.com/NorthernTechHQ/nt-gui/commit/2474698b27b9c61a0201e4ee2671a39b5305339e)) by @mzedel
- Colocated mock data with slices they correspond to ([5f452c4](https://github.com/NorthernTechHQ/nt-gui/commit/5f452c423bb7a6c6565ab89bdea68ef445c951f6)) by @mzedel
#### types

- Added base types package meant for nt-gui internal use ([b8f8282](https://github.com/NorthernTechHQ/nt-gui/commit/b8f8282552de39dc291a9d03b0281d984a2d0067)) by @mzedel

### Improvements

#### store,common-ui

- Switched package internal imports to relative locations - to remove path mapping differences in vitest vs. tsup ([38f6fd8](https://github.com/NorthernTechHQ/nt-gui/commit/38f6fd8fc6b72caaf03f87bf2e7e9a9167aca6f0)) by @mzedel

### Dependency updates


- Bump the production-dependencies group across 1 directory with 11 updates ([6e0ab6d](https://github.com/NorthernTechHQ/nt-gui/commit/6e0ab6d7d682a4eca899c8a46e1d09c58b8dd3ab)) by @dependabot[bot]
- Bump the production-dependencies group across 1 directory with 16 updates ([67c7713](https://github.com/NorthernTechHQ/nt-gui/commit/67c7713079ecebc2bcd2975eda336fe73572053d)) by @dependabot[bot]
- Bump the mui group across 1 directory with 4 updates ([38d63b0](https://github.com/NorthernTechHQ/nt-gui/commit/38d63b0546735d52e7ec04dd1a69c0d0068829be)) by @dependabot[bot]
## @northern.tech/store-0.3.4 - 2025-02-14



### New features

#### utils,store

- Moved store focused utils to store package ([9a98222](https://github.com/NorthernTechHQ/nt-gui/commit/9a982226b1668632bcbb6be382bb4b2ce8d8fe14)) by @mzedel

### Bug fixes

#### common,store

- Fixed references to now moved utility functions ([73e9f33](https://github.com/NorthernTechHQ/nt-gui/commit/73e9f33d77c0c5773f05b3f0344d8f7350c62e8f)) by @mzedel
#### store

- Aligned onboarding handling with removed onboardingmanager ([cf5ea53](https://github.com/NorthernTechHQ/nt-gui/commit/cf5ea5339e88f3767c25358221f52060941363e4)) by @mzedel
- Aligned dependencies with referenced packages ([182dedd](https://github.com/NorthernTechHQ/nt-gui/commit/182dedd8a4a1f81ed4f22bf9e345bc0e4f73cc2d)) by @mzedel
- Aligned sorting behaviour with type expectation & single sorting function ([f9d71d4](https://github.com/NorthernTechHQ/nt-gui/commit/f9d71d411907d3ba0106c2c7da4a6f46e5ac2cb0)) by @mzedel

- Re-expanded react version ranges ([d966fdd](https://github.com/NorthernTechHQ/nt-gui/commit/d966fdde1d54b373fbcb289da0a89275cd6139b1)) by @mzedel
## @northern.tech/store-0.3.3 - 2025-01-31



### Bug fixes

#### store

- Removed reliance on test config in package code ([106415a](https://github.com/NorthernTechHQ/nt-gui/commit/106415a590755e8400ba2b8a99069032fd6f6bcb)) by @mzedel
- Added missing type for device data retrieval ([3b33c43](https://github.com/NorthernTechHQ/nt-gui/commit/3b33c4380f6cf47688452319ef0bf88554179eef)) by @mzedel

### Dependency updates


- Bump the production-dependencies group across 1 directory with 18 updates ([9ac55be](https://github.com/NorthernTechHQ/nt-gui/commit/9ac55be87d283dd3939121edb0f992ad14ea4720)) by @dependabot[bot]
## @northern.tech/store-0.3.2 - 2024-12-13



### Bug fixes

#### store

- Fixed end date filters out today's entries in the Audit log and Devices ([aee3e80](https://github.com/NorthernTechHQ/nt-gui/commit/aee3e8053fe5744b99ab7432662c21c3fea38331)) by @aleksandrychev
## @northern.tech/store-0.3.1 - 2024-12-10



### Bug fixes


- Aligned helptips location after migration to common-ui ([7c2f0c4](https://github.com/NorthernTechHQ/nt-gui/commit/7c2f0c452f1fd4ca74b44a80882e0677bb1f40e6)) by @mzedel
- Fixed linter setup after dependency updates & removed now unused override ([a079b75](https://github.com/NorthernTechHQ/nt-gui/commit/a079b75f28bfa314a91ec94eed49d547873d1a7d)) by @mzedel

### Dependency updates


- Bump the production-dependencies group across 1 directory with 17 updates ([40759dc](https://github.com/NorthernTechHQ/nt-gui/commit/40759dc28331b06dc3ced879c1c9f5d3c81f0047)) by @dependabot[bot]
## @northern.tech/store-0.3.0 - 2024-12-10



### New features


- Made packages work with mender build + most tests ([7fe5d59](https://github.com/NorthernTechHQ/nt-gui/commit/7fe5d598587793291f7e4bfc678032b74442e19d)) by @mzedel

### Bug fixes

#### store

- Fixed an issue that caused version information to be parsed wrong ([bcba9da](https://github.com/NorthernTechHQ/nt-gui/commit/bcba9da4b8b29d27481f17383af66cf791b36bd8)) by @mzedel
- Reintroduced locations definition to allow build to pass ([48da257](https://github.com/NorthernTechHQ/nt-gui/commit/48da2579d6941a020493521d83d7c41fb5c75f2b)) by @mzedel
## @northern.tech/store-0.2.1 - 2024-11-15



### Bug fixes


- Aligned compile targets & platform for relevant packages ([eb0f5bf](https://github.com/NorthernTechHQ/nt-gui/commit/eb0f5bf0d82148d9d5639864a987314b4fbe7e4b)) by @mzedel
- Fixed store package export ([402165b](https://github.com/NorthernTechHQ/nt-gui/commit/402165b0c3972f9b55bd05eb2a75d17101fe57e8)) by @aleksandrychev
## @northern.tech/store-0.2.0 - 2024-11-15



### New features


- Aligned store code with mender-server repository ([5ce1179](https://github.com/NorthernTechHQ/nt-gui/commit/5ce117912a69c01866c781f6d04c0364d0755365)) by @aleksandrychev
## @northern.tech/store-0.1.3 - 2024-11-15



### Bug fixes

#### store

- Fixed type generation issue bypassing type only files ([7b8add6](https://github.com/NorthernTechHQ/nt-gui/commit/7b8add6703b06fd1b45fb27dff8c86b29cc98eaf)) by @mzedel
## @northern.tech/store-0.1.1 - 2024-11-06



### Bug fixes


- Allowed more flexible dependency versions ([ff85836](https://github.com/NorthernTechHQ/nt-gui/commit/ff85836679b61109c34d6e86f711f749e8d0f504)) by @mzedel
## @northern.tech/store-0.1.0 - 2024-11-05



### New features


- Basic repository setup ([ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150)) ([7b61c8c](https://github.com/NorthernTechHQ/nt-gui/commit/7b61c8c4f3b46d6ba998bc194f75dab8c8cc7cf6)) by @mzedel

---
### All tickets resolved in this release

| Ticket |
|---|
| [ENT-12150](https://northerntech.atlassian.net/browse/ENT-12150) |

---
