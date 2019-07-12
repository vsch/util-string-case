'use strict';

const isFunction = require('lodash.isfunction');
const isString = require('lodash.isstring');

const utilTypeFuncs = require('util-type-funcs');
const toNumberOrDefault = utilTypeFuncs.toNumberOrDefault;
const isNumeric = utilTypeFuncs.isNumeric;

const EMPTY = 0x0001;
const NUL = 0x0002;
const CTRL = 0x0004;
const SPACE = 0x0008;
const UNDER = 0x0010;
const DOT = 0x0020;
const DASH = 0x0040;
const SLASH = 0x0080;
const DIGITS = 0x0100;
const LOWER = 0x0200;
const UPPER = 0x0400;
const SYMBOLS = 0x0800;
const OTHER = 0x1000;
const NOT_DEFINED = 0x2000;

const LOWER_TO_UPPER = 0x00010000;
const UNDER_TO_UPPER = 0x00010000;
const DASH_TO_UPPER = 0x00020000;
const UPPER_TO_LOWER = 0x00020000;

const LETTER = LOWER | UPPER;
const ALPHANUMERIC = LOWER | UPPER | DIGITS;
const SEPARATOR = UNDER | DOT | DASH | SLASH;

// flags for ascii characters
const ASCII_FLAGS = [
    0x0002, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004,
    0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004, 0x0004,
    0x0008, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0040, 0x0020, 0x0080,
    0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0100, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800,
    0x0800, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400,
    0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0800, 0x0800, 0x0800, 0x0800, 0x0010,
    0x0800, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200,
    0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0800, 0x0800, 0x0800, 0x0800, 0x0800,
    0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000,
    0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000,
    0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x0200, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000,
    0x1000, 0x1000, 0x1000, 0x1000, 0x1000, 0x0200, 0x1000, 0x1000, 0x1000, 0x1000, 0x0200, 0x1000, 0x1000, 0x1000, 0x1000, 0x1000,
    0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400,
    0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x1000, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0400, 0x0200,
    0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200,
    0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x1000, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200, 0x0200,
];

function isSeparatorChar(separator) {
    return separator < ASCII_FLAGS.length ? ASCII_FLAGS[separator] & SEPARATOR : 0;
}

function charFlags(c) {
    if (c >= 0 && c < ASCII_FLAGS.length) return ASCII_FLAGS[c];
    else {
        const char = String.fromCharCode(c);

        if (char === undefined) return NOT_DEFINED;
        else if (char === char.toLocaleLowerCase()) return LOWER;
        else if (char === char.toLocaleUpperCase()) return UPPER;
        else return OTHER;
    }
}

function asciiFlags(arg) {
    if (isString(arg)) {
        const word = arg;
        const iMax = word.length;
        let flags = 0;

        if (iMax === 0) flags |= EMPTY;
        else {
            for (let i = 0; i < iMax; i++) {
                const c = word.charCodeAt(i);
                flags |= charFlags(c);
            }
        }
        return flags;
    } else {
        return charFlags(arg);
    }
}

function someFlags(wordFlags, flags) {
    return (wordFlags & flags) !== 0;
}

function noneFlags(wordFlags, flags) {
    return (wordFlags & flags) === 0;
}

function onlyFlags(wordFlags, flags) {
    return someFlags(wordFlags, flags) && noneFlags(wordFlags, ~flags);
}

function isFlags(wordFlags, flags) {
    return wordFlags === flags;
}

function allFlags(wordFlags, flags) {
    return (wordFlags & flags) === flags;
}

function isUpperCase(c) {
    return someFlags(asciiFlags(c), UPPER);
}

function isLowerCase(c) {
    return someFlags(asciiFlags(c), LOWER);
}

function isDigit(c) {
    return someFlags(asciiFlags(c), DIGITS);
}

function StringCase(word, separators = SEPARATOR) {
    this.mySeparators = toNumberOrDefault(separators, SEPARATOR);
    this.original = word;
    this.myFirstFlags = word.length === 0 ? EMPTY : asciiFlags(word.charCodeAt(0));
    this.mySecondFlags = word.length < 2 ? EMPTY : asciiFlags(word.charCodeAt(1));
    this.myWordFlags = asciiFlags(word);
    this.myLastFlags = word.length === 0 ? EMPTY : asciiFlags(word.charCodeAt(word.length - 1));
}

