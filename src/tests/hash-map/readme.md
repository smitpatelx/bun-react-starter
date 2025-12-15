**Problem title:** Longest Substring Without Repeating Characters (using `Map`)

Given a string `s`, return the length of the longest substring without repeating characters.  

You must write an efficient solution that uses JavaScript’s `Map` data structure to track characters and their most recent indices.

***

## Examples

- Input: `s = "abcabcbb"`  
  Output: `3`  
  Explanation: The answer is `"abc"`, with length 3.

- Input: `s = "bbbbb"`  
  Output: `1`  
  Explanation: The answer is `"b"`, with length 1.

- Input: `s = "pwwkew"`  
  Output: `3`  
  Explanation: The answer is `"wke"`, with length 3.

***

## Constraints

- `1 <= s.length <= 10^5`  
- `s` consists of printable ASCII characters.  

Time complexity should be \(O(n)\), where \(n\) is the length of the string, by scanning the string once and using a `Map` for constant-time lookups and updates.

***

## Function signature (JavaScript)

```ts
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // your code using Map goes here
}
```


const grid = [
  ['a', 'p', 'p', 'l'],
  ['b', 'a', 'l', 'l'],
  ['a', 'e', 'p', 'a'],
  ['a', 'p', 'a', 'n']
]

apple, banana, pineapple