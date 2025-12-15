import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs";

function writeTraceMap(traceMap: unknown) {
  const FILE_NAME = 'trace-map.json';
  const CURRENT_DIR = __dirname;

  const filePath = path.join(CURRENT_DIR, FILE_NAME);
  const dataToWrite = typeof traceMap !== 'string' ? JSON.stringify(traceMap, null, 2) : traceMap;

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }
  fs.writeFileSync(filePath, dataToWrite);
}

/**
 * Boggle (Find all possible words in a board of characters)
 */

type LocationTuple = [number, number];
type TraceMap = {
  node: LocationTuple,
  paths: TraceMap[]
};

/**
 * [
 *  {
 *    node: [2,1],
 *    paths: [
 *      {
 *        node: [3, 0],
 *        paths: [
 *          {
 *            node: []
 *          }
 *        ] 
 *      },
 *      {
 *        node: [3, 2],
 *        paths: [
 *          {
 *            node: [4, 1],
 *            path: [
 *              {
 *                node: [4,2],
 *                path: [
 *                  {
 *                     node: [5,2],
 *                     path: [
 *                        { node: [4, 3] }
 *                     ]
 *                  }
 *                ]
 *              }
 *            ]
 *          }
 *        ]
 *      }     
 *    ]
 *  }
 * ]
 */
const traceMaps: TraceMap[] = []; 

const grid = [
  ['o', 'p', 'l', 'b', 'o'],
  ['a', 'p', 'b', 'a', 'n'],
  ['e', 'p', 'a', 'n', 'a'],
  ['i', 'l', 'i', 'o', 'o'],
  ['o', 'n', 'a', 'p', 'e'],
  ['o', 'e', 'p', 'o', 'l'],
]

// const words = ['apple', 'banana', 'pineapple'];
// const words = ['banana'];
// const words = ['apple'];
const words = ['pineapple'];

// const expected = new Set(['apple', 'banana', 'pineapple']);
// const expected = new Set(['banana']);
// const expected = new Set(['apple']);
const expected = new Set(['pineapple']);

function generateAssociatedNodes([y, x]: LocationTuple, yMaxLength: number, xMaxLength: number): Array<LocationTuple> {
  const allPossibleNeighbors: Array<LocationTuple> = [
    [y-1, x-1],
    [y-1, x],
    [y-1, x+1],
    [y, x-1],
    [y, x+1],
    [y+1, x-1],
    [y+1, x],
    [y+1, x+1]
  ];
  return allPossibleNeighbors.filter(([i, j]) => {
    return i >= 0 && j >= 0 && i <= (yMaxLength-1) && j <= (xMaxLength-1);
  });
}



function backtrack(
  word: string,
  currentLocation: LocationTuple,
  gridYLength: number,
  gridXLength: number,
  defaultVisitedLocations: Array<LocationTuple>,
  traceMapPath: TraceMap['paths'],
  defaultCharFound = false,
): [boolean, TraceMap['paths']] {
  if (word.length === 0) {
    console.log("Search path completed !!!!!!!!!!");
    return [defaultCharFound, [...traceMapPath]];
  }

  let charFound = defaultCharFound;

  const visitedLocations = [currentLocation,...defaultVisitedLocations.filter(([y1, x1]) => y1 !== currentLocation[0] && x1 !== currentLocation[1])];
  
  for (let i = 0; i < word.length; i++) {
    const matchedLocations: Array<LocationTuple> = [];

    const currentChar = word?.[i];
    if (currentChar === undefined) {
      throw new Error('Char at index not found');
    }

    const associatedNodes = generateAssociatedNodes(currentLocation, gridYLength, gridXLength);

    for (const [y,x] of associatedNodes) {
      if (visitedLocations.find(([y1, x1]) => y1 === y && x1 === x) !== undefined) {
        continue;
      }

      const associatedChar = grid?.[y]?.[x];
      if (!associatedChar) {
        throw new Error(`Error to find valid grid location for y:${y} x:${x}`);
      }

      if (currentChar === associatedChar) {
        matchedLocations.push([y, x]);
      }
    }

    console.log({word, wordSlice: word.slice(1), visitedLocations})
    if (matchedLocations.length > 1) {
      const newSlice = word.slice(1);
      for (const ml of matchedLocations) {
        const visitedLocationsMl = [...visitedLocations];
        const [charFoundBt, traceMapPathBt] = backtrack(newSlice, ml, gridYLength, gridXLength, [...visitedLocationsMl], [...traceMapPath], charFound);
        charFound = charFound || charFoundBt;
        traceMapPath.push({ node: ml, paths: traceMapPathBt });
        if (!charFound) {
          continue;
        }
        console.log("Multiple: ",{ currentChar, ml, charFound })
        break;
      }
    } else if (matchedLocations.length === 1 && matchedLocations?.[0]) {
      charFound = true;
      visitedLocations.push(matchedLocations[0]);
      traceMapPath.push({ node: matchedLocations[0], paths: [] });
      console.log("Single: ", { currentChar, ml: matchedLocations[0], charFound  })
    } else {
      charFound = false;
    }
  }

  return [charFound, [...traceMapPath]]
}

