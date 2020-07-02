# Changelog 

Since this package is starting to be used by the wider world, I'll start a changelog. 

I try to keep to semantic versioning.

## 1.2.0

**Minor Compatibility Warning** This version reintroduces named regex captures. They were removed earlier because of lack of browser support, [but the situation has improved](https://caniuse.com/#feat=mdn-javascript_builtins_regexp_named_capture_groups). 

### Added

- `noparse` keyword after `:::` prevents treats the body of the container as raw text. 


## 1.1.2

### Added

- more and better tests.

### Changed

- improved container recognition so `:::` markers can be indented by 2 spaces and/or be followed by whitespace.

## 1.1.1

### Added

- Changelog file

### Fixed

- [Invalid Regex group on Firefox](https://github.com/Nevenall/remark-containers/issues/1) thanks to [OrsoBruno96](https://github.com/OrsoBruno96)!

### Info

- Improved the `README` file.
