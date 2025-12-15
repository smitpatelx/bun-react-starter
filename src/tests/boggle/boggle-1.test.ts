import { describe, expect, test } from "bun:test";

/**
 * Boggle (Find all possible words in a board of characters)
 */

function formatArrayOfString(strings: string[]): string {
  const listFormat = new Intl.ListFormat('en', {
    style: "long",
    type: "conjunction",
  });
  return listFormat.format(strings);
}

const TEST_DATA = [
  {
    grid: [
      ['o', 'p', 'l', 'b', 'o'],
      ['a', 'p', 'b', 'a', 'n'],
      ['e', 'p', 'a', 'n', 'a'],
      ['i', 'l', 'i', 'o', 'o'],
      ['o', 'n', 'a', 'p', 'e'],
      ['o', 'e', 'p', 'o', 'l'],
    ],
    tests: [
      {input: ['apple'], expected: new Set(['apple'])},
      {input: ['banana'], expected: new Set(['banana'])},
      {input: ['pineapple'], expected: new Set(['pineapple'])},
      {input: ['strawberry', 'kiwi'], expected: new Set([])},
      {input: ['apple', 'banana', 'pineapple', 'strawberry', 'kiwi'], expected: new Set(['apple', 'banana', 'pineapple'])},
    ]
  }
];

const POSSIBLE_LOCATIONS: [number, number][] = [
  [-1, -1],[-1, 0],[-1, 1],
  [0, -1],         [0, 1],
  [1, -1], [1, 0], [1, 1]
];

function dfs(
  board: string[][],
  row: number,
  col: number,
  rowLength: number,
  colLength: number,
  word: string,
  index: number,
  visited: boolean[][]
): boolean {
  // Check if we reached end of the word
  if (index === word.length) {
    return true;
  }

  // Check if the bounds are correct
  // Check for char at word index
  // Check for visited
  if (row < 0 || row >= rowLength || col < 0 || col >= colLength || (visited?.[row] ?? [])[col] || word[index] !== (board[row] ?? [])[col]) {
    return false;
  }

  let found = false;

  (visited[row] ?? [])[col] = true;

  for (const [y, x] of POSSIBLE_LOCATIONS) {
    const dy = row + y;
    const dx = col + x;

    if (dfs(board, dy, dx, rowLength, colLength, word, index+1, visited)) {
      found = true;
      break;
    }
  }

  (visited[row] ?? [])[col] = false;

  return found;
}


function isWordFound(board: string[][], word: string): boolean {
  const rowLength = board.length;
  const colLength = board?.[0]?.length ?? 0;

  let wordFound = false;

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if (board?.[row]?.[col] === word[0]) {

        const visited: boolean[][] = Array.from({ length: rowLength }, () => Array(colLength).fill(false));
        if (dfs(board, row, col, rowLength, colLength, word, 0, visited)) {
          wordFound = true;
          break;
        }
      }
    }

    if (wordFound) break;
  }

  return wordFound;
}

function findWords(board: string[][], wordList: string[]): Set<string> {
  const foundWords = new Set<string>();

  for (const word of wordList) {
    if (isWordFound(board, word)) {
      foundWords.add(word);
    }
  }

  return foundWords;
}

describe('Test for character grid search:', () => {
  for (const tCase of TEST_DATA) {
    for (const testObj of tCase.tests) {
      test(`Testing input: "${formatArrayOfString(testObj.input)}"`, () => {
        const result = findWords(tCase.grid, testObj.input);
        console.log(result)
        expect(result.size).toBe(testObj.expected.size);
        for (const expectedStr of testObj.expected) {
          expect(result.has(expectedStr)).toBeTrue();
        }
      })
    }
  }
});
