import { describe, expect, test } from "bun:test";

/**
 * Calculate factorial of given number
 */

const TEST_DATA = [
  { input: 0, expected: 1 },
  { input: 1, expected: 1 },
  { input: 2, expected: 2 },
  { input: 3, expected: 6 },
  { input: 4, expected: 24 },
  { input: 5, expected: 120 },
  { input: 6, expected: 720 },
  { input: 7, expected: 5040 },
  { input: 8, expected: 40320 },
  { input: 9, expected: 362880 },
  { input: 10, expected: 3628800 },
];

// Two types of complexity analysis:
// 1. Time Complexity: How the execution time of an algorithm changes with input size.
// 2. Space Complexity: How the memory usage of an algorithm changes with input size.

// Big-O Guide
// 1. Calculation not dependent on input size => O(1)
// 2. Loop on n number (n is input parameter) => O(n)
// 3. Nested loops => O(n^2)
// 4. Input size reduced by half => O(log n)

function factorial(n: number): number {
  let factorial = 1;
  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }
  return factorial;
}

describe("Factorial Tests", () => {
  for (const { input, expected } of TEST_DATA) {
    test(`Factorial of ${input}`, () => {
      const result = factorial(input);
      expect(result).toEqual(expected);
    });
  }
});
