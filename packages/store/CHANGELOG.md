---
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