// function backtrack(word: string, y: number, x: number, visited: boolean[][]) {
//   if (word.length === 0) return true;
//   const directions = [
//     [-1, -1], [-1, 0], [-1, 1],
//     [0, -1],          [0, 1],
//     [1, -1],  [1, 0], [1, 1]
//   ];
//   visited[y][x] = true;
//   for (const [dy, dx] of directions) {
//     const ny = y + (dy ?? 0), nx = x + (dx ?? 0);
//     if (
//       ny >= 0 && ny < grid.length &&
//       nx >= 0 && nx < (grid?.[0] ?? []).length &&
//       !visited?.[ny]?.[nx] &&
//       grid?.[ny]?.[nx] &&
//       grid?.[ny]?.[nx] === word[0]
//     ) {
//       if (backtrack(word.slice(1), ny, nx, visited)) {
//         visited[y][x] = false;
//         return true;
//       }
//     }
//   }
//   visited[y][x] = false;
//   return false;
// }

function isWordFound(word: string): boolean {
  const gridYLength = grid.length;
  const gridXLength = grid?.[0]?.length ?? 0;

  const startingLocations = new Set<LocationTuple>();

  // const visited: boolean[][] = Array(gridYLength).fill(Array(gridXLength).fill(false));

  for (let y = 0; y < gridYLength; y++) {
    for (let x = 0; x < gridXLength; x++) {

      const charOnGrid = grid?.[y]?.[x];
      if (word[0] === charOnGrid) {
        startingLocations.add([y, x]);
        // const wordMatched = backtrack(word, [y, x], gridYLength, gridXLength, visitedLocations);
        // if (wordMatched) {
        //   return true;
        // }
      }
    }
  }
  // return isMatched;

  // console.log({startingLocations})

  for (const startingLocation of startingLocations) {
    const visitedLocations: Array<LocationTuple> = [];

    console.log({ startingLocation });

    let traceMapPaths: TraceMap['paths'] = [];
    
    const [wordMatched, traceMapPathBt] = backtrack(word.slice(1), startingLocation, gridYLength, gridXLength, [...visitedLocations], [...traceMapPaths]);
    traceMaps.push({ node: startingLocation, paths: traceMapPathBt });
    // const visited: boolean[][] = Array(gridYLength).fill(Array(gridXLength).fill(false));
    // console.log({visited})

    if (wordMatched) {
      return true;
    }
  }
  return false;
}

function findWords(wordList: string[]): Set<string> {
  const foundWords = new Set<string>();

  for (const word of wordList) {
    if (isWordFound(word)) {
      foundWords.add(word);
    }
  }

  // console.info("\n\nTraceMaps:");
  // console.dir(traceMaps, {depth:99});
  // writeTraceMap(traceMaps);

  return foundWords;
}

describe('Test for character grid search:', () => {
  test(`Test for ${words.join(', ')}`, () => {
    const result = findWords(words);

    console.log("Result: ", result);

    expect(result.size).toBe(expected.size);
    for (const expectedStr of expected) {
      expect(result.has(expectedStr)).toBeTrue();
    }
  })
});