module.exports.StringCase = StringCase;
module.exports.default = StringCase;

// static functions
StringCase.isSeparatorChar = isSeparatorChar;
StringCase.charFlags = charFlags;
StringCase.asciiFlags = asciiFlags;
StringCase.someFlags = someFlags;
StringCase.noneFlags = noneFlags;
StringCase.onlyFlags = onlyFlags;
StringCase.isFlags = isFlags;
StringCase.allFlags = allFlags;
StringCase.isUpperCase = isUpperCase;
StringCase.isLowerCase = isLowerCase;
StringCase.isDigit = isDigit;
StringCase.of = function (word, separators = SEPARATOR) {
    return new StringCase(word, separators);
};

// add statics
StringCase.EMPTY = EMPTY;
StringCase.NUL = NUL;
StringCase.CTRL = CTRL;
StringCase.SPACE = SPACE;
StringCase.UNDER = UNDER;
StringCase.DOT = DOT;
StringCase.DASH = DASH;
StringCase.SLASH = SLASH;
StringCase.DIGITS = DIGITS;
StringCase.LOWER = LOWER;
StringCase.UPPER = UPPER;
StringCase.SYMBOLS = SYMBOLS;
StringCase.OTHER = OTHER;
StringCase.NOT_DEFINED = NOT_DEFINED;
StringCase.LOWER_TO_UPPER = LOWER_TO_UPPER;
StringCase.UNDER_TO_UPPER = UNDER_TO_UPPER;
StringCase.DASH_TO_UPPER = DASH_TO_UPPER;
StringCase.UPPER_TO_LOWER = UPPER_TO_LOWER;
StringCase.LETTER = LETTER;
StringCase.ALPHANUMERIC = ALPHANUMERIC;
StringCase.SEPARATOR = SEPARATOR;

