import { describe, expect, test } from "bun:test";

/**
 * Calculate length of longest substring without repeating characters
 */

const TEST_DATA = [
  { input: 'abcabcbb', expected: 3 },
  { input: 'bbbbb', expected: 1 },
  // { input: 'pwwkew', expected: 3 },
  // { input: '', expected: 0 },
  // { input: 'dvdf', expected: 3 },
  // { input: 'anviaj', expected: 5 },
  // { input: 'tmmzuxt', expected: 5 },
];

function totalChars(s: string): number {
  if (s.trim().length === 0) {
    return 0;
  }
  const substringMap = new Map();
  for (let i = 0; i <= s.length; i++) {
    if (substringMap.size === 0) {
      substringMap.set(s[i], 1);
    }
    if (substringMap.has(s[i])) {
      const existingCount = substringMap.get(s[i]);
      substringMap.set(s[i], existingCount+1);
    }
  }
  return substringMap.size;
}

function longestSubstringWithoutRepeatingCharacters(s: string): string {
  if (s.trim().length === 0) {
    return s;
  }
  let stringArray: string[] = [];
  for (let i = 0; i <= s.length; i++) {
    const currentChar = s?.[i];
    if (!currentChar) {
      continue;
    }
    if (stringArray.slice(-1)?.[0] === s[i]) {
      stringArray = [currentChar];
    } else {
      stringArray.push(currentChar);
    }
  }
  return stringArray.join('');
}

describe("Longest Substring Tests", () => {
  for (const { input, expected } of TEST_DATA) {
    test(`Longest Substring of ${input}`, () => {
      const result = longestSubstringWithoutRepeatingCharacters(input);
      console.log({ input, output: result })
      expect(result.length).toEqual(expected);
    });
  }
});
