---
## @northern.tech/store-0.19.1 - 2026-01-27


### Bug fixes

#### Store


- *(store)* Fixed an issue that would require re-login when relying on sso in some situations

([ME-365](https://northerntech.atlassian.net/browse/ME-365)) ([653f009](https://github.com/NorthernTechHQ/nt-gui/commit/653f00968941af9d508e7d44fa394789f30583f7))  by @mzedel









## @northern.tech/store-0.18.0 - 2026-01-23


### Bug fixes

#### Store


- *(store)* Aligned faulty update type mock w/ api response reality

 ([9de44da](https://github.com/NorthernTechHQ/nt-gui/commit/9de44dad6735a411c21fef7728c2cc00048bbf70))  by @mzedel







### Features

#### Store


- *(store)* Allowed finer grained navigation event handling

 ([77f32b1](https://github.com/NorthernTechHQ/nt-gui/commit/77f32b1460b9b69ab875f22bb7583c77fef2a4c0))  by @mzedel








## @northern.tech/store-0.17.0 - 2026-01-21


### Features

#### Store


- *(store)* Added security alert dismission timestamp

([MEN-9095](https://northerntech.atlassian.net/browse/MEN-9095)) ([30abe5a](https://github.com/NorthernTechHQ/nt-gui/commit/30abe5ab61e2754919fc9ccb67503c7ad20a8f72))  by @mineralsfree









## @northern.tech/store-0.16.0 - 2026-01-15


### Features

#### Store


- *(store)* Added support for feature flag to revert new theme

 ([49e43a2](https://github.com/NorthernTechHQ/nt-gui/commit/49e43a25e2226798fbb29be3350de154d0565509))  by @mzedel



- *(store)* Added device limit stats selector

([MEN-8882](https://northerntech.atlassian.net/browse/MEN-8882)) ([ec730e5](https://github.com/NorthernTechHQ/nt-gui/commit/ec730e5b389da6edb2f9213eaeb372f4c2847382))  by @mineralsfree









## @northern.tech/store-0.14.0 - 2026-01-08


### Features

#### Store


- *(store)* Added feature flag for MCU

([MEN-9205](https://northerntech.atlassian.net/browse/MEN-9205)) ([5a66d7e](https://github.com/NorthernTechHQ/nt-gui/commit/5a66d7e18690c4048b785a57af86f9bdd5fa1a9e))  by @mineralsfree








### Security



## @northern.tech/store-0.13.0 - 2025-12-15


### Features

#### Store


- *(store)* Made slice types available consistently

 ([77c506e](https://github.com/NorthernTechHQ/nt-gui/commit/77c506ea6f6b536c5ed243d7ab2b82ff0489626f))  by @mzedel




  - and aligned them slightly along the way

- *(store)* Made use of combined device counts endpoint & adjusted related tracking state

 ([4d0bb34](https://github.com/NorthernTechHQ/nt-gui/commit/4d0bb34af23d726019e4b7d906701c9bc2b60c60))  by @mzedel








## @northern.tech/store-0.12.0 - 2025-12-08


### Bug fixes

#### Store


- *(store)* Do not encode empty msgpack fixmap on close

 ([8349f07](https://github.com/NorthernTechHQ/nt-gui/commit/8349f07784f29e40d57dcd0f17ec26c31b490ff4))  by @alfrunes







### Features

#### Store


- *(store)* Added firstLoginTimestamp for feedback form delay

([MEN-8896](https://northerntech.atlassian.net/browse/MEN-8896)) ([00d2612](https://github.com/NorthernTechHQ/nt-gui/commit/00d26124d4774a94b1dfd3a9f56c104e5feb0083))  by @mineralsfree








### Security



## @northern.tech/store-0.11.0 - 2025-12-02


### Bug fixes

#### Store


- *(store)* Ensured initialization skips enterprise/ hosted information when on os only

 ([e66e3a9](https://github.com/NorthernTechHQ/nt-gui/commit/e66e3a9d20f1ff5b23bbe345226495db51c0b976))  by @mzedel



- *(store)* Let device limits only be considered if they are set

 ([f3c381f](https://github.com/NorthernTechHQ/nt-gui/commit/f3c381f88f2831b72456fd1ea6e51d33baeed7ff))  by @mzedel




  - tier separated handling for negative infinity/ limit of -1 will have to be situation dependent in the application





### Features

#### Store


- *(store)* Added support for tiered device limits

 ([97eb3bb](https://github.com/NorthernTechHQ/nt-gui/commit/97eb3bb8b37b9270dd411a003cbb6fd761701d4b))  by @mzedel



- *(store)* Added mcu onboarding support

([MEN-8583](https://northerntech.atlassian.net/browse/MEN-8583)) ([7b5f6f0](https://github.com/NorthernTechHQ/nt-gui/commit/7b5f6f0021f21f4465f416da87157e42e23e356b))  by @mineralsfree









## @northern.tech/store-0.9.0 - 2025-11-04


### Bug fixes

#### Store


- *(store)* Aligned chinese Mender deployment location w/ reality

 ([0cc8161](https://github.com/NorthernTechHQ/nt-gui/commit/0cc81618bfb41e4ad8c9bfbe1205949b24edde7e))  by @mzedel



- *(store)* Rectified user setting selector confusion w/ global settings to align w/ Mender

 ([bca8f1a](https://github.com/NorthernTechHQ/nt-gui/commit/bca8f1aca73218c0ff3820027b306eb42a1172f8))  by @mzedel



- *(store)* Aligned type usage w/ updated backend specs

 ([3af8a38](https://github.com/NorthernTechHQ/nt-gui/commit/3af8a3869041defac33d6651729537fd438cc109))  by @mzedel



- *(store)* Adopted reintroduced delta job related types

 ([8722498](https://github.com/NorthernTechHQ/nt-gui/commit/8722498acca64d4771980cd78f308e2d04a2d627))  by @mzedel



- *(store)* Fixed an issue that prevented getting detailed delta gen information

 ([093f711](https://github.com/NorthernTechHQ/nt-gui/commit/093f7119cf2d4322adfc2d352f7a90876ef78241))  by @mzedel



- *(store)* Fixed an issue that prevented updating sso settings for existing configs

 ([5d2b9e3](https://github.com/NorthernTechHQ/nt-gui/commit/5d2b9e33c0744a8e88cdefa4d05f985f6c7783e5))  by @mzedel



- *(store)* Removed duplicated yes function to ease vitest usage

 ([6b31671](https://github.com/NorthernTechHQ/nt-gui/commit/6b316712000a879b5bc9db8207eb464ceb722a16))  by @mzedel




  - `yes` now needs to be a named function to be usable in vitest hooks





### Features

#### Store


- *(store)* Let store rely on newer backend type definitions

 ([5ade1e1](https://github.com/NorthernTechHQ/nt-gui/commit/5ade1e12697c5edf61b205f1720761e586596a88))  by @mzedel







### Security



## @northern.tech/store-0.5.3 - 2025-10-02


### Bug fixes

#### Store


- *(store)* Aligned store interactions w/ current Mender

 ([3a27287](https://github.com/NorthernTechHQ/nt-gui/commit/3a27287df37b8935cefaf89a8f50a1a1c10d0e2f))  by @mzedel







### Security



## @northern.tech/store-0.5.2 - 2025-08-26


### Bug fixes

#### Store


- *(store)* Aligned store w/ mender to remove demo features

 ([81512d2](https://github.com/NorthernTechHQ/nt-gui/commit/81512d2925cce055d1f8fc4fc66877824b1372a1))  by @mzedel




  + align deployment stats

- *(store)* Aligned snackbar open state automation w/ mender

 ([a78beaa](https://github.com/NorthernTechHQ/nt-gui/commit/a78beaade61972a836c03b47b79510b14e4b5d77))  by @mzedel








## @northern.tech/store-0.5.1 - 2025-08-24


### Bug fixes

#### Store


- *(store)* Aligned license report location w/ mender

 ([294b140](https://github.com/NorthernTechHQ/nt-gui/commit/294b14054fa97cdb80a4d7d15759f6223aa177f2))  by @mzedel



- *(store)* Additional adjustment for esm compatibility

 ([3808f01](https://github.com/NorthernTechHQ/nt-gui/commit/3808f01e4a8c379e63a599a74c92ffa08e56ead4))  by @mzedel








## @northern.tech/store-0.5.0 - 2025-08-22


### Bug fixes

#### Store


- *(store)* Fixed imports of esm unfriendly packages

 ([d52a3d7](https://github.com/NorthernTechHQ/nt-gui/commit/d52a3d7dae5199b83f0e73dd3a6c10cf30118bb3))  by @mzedel




  - common + common-ui affected as well, not mentioned due to scope policy

- *(store)* Removed country flags as their exported ref was not usable externally

 ([4a12781](https://github.com/NorthernTechHQ/nt-gui/commit/4a12781e8e02efb1f465c5f7034789058c3ab927))  by @mzedel



- *(store)* Synced app state selectors w/ mender

 ([eff0a98](https://github.com/NorthernTechHQ/nt-gui/commit/eff0a98e1a72029cf8f7872682d6c9957d486f91))  by @mzedel







### Features

#### Store


- *(store)* Added email existence checking thunk to centralize msw handling

 ([a587361](https://github.com/NorthernTechHQ/nt-gui/commit/a5873617f28bf2f29c48dcc176f676d01d3e168f))  by @mzedel








## @northern.tech/store-0.4.0 - 2025-08-14


### Features

#### Store


- *(store)* Made use of types package instead

 ([2474698](https://github.com/NorthernTechHQ/nt-gui/commit/2474698b27b9c61a0201e4ee2671a39b5305339e))  by @mzedel



- *(store)* Colocated mock data with slices they correspond to

 ([5f452c4](https://github.com/NorthernTechHQ/nt-gui/commit/5f452c423bb7a6c6565ab89bdea68ef445c951f6))  by @mzedel







#### Types


- *(types)* Added base types package meant for nt-gui internal use

 ([b8f8282](https://github.com/NorthernTechHQ/nt-gui/commit/b8f8282552de39dc291a9d03b0281d984a2d0067))  by @mzedel







### Refactor

#### Store,common-ui


- *(store,common-ui)* Switched package internal imports to relative locations - to remove path mapping differences in vitest vs. tsup

 ([38f6fd8](https://github.com/NorthernTechHQ/nt-gui/commit/38f6fd8fc6b72caaf03f87bf2e7e9a9167aca6f0))  by @mzedel







### Security


### Refac



## @northern.tech/store-0.3.4 - 2025-02-14


### Bug fixes

#### Common,store


- *(common,store)* Fixed references to now moved utility functions

 ([73e9f33](https://github.com/NorthernTechHQ/nt-gui/commit/73e9f33d77c0c5773f05b3f0344d8f7350c62e8f))  by @mzedel






#### Store


- *(store)* Aligned onboarding handling with removed onboardingmanager

 ([cf5ea53](https://github.com/NorthernTechHQ/nt-gui/commit/cf5ea5339e88f3767c25358221f52060941363e4))  by @mzedel



- *(store)* Aligned dependencies with referenced packages

 ([182dedd](https://github.com/NorthernTechHQ/nt-gui/commit/182dedd8a4a1f81ed4f22bf9e345bc0e4f73cc2d))  by @mzedel



- *(store)* Aligned sorting behaviour with type expectation & single sorting function

 ([f9d71d4](https://github.com/NorthernTechHQ/nt-gui/commit/f9d71d411907d3ba0106c2c7da4a6f46e5ac2cb0))  by @mzedel







### Features

#### Utils,store


- *(utils,store)* Moved store focused utils to store package

 ([9a98222](https://github.com/NorthernTechHQ/nt-gui/commit/9a982226b1668632bcbb6be382bb4b2ce8d8fe14))  by @mzedel








## @northern.tech/store-0.3.3 - 2025-01-31


### Bug fixes

#### Store


- *(store)* Removed reliance on test config in package code

 ([106415a](https://github.com/NorthernTechHQ/nt-gui/commit/106415a590755e8400ba2b8a99069032fd6f6bcb))  by @mzedel



- *(store)* Added missing type for device data retrieval

 ([3b33c43](https://github.com/NorthernTechHQ/nt-gui/commit/3b33c4380f6cf47688452319ef0bf88554179eef))  by @mzedel







### Security



## @northern.tech/store-0.3.2 - 2024-12-13


### Bug fixes

#### Store


- *(store)* Fixed end date filters out today's entries in the Audit log and Devices

 ([aee3e80](https://github.com/NorthernTechHQ/nt-gui/commit/aee3e8053fe5744b99ab7432662c21c3fea38331))  by @aleksandrychev








## @northern.tech/store-0.3.1 - 2024-12-10


### Bug fixes


### Security



## @northern.tech/store-0.3.0 - 2024-12-10


### Bug fixes

#### Store


- *(store)* Fixed an issue that caused version information to be parsed wrong

 ([bcba9da](https://github.com/NorthernTechHQ/nt-gui/commit/bcba9da4b8b29d27481f17383af66cf791b36bd8))  by @mzedel



- *(store)* Reintroduced locations definition to allow build to pass

 ([48da257](https://github.com/NorthernTechHQ/nt-gui/commit/48da2579d6941a020493521d83d7c41fb5c75f2b))  by @mzedel







### Features



## @northern.tech/store-0.2.1 - 2024-11-15


### Bug fixes



## @northern.tech/store-0.2.0 - 2024-11-15


### Features



## @northern.tech/store-0.1.3 - 2024-11-15


### Bug fixes

#### Store


- *(store)* Fixed type generation issue bypassing type only files

 ([7b8add6](https://github.com/NorthernTechHQ/nt-gui/commit/7b8add6703b06fd1b45fb27dff8c86b29cc98eaf))  by @mzedel








## @northern.tech/store-0.1.1 - 2024-11-06


### Bug fixes



## @northern.tech/store-0.1.0 - 2024-11-05


### Features



---