StringCase.prototype.some = function (flags) { return someFlags(this.myWordFlags, flags); };
StringCase.prototype.none = function (flags) { return noneFlags(this.myWordFlags, flags); };
StringCase.prototype.only = function (flags) { return onlyFlags(this.myWordFlags, flags); };
StringCase.prototype.is = function (flags) { return isFlags(this.myWordFlags, flags); };
StringCase.prototype.all = function (flags) { return allFlags(this.myWordFlags, flags); };
StringCase.prototype.first = function (flags) { return someFlags(this.myFirstFlags, flags) && onlyFlags(this.myFirstFlags, flags); };
StringCase.prototype.second = function (flags) { return someFlags(this.mySecondFlags, flags) && onlyFlags(this.mySecondFlags, flags); };
StringCase.prototype.last = function (flags) { return someFlags(this.myLastFlags, flags) && onlyFlags(this.myLastFlags, flags); };
StringCase.prototype.identifier = function () { return this.only(LOWER | UPPER | DIGITS | UNDER) && this.first(LOWER | UPPER | UNDER); };
StringCase.prototype.isMixedCamelCase = function () { return this.only(LOWER | UPPER | DIGITS) && this.all(LOWER | UPPER) && this.first(LOWER | UPPER); };
StringCase.prototype.isMixedSnakeCase = function () { return this.only(UNDER | LOWER | UPPER | DIGITS) && this.all(UNDER | LOWER | UPPER) && this.first(LOWER | UPPER); };
StringCase.prototype.isMixedDashCase = function () { return this.only(DASH | UPPER | LOWER | DIGITS) && this.all(DASH | UPPER | LOWER) && this.first(DASH | UPPER | LOWER); };
StringCase.prototype.isMixedDotCase = function () { return this.only(DOT | UPPER | LOWER | DIGITS) && this.all(DOT | UPPER | LOWER) && this.first(DOT | UPPER | LOWER); };
StringCase.prototype.isMixedSlashCase = function () { return this.only(SLASH | UPPER | LOWER | DIGITS) && this.all(SLASH | UPPER | LOWER) && this.first(SLASH | UPPER | LOWER); };
StringCase.prototype.isMixedSpaceCase = function () { return this.only(SPACE | UPPER | LOWER | DIGITS) && this.all(SPACE | UPPER | LOWER) && this.first(UPPER | LOWER); };
StringCase.prototype.isScreamingSnakeCase = function () { return this.only(UNDER | UPPER | DIGITS) && this.all(UNDER | UPPER) && this.first(UNDER | UPPER); };
StringCase.prototype.isScreamingDashCase = function () { return this.only(DASH | UPPER | DIGITS) && this.all(DASH | UPPER) && this.first(DASH | UPPER); };
StringCase.prototype.isScreamingDotCase = function () { return this.only(DOT | UPPER | DIGITS) && this.all(DOT | UPPER) && this.first(DOT | UPPER); };
StringCase.prototype.isScreamingSlashCase = function () { return this.only(SLASH | UPPER | DIGITS) && this.all(SLASH | UPPER) && this.first(SLASH | UPPER); };
StringCase.prototype.isScreamingSpaceCase = function () { return this.only(SPACE | UPPER | DIGITS) && this.all(SPACE | UPPER) && this.first(UPPER); };
StringCase.prototype.isSnakeCase = function () { return this.only(UNDER | LOWER | DIGITS) && this.all(UNDER | LOWER) && this.first(UNDER | LOWER); };
StringCase.prototype.isDashCase = function () { return this.only(DASH | LOWER | DIGITS) && this.all(DASH | LOWER) && this.first(DASH | LOWER); };
StringCase.prototype.isDotCase = function () { return this.only(DOT | LOWER | DIGITS) && this.all(DOT | LOWER) && this.first(DOT | LOWER); };
StringCase.prototype.isSlashCase = function () { return this.only(SLASH | LOWER | DIGITS) && this.all(SLASH | LOWER) && this.first(SLASH | LOWER); };
StringCase.prototype.isCapitalizedSpaceCase = function () { return this.only(SPACE | UPPER | LOWER | DIGITS) && this.all(SPACE | UPPER | LOWER) && this.first(UPPER); };
StringCase.prototype.isSpaceCase = function () { return this.only(SPACE | LOWER | DIGITS) && this.all(SPACE | LOWER) && this.first(LOWER); };
StringCase.prototype.hasNoUpperCase = function () { return this.none(UPPER | EMPTY); };
StringCase.prototype.hasNoLowerCase = function () { return this.none(LOWER | EMPTY); };
StringCase.prototype.hasUpperCase = function () { return this.some(UPPER); };
StringCase.prototype.hasLowerCase = function () { return this.some(LOWER); };
StringCase.prototype.hasLowerCaseOrUpperCase = function () { return this.some(LOWER | UPPER); };
StringCase.prototype.isLowerCase = function () { return this.is(LOWER); };
StringCase.prototype.isUpperCase = function () { return this.is(UPPER); };
StringCase.prototype.isCamelCase = function () { return this.isMixedCamelCase() && this.first(LOWER); };
StringCase.prototype.isPascalCase = function () { return this.isMixedCamelCase() && this.first(UPPER) && this.second(LOWER); };

StringCase.prototype.makeMixedSeparatorCase = function (separator, properCaps = undefined) {
    if (isNumeric(separator)) {
        separator = String.fromCharCode(toNumber(separator));
    }

    const iMax = this.original.length;
    const separatorFlags = separator === "" ? 0 : asciiFlags(separator);
    const separators = this.mySeparators | separatorFlags;  // add requested separator to our separators

    let removeSeparator = (separatorFlags & separators) !== 0;
    let wasLower = properCaps;
    let sb = "";
    let toUpper = false;

    for (let i = 0; i < iMax; i++) {
        const char = this.original[i];
        const c = this.original.charCodeAt(i);

        if ((separators & asciiFlags(c)) !== 0) {
            sb += separator;
            toUpper = true;
            wasLower = false;
        } else {
            if (toUpper) {
                if (wasLower) sb += separator;
                sb += char.toLocaleUpperCase();
                toUpper = false;
                wasLower = false;
            } else {
                if (isUpperCase(c)) {
                    if (wasLower) {
                        sb += separator;
                        sb += char;
                    } else if (properCaps) {
                        sb += char.toLocaleLowerCase();
                    } else {
                        sb += char;
                    }
                    wasLower = false;
                } else if (isLowerCase(c)) {
                    sb += char;
                    wasLower = true;
                } else {
                    sb += char;
                    wasLower = false;
                }
            }
        }
    }
    return sb;
};

