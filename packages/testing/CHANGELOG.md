---
## 0.18.0 - 2026-08-28



### New features

#### testing

- Added a user-invitation endpoint mock ([MEN-9743](https://northerntech.atlassian.net/browse/MEN-9743)) ([12307eb](https://github.com/NorthernTechHQ/nt-gui/commit/12307eb40afb1b513d2329d3b59fe6730ec80db1)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9743](https://northerntech.atlassian.net/browse/MEN-9743) |

## @northern.tech/testing-0.17.0 - 2026-08-25



### New features

#### testing

- Aligned organization mocks w/ the tenant token only endpoints ([329d8a8](https://github.com/NorthernTechHQ/nt-gui/commit/329d8a8b9a4e6605df74aaa02c759379d7da8875)) by @mzedel
- Added a mock for new device search endpoint ([MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831)) ([46d8a2d](https://github.com/NorthernTechHQ/nt-gui/commit/46d8a2d78305523b1cce38a45e4f15c48c9202b2)) by @mineralsfree

### Bug fixes

#### testing

- Openapi spec update ([4b9141c](https://github.com/NorthernTechHQ/nt-gui/commit/4b9141c74582d7cdb8e668aa5f2bcfd32ad8a1ea)) by @mender-test-bot
- Removed validation for user edit endpoint ([a5c176b](https://github.com/NorthernTechHQ/nt-gui/commit/a5c176bf8fb5f78bb9806ab52377b8c73fbb0d54)) by @mineralsfree

### Dependency updates


- Bump js-yaml from 5.2.2 to 5.2.3 ([47cd651](https://github.com/NorthernTechHQ/nt-gui/commit/47cd65136b5aaa899ad226a9ece0cce5db8eead4)) by @dependabot[bot]
- Bump js-yaml from 5.2.3 to 5.3.0 ([dd51795](https://github.com/NorthernTechHQ/nt-gui/commit/dd51795a2ba2e88f387884d9b65b6c512a7b0457)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9831](https://northerntech.atlassian.net/browse/MEN-9831) |

## @northern.tech/testing-0.16.0 - 2026-08-12



### New features

#### testing

- Add system components mock and handler ([MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633)) ([a91b51e](https://github.com/NorthernTechHQ/nt-gui/commit/a91b51ea4a9fa8656523fac65d2460bc1601262c)) by @mineralsfree

### Bug fixes

#### testing

- Openapi spec update ([153a5dc](https://github.com/NorthernTechHQ/nt-gui/commit/153a5dc490f20f8cf1c0fcf53658f84454581cbc)) by @mender-test-bot

### Dependency updates


- Bump the production-dependencies group with 10 updates ([b1d61cf](https://github.com/NorthernTechHQ/nt-gui/commit/b1d61cfa74ece3b513808c6b10e7c52e785774d9)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9633](https://northerntech.atlassian.net/browse/MEN-9633) |

## @northern.tech/testing-0.15.1 - 2026-07-27



### Bug fixes

#### testing

- Openapi spec update ([939c896](https://github.com/NorthernTechHQ/nt-gui/commit/939c896433d3583e96489055c22fe6c1b2404b59)) by @mender-test-bot
- Return empty pending email state ([MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251)) ([da75c61](https://github.com/NorthernTechHQ/nt-gui/commit/da75c61e322e912f7533ec9575eb1e3872893fec)) by @mineralsfree

### Dependency updates


- Bump js-yaml from 5.2.1 to 5.2.2 ([dd894e4](https://github.com/NorthernTechHQ/nt-gui/commit/dd894e41d9e4cf51cd11e5e323ef8f88caf6b8f0)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9251](https://northerntech.atlassian.net/browse/MEN-9251) |

## @northern.tech/testing-0.15.0 - 2026-07-13



### New features

#### testing

- Added new email change handlers in msw ([MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950)) ([0d51830](https://github.com/NorthernTechHQ/nt-gui/commit/0d518301b1e5b81058e6ed35cabba8dc79c7cd32)) by @mineralsfree

### Bug fixes

#### testing

- Openapi spec update ([5b4e418](https://github.com/NorthernTechHQ/nt-gui/commit/5b4e418dc301657339d0cf95e719750277faf521)) by @mender-test-bot
- Adjusted email endpoint ([fb907a3](https://github.com/NorthernTechHQ/nt-gui/commit/fb907a31fb097858a3b337c0624dedb71beed257)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-9950](https://northerntech.atlassian.net/browse/MEN-9950) |

## @northern.tech/testing-0.14.1 - 2026-07-09



### Bug fixes

#### testing

- Fixed deployment retries value type in the msw ([feccc39](https://github.com/NorthernTechHQ/nt-gui/commit/feccc39bfdbf8e1167d2d12230abeb6df795c49c)) by @mineralsfree

### Dependency updates


- Bump the production-dependencies group across 1 directory with 9 updates ([d5e0bad](https://github.com/NorthernTechHQ/nt-gui/commit/d5e0bade3c31425a7c08e39a1e25d9148093fb7b)) by @dependabot[bot]
- Bump @mui/material in the mui group across 1 directory ([cd34f6a](https://github.com/NorthernTechHQ/nt-gui/commit/cd34f6aa351fe9cebfbd84a22cc376898dd7afd4)) by @dependabot[bot]
## @northern.tech/testing-0.14.0 - 2026-06-30



### New features

#### testing

- Reclassify dependencies as peers to reduce duplicate installations & related issues ([a63eb71](https://github.com/NorthernTechHQ/nt-gui/commit/a63eb71aa7af4d7a7a38db036d639903c0639a8f)) by @mzedel

### Bug fixes

#### testing

- Openapi spec update ([1169146](https://github.com/NorthernTechHQ/nt-gui/commit/116914680686db73c39ee0e44ab0284fb54df15a)) by @mender-test-bot

### Dependency updates


- Bump js-yaml from 5.0.0 to 5.1.0 ([80ddafa](https://github.com/NorthernTechHQ/nt-gui/commit/80ddafa88d16a65e468792d662f0d80bc24918dd)) by @dependabot[bot]
## @northern.tech/testing-0.13.3 - 2026-06-23



### Bug fixes

#### testing

- Openapi spec update ([e1b5520](https://github.com/NorthernTechHQ/nt-gui/commit/e1b5520dd4c1531df1aeb32a2c8ad304a1c665e5)) by @mender-test-bot
- Added rbac support for software releases & manifests endpoint ([1068a18](https://github.com/NorthernTechHQ/nt-gui/commit/1068a18ca8ac44774a59252e01ec436024b36ef5)) by @mzedel

### Dependency updates


- Bump js-yaml from 4.2.0 to 5.0.0 ([50c0f70](https://github.com/NorthernTechHQ/nt-gui/commit/50c0f7019027f18a05f1434e77b72674fd0cc79d)) by @dependabot[bot]
## @northern.tech/testing-0.13.2 - 2026-06-15



### Bug fixes

#### testing

- Account for added wait for modal transitions to run after recent mui update ([3f0867c](https://github.com/NorthernTechHQ/nt-gui/commit/3f0867c3fc3e8e7039d1da8253e046be48f8c87e)) by @mzedel
- Openapi spec update ([ca9f959](https://github.com/NorthernTechHQ/nt-gui/commit/ca9f959e15c884fa671ee21e4f716b0abe42f6b8)) by @mender-test-bot
- Added compatible types to software mock ([893c596](https://github.com/NorthernTechHQ/nt-gui/commit/893c5961bc532764f3a4ce9f937655ff0d5babe2)) by @mineralsfree

### Dependency updates


- Bump the production-dependencies group with 8 updates ([59d90e3](https://github.com/NorthernTechHQ/nt-gui/commit/59d90e3e954d05414420091388acdf32be9cd6ef)) by @dependabot[bot]
- Bump the development-dependencies group across 1 directory with 9 updates ([a0df33c](https://github.com/NorthernTechHQ/nt-gui/commit/a0df33c9e16152e8e0d2acffd694012dacb2948a)) by @dependabot[bot]
## @northern.tech/testing-0.13.1 - 2026-06-04



### Bug fixes

#### testing

- Added support for tags in software retrieval ([aeb24a5](https://github.com/NorthernTechHQ/nt-gui/commit/aeb24a5e583b55e02b0cfce9c4dff431f4031490)) by @mineralsfree
- Switched to name_prefix in software retrieval ([deab3bc](https://github.com/NorthernTechHQ/nt-gui/commit/deab3bcb7d2fb3950ae921e603f2531c75c48465)) by @mineralsfree
- Simplified version info to only rely on server repo tag if available ([28851a3](https://github.com/NorthernTechHQ/nt-gui/commit/28851a3d4620fc5fecbe3fa3ac3a690c32f0636b)) by @mzedel
- Openapi spec update ([6a489f5](https://github.com/NorthernTechHQ/nt-gui/commit/6a489f52377e3445ae12744639cef417d954518f)) by @mender-test-bot
- Switched to react-router instead of react-router-dom ([ecd8a76](https://github.com/NorthernTechHQ/nt-gui/commit/ecd8a76181c49b5ca18d14e53cb9f7324c0c34f8)) by @mineralsfree

### Dependency updates


- Bump the development-dependencies group with 11 updates ([bfa7337](https://github.com/NorthernTechHQ/nt-gui/commit/bfa7337d11ca6e9eb97638b881589f0df0f42ccb)) by @dependabot[bot]
## @northern.tech/testing-0.13.0 - 2026-05-27



### New features

#### testing

- Added support for tag based manifest filtering ([b5265d2](https://github.com/NorthernTechHQ/nt-gui/commit/b5265d291bac6cfb6f4793b5d323fcf07e5cd6d9)) by @mzedel

### Bug fixes

#### testing

- Openapi spec update ([83b3dd9](https://github.com/NorthernTechHQ/nt-gui/commit/83b3dd93228d193f75974e19b28aca8f272dfaab)) by @mender-test-bot
## @northern.tech/testing-0.12.1 - 2026-05-20



### Bug fixes

#### testing

- Openapi spec update ([774ef3a](https://github.com/NorthernTechHQ/nt-gui/commit/774ef3a78a4ddcf282145483274ec62812c64735)) by @mender-test-bot
- Added OAuth linking endpoint mock ([MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205)) ([ab424d1](https://github.com/NorthernTechHQ/nt-gui/commit/ab424d16a0b820d90e23165bca096dc2e0fa1852)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8205](https://northerntech.atlassian.net/browse/MEN-8205) |

## @northern.tech/testing-0.12.0 - 2026-05-19



### New features

#### testing

- Added support for software list retrieval ([903416d](https://github.com/NorthernTechHQ/nt-gui/commit/903416d199372a7fe71516fbc827df774da3985b)) by @mzedel
- Added oauth linking support ([5bb7391](https://github.com/NorthernTechHQ/nt-gui/commit/5bb73916c378bc4ff4bbe622dbfd39c9ede505a2)) by @mzedel
- Added manifest manipulation support ([f6b656b](https://github.com/NorthernTechHQ/nt-gui/commit/f6b656b597dffe90eb7475c02d5d851c2a476dd1)) by @mzedel

### Bug fixes

#### testing

- Openapi spec update ([ba45ea2](https://github.com/NorthernTechHQ/nt-gui/commit/ba45ea2a0902d7099a4e351851fe3092218a6946)) by @mender-test-bot
- Allowed getting multiple software items by name ([7540448](https://github.com/NorthernTechHQ/nt-gui/commit/75404485ac5e4ec10e088c06f9ec1f08d9fee047)) by @mzedel
## @northern.tech/testing-0.11.0 - 2026-05-13



### New features

#### testing

- Extended support for manifest & software request handling ([1c75220](https://github.com/NorthernTechHQ/nt-gui/commit/1c75220786f2b0b8b72365a26d83ef79d5f6e72d)) by @mzedel
- Added support for uniform phase deployment processing ([6057dac](https://github.com/NorthernTechHQ/nt-gui/commit/6057dac170b5fc1d73a4edbbad530264ab183d2d)) by @mzedel

### Bug fixes

#### testing

- Openapi spec update ([6bfcf11](https://github.com/NorthernTechHQ/nt-gui/commit/6bfcf1151673d747b2f7ca65425351aecbbaca96)) by @mender-test-bot

### Dependency updates


- Bump the production-dependencies group with 18 updates ([57c9c86](https://github.com/NorthernTechHQ/nt-gui/commit/57c9c86cf97e594bd2924941091592828aaca051)) by @dependabot[bot]
- Bump the development-dependencies group across 1 directory with 15 updates ([6300680](https://github.com/NorthernTechHQ/nt-gui/commit/630068080fd9a2936344fc80d0536a5f08567ce2)) by @dependabot[bot]
## @northern.tech/testing-0.10.1 - 2026-04-23



### Bug fixes

#### testing

- Openapi spec update ([9431600](https://github.com/NorthernTechHQ/nt-gui/commit/9431600c39458d8b8575403a7c24632b5cf32c67)) by @mender-test-bot
- Updated Mui to v9 ([f30e697](https://github.com/NorthernTechHQ/nt-gui/commit/f30e697ff567659e90b93713f766f8cd2dc46466)) by @mineralsfree
## @northern.tech/testing-0.10.0 - 2026-04-21



### New features

#### testing

- Added manifest mock data handling to allow redux based testing ([4449dbd](https://github.com/NorthernTechHQ/nt-gui/commit/4449dbdadd65247f608a6810e136e8172f3327b3)) by @mzedel

### Bug fixes

#### testing

- Openapi spec update ([3002081](https://github.com/NorthernTechHQ/nt-gui/commit/3002081c6addb5e15118d195bd53981460e39ad5)) by @mender-test-bot
## @northern.tech/testing-0.9.1 - 2026-04-17



### Bug fixes

#### testing

- Used named import for OpenAPIBackend to fix ESM interop ([2433092](https://github.com/NorthernTechHQ/nt-gui/commit/243309217d60fb625f535e7a3bfc8389a30548ee)) by @mineralsfree
## @northern.tech/testing-0.9.0 - 2026-04-17



### New features

#### testing

- Added validation script to enforce spec compliance in msw handlers ([QA-1539](https://northerntech.atlassian.net/browse/QA-1539)) ([0365e7b](https://github.com/NorthernTechHQ/nt-gui/commit/0365e7b6b6b12847c01601d0a20487a0cb904efc)) by @mineralsfree

### Bug fixes

#### testing

- Openapi spec update ([08f8a5a](https://github.com/NorthernTechHQ/nt-gui/commit/08f8a5a44b172db2b1d1478927329fa3744a6cb7)) by @mender-test-bot

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1539](https://northerntech.atlassian.net/browse/QA-1539) |

## @northern.tech/testing-0.8.4 - 2026-04-15



### Bug fixes

#### testing

- Openapi spec update ([ae19dc9](https://github.com/NorthernTechHQ/nt-gui/commit/ae19dc9c5ca51ba1d80f00a7fa37c92cc3517b70)) by @mender-test-bot
- Fixed ts errors to enable type checked usage ([1ecaba0](https://github.com/NorthernTechHQ/nt-gui/commit/1ecaba038c2e492a625de85ab4a8264e06ceff7d)) by @mzedel

- Migrated package bundling to tsdown ([400f54c](https://github.com/NorthernTechHQ/nt-gui/commit/400f54c686c6ea202e8de54f82c64ac5a1a0ac19)) by @mzedel
## @northern.tech/testing-0.8.3 - 2026-04-01



### Bug fixes

#### testing

- Ensure package content ([QA-1039](https://northerntech.atlassian.net/browse/QA-1039)) ([de4cb9a](https://github.com/NorthernTechHQ/nt-gui/commit/de4cb9a162fccbc4de575a25358b2b9e746e951d)) by @mineralsfree

---
### All tickets resolved in this release

| Ticket |
|---|
| [QA-1039](https://northerntech.atlassian.net/browse/QA-1039) |

## @northern.tech/testing-0.8.2 - 2026-03-31



### Bug fixes

#### testing

- Ensured package content ([8df53da](https://github.com/NorthernTechHQ/nt-gui/commit/8df53da18c36b1940cf4ee19bc7cd5e4024ca79d)) by @mzedel
## @northern.tech/testing-0.8.1 - 2026-03-31



### Bug fixes

#### testing

- Ensured non-reporting utils package gets used in testing package ([c1aaf99](https://github.com/NorthernTechHQ/nt-gui/commit/c1aaf99f7a0f23f97b2c169431034ef2a77e0d26)) by @mzedel
## @northern.tech/testing-0.8.0 - 2026-03-05



### Bug fixes

#### testing

- Added tiers support to sp tenant ([70d19e8](https://github.com/NorthernTechHQ/nt-gui/commit/70d19e8f2fdbec3260768da010b8eadb2db84c0e)) by @mineralsfree
## @northern.tech/testing-0.7.1 - 2026-02-18



### Bug fixes

#### testing

- Let deployments search rely on non-deprecated endpoint ([71797db](https://github.com/NorthernTechHQ/nt-gui/commit/71797dbb11dcb9730af717f1fe16a50d464e5571)) by @mzedel
## @northern.tech/testing-0.7.0 - 2026-02-10



### Bug fixes

#### testing

- Products mock ([a8ba060](https://github.com/NorthernTechHQ/nt-gui/commit/a8ba0600c0b2db527f2429d336ad5b309ff82037)) by @mineralsfree
## @northern.tech/testing-0.6.0 - 2026-02-02



### New features

#### testing

- Added rendering helper to ease url state mocking ([a5c8abf](https://github.com/NorthernTechHQ/nt-gui/commit/a5c8abfc3a5b9d8ce7cc729ea43f18b35b5dc0fe)) by @mzedel

### Bug fixes

#### testing

- Aligned provided abortcontroller w/  functionality expected by jsdom ([d7f9242](https://github.com/NorthernTechHQ/nt-gui/commit/d7f9242d61c4600933e509d4dde7bbe891ef6af0)) by @mzedel
## @northern.tech/testing-0.5.1 - 2026-01-23



### Bug fixes

#### testing

- Aligned faulty update type mock w/ api response reality ([237064b](https://github.com/NorthernTechHQ/nt-gui/commit/237064b4e3eaefd4e785552211127f32b10ddde3)) by @mzedel
## @northern.tech/testing-0.5.0 - 2026-01-12



### Bug fixes

#### testing

- Adjusted invoice preview mock response ([MEN-8878](https://northerntech.atlassian.net/browse/MEN-8878)) ([e7c9cd5](https://github.com/NorthernTechHQ/nt-gui/commit/e7c9cd561cf5370a5316fea5b8a338e07e544ec1)) by @mineralsfree

### Dependency updates


- Bump the development-dependencies group across 1 directory with 11 updates ([1f7d179](https://github.com/NorthernTechHQ/nt-gui/commit/1f7d1796e187d123c3bb7e70d6c30ceeb5d2b8f2)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8878](https://northerntech.atlassian.net/browse/MEN-8878) |

## @northern.tech/testing-0.4.0 - 2025-12-15



### New features

#### store

- Made use of combined device counts endpoint & adjusted related tracking state ([4d0bb34](https://github.com/NorthernTechHQ/nt-gui/commit/4d0bb34af23d726019e4b7d906701c9bc2b60c60)) by @mzedel
## @northern.tech/testing-0.3.0 - 2025-12-01



### New features

#### testing

- Added support for tiered device limits ([bc893e5](https://github.com/NorthernTechHQ/nt-gui/commit/bc893e527e2ae73507a226b6a42506ada58e6d03)) by @mzedel
## @northern.tech/testing-0.2.3 - 2025-11-04



### Bug fixes

#### testing

- Align time mock handling w/ vitest + rtl recommendations by providing proper `beforeEach` util ([7e26a57](https://github.com/NorthernTechHQ/nt-gui/commit/7e26a577e3737fd0d00f967cdc170589219841f1)) by @mzedel

### Dependency updates


- Bump the production-dependencies group across 1 directory with 14 updates ([9669175](https://github.com/NorthernTechHQ/nt-gui/commit/96691756e8cb9785b170c9e7c2e94daa218b16b2)) by @dependabot[bot]
## @northern.tech/testing-0.2.2 - 2025-10-02



### Bug fixes

#### testing

- Aligned MSW handlers w/ store & current Mender ([d200130](https://github.com/NorthernTechHQ/nt-gui/commit/d200130da18f871b572f9ed08e424a7c591576b3)) by @mzedel
## @northern.tech/testing-0.2.1 - 2025-08-24



### Bug fixes

#### testing

- Synced msw handlers with current mender ([4dfe2d0](https://github.com/NorthernTechHQ/nt-gui/commit/4dfe2d02ad4c58329c0c99a2f1cf305e4cee8997)) by @mzedel
## @northern.tech/testing-0.2.0 - 2025-08-22



### New features

#### testing

- Also handle user existence checking ([db1f75b](https://github.com/NorthernTechHQ/nt-gui/commit/db1f75b37dcba66a02432a6ef2e0b7e3f33f6c0c)) by @mzedel
## @northern.tech/testing-0.1.0 - 2025-08-14



### New features

#### testing

- Added testing package ([MEN-8006](https://northerntech.atlassian.net/browse/MEN-8006)) ([46c2efd](https://github.com/NorthernTechHQ/nt-gui/commit/46c2efd789d54a3a0393e3a1337645ca138eefa3)) by @mzedel

### Bug fixes


- Relaxed package dependencies to ease updates in dependent projects ([2c758c1](https://github.com/NorthernTechHQ/nt-gui/commit/2c758c19349ac12ab0be2b5e853523df7502f856)) by @mzedel

### Dependency updates


- Bump the development-dependencies group across 1 directory with 9 updates ([94aae51](https://github.com/NorthernTechHQ/nt-gui/commit/94aae51e4128ad55e7bbdf9e47ccdf1aa30e513a)) by @dependabot[bot]

---
### All tickets resolved in this release

| Ticket |
|---|
| [MEN-8006](https://northerntech.atlassian.net/browse/MEN-8006) |

---
