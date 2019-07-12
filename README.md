# util-string-wrap

[![experimental](https://badges.github.io/stability-badges/dist/experimental.svg)](https://github.com/badges/stability-badges)

Small utility library implementing string case testing and conversion: mixed snake case,
screaming snake case, screaming dash case, screaming dot case, screaming slash case, snake case,
dash case, dot case, slash case, camel case.

Case tests are done by pre-analyzing string content to make multiple tests for various case
styles efficient.

defines `StringCase` class which takes a string as construction argument and provides on the
instance:

Test original string for being of given case

* `.isMixedSnakeCase()`
* `.isMixedDashCase()`
* `.isMixedDotCase()`
* `.isMixedSlashCase()`
* `.isMixedSpaceCase()`
* `.isScreamingSnakeCase()`
* `.isScreamingDashCase()`
* `.isScreamingDotCase()`
* `.isScreamingSlashCase()`
* `.isScreamingSpaceCase()`
* `.isSnakeCase()`
* `.isDashCase()`
* `.isDotCase()`
* `.isSlashCase()`
* `.isProperSpaceCapsCase()`
* `.isSpaceCapsCase()`
* `.isSpaceCase()`
* `.isCamelCase()`
* `.hasNoUpperCase()`
* `.hasNoLowerCase()`
* `.hasUpperCase()`
* `.hasLowerCase()`
* `.hasLowerCaseOrUpperCase()`
* `.isLowerCase()`
* `.isUpperCase()`
* `.isProperCamelCase()`
* `.isPascalCase()`

Test if can convert original string to given case

* `.canBeMixedSnakeCase()`
* `.canBeScreamingSnakeCase()`
* `.canBeSnakeCase()`
* `.canBeMixedDashCase()`
* `.canBeScreamingDashCase()`
* `.canBeDashCase()`
* `.canBeMixedDotCase()`
* `.canBeScreamingDotCase()`
* `.canBeDotCase()`
* `.canBeMixedSlashCase()`
* `.canBeScreamingSlashCase()`
* `.canBeSlashCase()`
* `.canBeMixedSpaceCase()`
* `.canBeScreamingSpaceCase()`
* `.canBeSpaceCase()`
* `.canBeSpaceCapsCase()`
* `.canBeCamelCase()`
* `.canBeProperCamelCase()`
* `.canBePascalCase()`

Convert original string to given case

* `.makeCamelCase()`
* `.makeProperCamelCase()`
* `.makePascalCase()`
* `.makeMixedSnakeCase()`
* `.makeMixedDotCase()`
* `.makeMixedDashCase()`
* `.makeMixedSlashCase()`
* `.makeMixedSpaceCase()`
* `.makeMixedSpaceCapsCase()`
* `.makeScreamingSnakeCase()`
* `.makeSnakeCase()`
* `.makeScreamingDashCase()`
* `.makeDashCase()`
* `.makeScreamingDotCase()`
* `.makeDotCase()`
* `.makeScreamingSlashCase()`
* `.makeSlashCase()`
* `.makeSpaceCase()`
* `.makeScreamingSpaceCase()`
* `.makeSpaceCapsCase()`

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install util-string-case --save
```

## Usage

[![NPM](https://nodei.co/npm/util-string-case.png)](https://www.npmjs.com/package/util-string-case)

## License

MIT, see [LICENSE.md](https://github.com/vsch/util-string-case/blob/master/LICENSE.md) for
details.