StringCase.prototype.makeCamelCase = function () {
    let sb = "";
    if (this.some(this.mySeparators)) {
        sb = this.makeMixedSeparatorCase("", true);
        sb = sb[0].toLocaleLowerCase() + sb.substring(1);
    } else if (this.only(UPPER | DIGITS) && this.first(UPPER)) {
        sb += this.original[0];
        sb += this.original.substring(1).toLocaleLowerCase();
    } else {
        sb += this.original;
    }
    return sb;
};

StringCase.prototype.makeProperCamelCase = function () {
    const s = this.makeCamelCase();
    return s.substring(0, 1).toLocaleLowerCase() + s.substring(1);
};

StringCase.prototype.makePascalCase = function () {
    const s = this.makeCamelCase();
    return s.substring(0, 1).toLocaleUpperCase() + s.substring(1);
};

StringCase.prototype.makeProperSnakeCase = function () { return this.makeMixedSeparatorCase('_', true); };
StringCase.prototype.makeProperDotCase = function () { return this.makeMixedSeparatorCase('.', true); };
StringCase.prototype.makeProperDashCase = function () { return this.makeMixedSeparatorCase('-', true); };
StringCase.prototype.makeProperSlashCase = function () { return this.makeMixedSeparatorCase('/', true); };
StringCase.prototype.makeProperSpaceCase = function () { return this.makeMixedSeparatorCase(" ", true);};

StringCase.prototype.makeMixedSnakeCase = function () { return this.makeMixedSeparatorCase('_'); };
StringCase.prototype.makeMixedDotCase = function () { return this.makeMixedSeparatorCase('.'); };
StringCase.prototype.makeMixedDashCase = function () { return this.makeMixedSeparatorCase('-'); };
StringCase.prototype.makeMixedSlashCase = function () { return this.makeMixedSeparatorCase('/'); };
StringCase.prototype.makeMixedSpaceCase = function () { return this.makeMixedSeparatorCase(" ");};

StringCase.prototype.makeScreamingSnakeCase = function () { return this.makeMixedSnakeCase().toLocaleUpperCase();};
StringCase.prototype.makeSnakeCase = function () { return this.makeMixedSnakeCase().toLocaleLowerCase();};
StringCase.prototype.makeScreamingDashCase = function () { return this.makeMixedDashCase().toLocaleUpperCase();};
StringCase.prototype.makeDashCase = function () { return this.makeMixedDashCase().toLocaleLowerCase();};
StringCase.prototype.makeScreamingDotCase = function () { return this.makeMixedDotCase().toLocaleUpperCase();};
StringCase.prototype.makeDotCase = function () { return this.makeMixedDotCase().toLocaleLowerCase();};
StringCase.prototype.makeScreamingSlashCase = function () { return this.makeMixedSlashCase().toLocaleUpperCase();};
StringCase.prototype.makeSlashCase = function () { return this.makeMixedSlashCase().toLocaleLowerCase();};
StringCase.prototype.makeScreamingSpaceCase = function () { return this.makeMixedSlashCase().toLocaleUpperCase();};
StringCase.prototype.makeSpaceCase = function () { return this.makeMixedSpaceCase().toLocaleLowerCase(); };

StringCase.prototype.makeCapitalizedSpaceCase = function () {
    const s = this.makeMixedSpaceCase();
    return s[0] + s.substring(1).toLocaleLowerCase();
};

