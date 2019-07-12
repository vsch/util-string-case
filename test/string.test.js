"use strict";

const each = require('jest-each').default;
const StringCase = require('util-string-case').default;
const StudiedWord = StringCase;

each([
    ["_A", StringCase.UNDER, true],
    ["_123A", StringCase.UNDER, true],
    ["_123", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_a", StringCase.UNDER, false],
    ["_123a", StringCase.UNDER, false],
    [" _A", StringCase.UNDER, false],
])
    .describe(`isScreamingSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).isScreamingSnakeCase()).toBe(expected);
        });
    });

each([
    ["_a", StringCase.UNDER, true],
    ["_123a", StringCase.UNDER, true],
    ["_123", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["_123A", StringCase.UNDER, false],
    [" _A", StringCase.UNDER, false],
])
    .describe(`isSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).isSnakeCase()).toBe(expected);
        });
    });

each([
    ["aA", StringCase.UNDER, true],
    ["Aa", StringCase.UNDER, true],
    ["123aA", StringCase.UNDER, false],
    ["123Aa", StringCase.UNDER, false],
    ["123a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_a", StringCase.UNDER, false],
    ["_123a", StringCase.UNDER, false],
    ["_123", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["_123A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
])
    .describe(`isCamelCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).isCamelCase()).toBe(expected);
        });
    });

each([
    ["aA", StringCase.UNDER, true],
    ["Aa", StringCase.UNDER, false],
    ["123aA", StringCase.UNDER, false],
    ["123Aa", StringCase.UNDER, false],
    ["Aa", StringCase.UNDER, false],
    ["123a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_a", StringCase.UNDER, false],
    ["_123a", StringCase.UNDER, false],
    ["_123", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["_123A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
])
    .describe(`isProperCamelCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).isProperCamelCase()).toBe(expected);
        });
    });

each([
    ["Aa", StringCase.UNDER, true],
    ["aA", StringCase.UNDER, false],
    ["123aA", StringCase.UNDER, false],
    ["123Aa", StringCase.UNDER, false],
    ["123a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_a", StringCase.UNDER, false],
    ["_123a", StringCase.UNDER, false],
    ["_123", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["_123A", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
])
    .describe(`isPascalCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).isPascalCase()).toBe(expected);
        });
    });

each([
    ["a_", StringCase.UNDER, true],
    ["_a", StringCase.UNDER, true],
    ["aB", StringCase.UNDER, true],
    ["BaA", StringCase.UNDER, true],
    ["Ba", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["A_", StringCase.UNDER, false],
    ["123_", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
])
    .describe(`canBeScreamingSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).canBeScreamingSnakeCase()).toBe(expected);
        });
    });

each([
    ["a_", StringCase.UNDER, false],
    ["_a", StringCase.UNDER, false],
    ["aB", StringCase.UNDER, true],
    ["BaA", StringCase.UNDER, true],
    ["Ba", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["A_", StringCase.UNDER, true],
    ["123_", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
])
    .describe(`canBeSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).canBeSnakeCase()).toBe(expected);
        });
    });

each([
    ["a_a", StringCase.UNDER, true],
    ["a_A", StringCase.UNDER, true],
    ["A_a", StringCase.UNDER, true],
    ["A_A", StringCase.UNDER, true],
    ["A_", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["aB", StringCase.UNDER, false],
    ["Ba", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["a_", StringCase.UNDER, false],
    ["123_", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
])
    .describe(`canBeCamelCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).canBeCamelCase()).toBe(expected);
        });
    });

each([
    ["a_a", StringCase.UNDER, true],
    ["a_A", StringCase.UNDER, true],
    ["A_a", StringCase.UNDER, true],
    ["A_A", StringCase.UNDER, true],
    ["Abc", StringCase.UNDER, false],
    ["A_", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["aB", StringCase.UNDER, false],
    ["Ba", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["a_", StringCase.UNDER, false],
    ["123_", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
])
    .describe(`canBeProperCamelCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).canBeProperCamelCase()).toBe(expected);
        });
    });

each([
    ["a_aa", StringCase.UNDER, false],
    ["aa_a", StringCase.UNDER, true],
    ["aa_aa", StringCase.UNDER, true],
    ["A_AA", StringCase.UNDER, false],
    ["AA_A", StringCase.UNDER, true],
    ["AA_AA", StringCase.UNDER, true],
    ["A_aa", StringCase.UNDER, false],
    ["Aa_a", StringCase.UNDER, true],
    ["Aa_aa", StringCase.UNDER, true],
    ["aBc", StringCase.UNDER, false],
    ["a_Aa", StringCase.UNDER, false],
    ["aa_A", StringCase.UNDER, true],
    ["aa_Aa", StringCase.UNDER, true],
    ["aa_aA", StringCase.UNDER, true],
    ["aBc", StringCase.UNDER, false],
    ["a_a", StringCase.UNDER, false],
    ["a_A", StringCase.UNDER, false],
    ["A_a", StringCase.UNDER, false],
    ["A_A", StringCase.UNDER, false],
    ["A_", StringCase.UNDER, false],
    ["_A", StringCase.UNDER, false],
    ["aB", StringCase.UNDER, false],
    ["Ba", StringCase.UNDER, false],
    ["a", StringCase.UNDER, false],
    ["A", StringCase.UNDER, false],
    ["a_", StringCase.UNDER, false],
    ["123_", StringCase.UNDER, false],
    ["123", StringCase.UNDER, false],
])
    .describe(`canBePascalCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).canBePascalCase()).toBe(expected);
        });
    });

each([
    ["aB", StringCase.UNDER, "a_B"],
    ["aBc", StringCase.UNDER, "a_Bc"],
    ["ABC", StringCase.UNDER, "ABC"],
    ["abcDefHij", StringCase.UNDER, "abc_Def_Hij"],
    ["AbcDefHij", StringCase.UNDER, "Abc_Def_Hij"],
])
    .describe(`makeMixedSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).makeMixedSnakeCase()).toBe(expected);
        });
    });

each([
    ["abcDef", StringCase.UNDER, "abcDef"],
    ["AbcDef", StringCase.UNDER, "AbcDef"],
    ["Abc_Def", StringCase.UNDER, "abcDef"],
    ["abc_def", StringCase.UNDER, "abcDef"],
    ["ABC_DEF", StringCase.UNDER, "abcDef"],
])
    .describe(`makeCamelCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).makeCamelCase()).toBe(expected);
        });
    });

each([
    ["abcDef", StringCase.UNDER, "ABC_DEF"],
    ["AbcDef", StringCase.UNDER, "ABC_DEF"],
    ["Abc_Def", StringCase.UNDER, "ABC_DEF"],
    ["abc_def", StringCase.UNDER, "ABC_DEF"],
    ["ABC_DEF", StringCase.UNDER, "ABC_DEF"],
])
    .describe(`makeScreamingSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).makeScreamingSnakeCase()).toBe(expected);
        });
    });

each([
    ["abcDef", StringCase.UNDER, "abc_def"],
    ["AbcDef", StringCase.UNDER, "abc_def"],
    ["Abc_Def", StringCase.UNDER, "abc_def"],
    ["abc_def", StringCase.UNDER, "abc_def"],
    ["ABC_DEF", StringCase.UNDER, "abc_def"],
])
    .describe(`makeSnakeCase`, (arg, param, expected) => {
        test(`'${arg}' === '${expected}'`, () => {
            expect(StringCase.of(arg, param).makeSnakeCase()).toBe(expected);
        });
    });

