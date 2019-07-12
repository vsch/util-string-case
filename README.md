# util-string-wrap

[![experimental](https://badges.github.io/stability-badges/dist/experimental.svg)](https://github.com/badges/stability-badges)

Small utility library implementing string case testing and conversion: mixed snake case,
screaming snake case, screaming dash case, screaming dot case, screaming slash case, screaming
space case, snake case, dash case, dot case, slash case, space case, space caps case, camel
case.

Case tests are done by pre-analyzing string content to make multiple tests for various case
styles efficient.

Case Names:

* `camelCase`
* `PascalCase`
* `snake_case`
* `Mixed_Snake_Case`
* `SCREAMING_SNAKE_CASE`
* `dot.case`
* `Mixed.Dot.Case`
* `SCREAMING.DOT.CASE`
* `dash-case`
* `Mixed-Dash-Case`
* `SCREAMING-DASH-CASE`
* `slash/case`
* `Mixed/Slash/Case`
* `SCREAMING/SLASH/CASE`
* `space case`
* `Mixed Space Case`
* `SCREAMING SPACE CASE`

defines `StringCase` class which takes a string as construction argument and provides on the
instance:

* Test original string for being of given case

  * `.isMixedCamelCase()`
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
  * `.isSpaceCase()`
  * `.isCapitalizedSpaceCase()`
  * `.hasNoUpperCase()`
  * `.hasNoLowerCase()`
  * `.hasUpperCase()`
  * `.hasLowerCase()`
  * `.hasLowerCaseOrUpperCase()`
  * `.isLowerCase()`
  * `.isUpperCase()`
  * `.isCamelCase()`
  * `.isPascalCase()`

* Test if can convert original string to given case

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
  * `.canBeCapitalizedSpaceCase()`
  * `.canBeCamelCase()`
  * `.canBeProperCamelCase()`
  * `.canBePascalCase()`

* Convert original string to given case

  * Add separator where case changes from uppercase to lowercase or where separator exists
    * `.makeMixedSnakeCase()`
    * `.makeMixedDotCase()`
    * `.makeMixedDashCase()`
    * `.makeMixedSlashCase()`
    * `.makeMixedSpaceCase()`
  * Add separators as above and capitalize each span
    * `.makeProperSnakeCase()`
    * `.makeProperDotCase()`
    * `.makeProperDashCase()`
    * `.makeProperSlashCase()`
    * `.makeProperSpaceCase()`
  * `.makeCamelCase()`
  * `.makeProperCamelCase()`
  * `.makePascalCase()`
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
  * `.makeCapitalizedSpaceCase()`

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