StringCase.prototype.canBeMixedSnakeCase = function () {
    if (this.only(this.mySeparators | UNDER | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(UNDER | LOWER | UPPER)) {
        const word = this.makeMixedSnakeCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedSnakeCase();
    }
    return false;
};

StringCase.prototype.canBeScreamingSnakeCase = function () {
    if (this.only(this.mySeparators | UNDER | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(UNDER | LOWER | UPPER)) {
        const word = this.makeScreamingSnakeCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isScreamingSnakeCase();
    }
    return false;
};

StringCase.prototype.canBeSnakeCase = function () {
    if (this.only(this.mySeparators | UNDER | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(UNDER | LOWER | UPPER)) {
        const word = this.makeSnakeCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isSnakeCase();
    }
    return false;
};

StringCase.prototype.canBeMixedDashCase = function () {
    if (this.only(this.mySeparators | DASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DASH | LOWER | UPPER)) {
        const word = this.makeMixedDashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedDashCase();
    }
    return false;
};

StringCase.prototype.canBeScreamingDashCase = function () {
    if (this.only(this.mySeparators | DASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DASH | LOWER | UPPER)) {
        const word = this.makeScreamingDashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isScreamingDashCase();
    }
    return false;
};

StringCase.prototype.canBeDashCase = function () {
    if (this.only(this.mySeparators | DASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DASH | LOWER | UPPER)) {
        const word = this.makeDashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isDashCase();
    }
    return false;
};

StringCase.prototype.canBeMixedDotCase = function () {
    if (this.only(this.mySeparators | DOT | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DOT | LOWER | UPPER)) {
        const word = this.makeMixedDotCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedDotCase();
    }
    return false;
};

StringCase.prototype.canBeScreamingDotCase = function () {
    if (this.only(this.mySeparators | DOT | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DOT | LOWER | UPPER)) {
        const word = this.makeScreamingDotCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isScreamingDotCase();
    }
    return false;
};

StringCase.prototype.canBeDotCase = function () {
    if (this.only(this.mySeparators | DOT | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(DOT | LOWER | UPPER)) {
        const word = this.makeDotCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isDotCase();
    }
    return false;
};

StringCase.prototype.canBeMixedSlashCase = function () {
    if (this.only(this.mySeparators | SLASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(SLASH | LOWER | UPPER)) {
        const word = this.makeMixedSlashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedSlashCase();
    }
    return false;
};

StringCase.prototype.canBeScreamingSlashCase = function () {
    if (this.only(this.mySeparators | SLASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(SLASH | LOWER | UPPER)) {
        const word = this.makeScreamingSlashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isScreamingSlashCase();
    }
    return false;
};

StringCase.prototype.canBeSlashCase = function () {
    if (this.only(this.mySeparators | SLASH | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(SLASH | LOWER | UPPER)) {
        const word = this.makeSlashCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isSlashCase();
    }
    return false;
};

StringCase.prototype.canBeMixedSpaceCase = function () {
    if (this.only(this.mySeparators | SPACE | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(LOWER | UPPER)) {
        const word = this.makeMixedSpaceCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedSpaceCase();
    }
    return false;
};

StringCase.prototype.canBeScreamingSpaceCase = function () {
    if (this.only(this.mySeparators | SPACE | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(LOWER | UPPER)) {
        const word = this.makeScreamingSpaceCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isScreamingSpaceCase();
    }
    return false;
};

StringCase.prototype.canBeSpaceCase = function () {
    if (this.only(this.mySeparators | SPACE | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(LOWER | UPPER)) {
        const word = this.makeSpaceCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isSpaceCase();
    }
    return false;
};

StringCase.prototype.canBeCapitalizedSpaceCase = function () {
    if (this.only(this.mySeparators | SPACE | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(LOWER | UPPER)) {
        const word = this.makeCapitalizedSpaceCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isCapitalizedSpaceCase();
    }
    return false;
};

StringCase.prototype.canBeCamelCase = function () {
    if (this.only(this.mySeparators | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(this.mySeparators | LOWER | UPPER)) {
        const word = this.makeCamelCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isMixedCamelCase();
    }
    return false;
};

StringCase.prototype.canBeProperCamelCase = function () {
    if (this.only(this.mySeparators | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(this.mySeparators | LOWER | UPPER)) {
        const word = this.makeProperCamelCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isCamelCase();
    }
    return false;
};

StringCase.prototype.canBePascalCase = function () {
    if (this.only(this.mySeparators | UPPER | LOWER | DIGITS) && this.some(LOWER | UPPER) && this.first(this.mySeparators | LOWER | UPPER)) {
        const word = this.makePascalCase();
        return word !== this.original && StringCase.of(word, this.mySeparators).isPascalCase();
    }
    return false;
};
