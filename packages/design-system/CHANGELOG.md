# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-01-19

### Changed
- Updated `@igreen/themes` dependency to `^1.2.0`
- Added re-exports in `src/index.ts` for all components
- Now supports direct imports: `import { Button } from '@igreen/design-system'`

### Fixed
- Fixed missing re-exports causing import errors

## [1.0.2] - 2026-01-15

### Added
- Added `@igreen/example-card` dependency

## [1.0.1] - 2026-01-10

### Fixed
- Fixed peer dependencies versions

## [1.0.0] - 2026-01-05

### Added
- Initial release
- Meta-package bundling all iGreen components
- Includes: button, checkbox, input, label, mode-toggle
- Includes: themes, utils
