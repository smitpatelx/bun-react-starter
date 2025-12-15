import { describe, expect, test } from "bun:test";

/**
 * Generate Fibonacci test data.
 *
 * Each test case is an array where the first element is the input `n`
 * and the second element is the expected Fibonacci number sequence upto n [0...n].
 */

const TEST_DATA = [
  { input: 0, expected: [] },
  { input: 1, expected: [0] },
  { input: 2, expected: [0, 1] },
  { input: 3, expected: [0, 1, 1] },
  { input: 4, expected: [0, 1, 1, 2] },
  { input: 5, expected: [0, 1, 1, 2, 3] },
  { input: 6, expected: [0, 1, 1, 2, 3, 5] },
  { input: 7, expected: [0, 1, 1, 2, 3, 5, 8] },
  { input: 8, expected: [0, 1, 1, 2, 3, 5, 8, 13] },
  { input: 9, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21] },
  { input: 10, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] },
];

// Big-O Guide
// 1. Calculation not dependent on input size => O(1)
// 2. Loop on n number (n is input parameter) => O(n)
// 3. Nested loops => O(n^2)
// 4. Input size reduced by half => O(log n)

function generateFibonacciSequence(n: number): number[] {
  const sequence: number[] = [];
  for (let i = 0; i < n; i++) {
    if (i < 2) {
      sequence.push(i);
    } else {
      sequence.push((sequence?.[i - 1] ?? 0) + (sequence?.[i - 2] ?? 0));
    }
  }
  return sequence;
}

describe("Fibonacci Sequence Tests", () => {
  for (const { input, expected } of TEST_DATA) {
    test(`Fibonacci sequence up to ${input}`, () => {
      const result = generateFibonacciSequence(input);
      expect(result).toEqual(expected);
    });
  }
});
