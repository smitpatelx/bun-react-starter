## Boggle (Find all possible words in a board of characters)

**Problem title:** Boggle (Find all possible words in a board of characters)

Given a 2D board of characters and a list of valid words, find all words that can be formed in the board by connecting adjacent letters (horizontally, vertically, or diagonally). Each letter cell may only be used once per word.
***
## Examples
- Input: 
  ```ts
  const TEST_CASES = [
    {
      board: [
        ['o', 'p', 'l', 'b', 'o'],
        ['a', 'p', 'b', 'a', 'n'],
        ['e', 'p', 'a', 'n', 'a'],
        ['i', 'l', 'i', 'o', 'o'],
        ['o', 'n', 'a', 'p', 'e'],
        ['o', 'e', 'p', 'o', 'l'],
      ],
      words: ["apple", "banana", "grape", "peach", "pineapple"],
      expected: ["apple", "banana"]
    },
    {
      board: [
        ['t', 'e', 's', 't', 'b'],
        ['o', 'g', 'g', 'l', 'e'],
        ['b', 'a', 'g', 'l', 'e'],
        ['l', 'e', 'g', 't', 'a'],
        ['g', 'a', 't', 'a', 'g']
      ],
      words: ["test", "boggle", "bag", "leg", "tag"],
      expected: ["test", "boggle", "bag", "leg", "tag"]
    }
  ]
  ```
  Output: `["apple", "banana", "pineapple"]`  
  Explanation: The words "apple", "banana", and "pineapple" can be formed in the board.
***
## Constraints
- `1 <= board.length, board[i].length <= 10`
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 10`
- `board` and `words[i]` consist of lowercase English letters.
- All the words in `words` are not unique.
- You can not use the same letter cell more than once for a single word.
***

## Function signature (JavaScript)

```ts
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
  // your code to find words in the boggle board goes here
}
```
