// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
//
//
//
//     Example 1:
//
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
//     Example 2:
//
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
//     Example 3:
//
// Input: intervals = [[4,7],[1,4]]
// Output: [[1,7]]
// Explanation: Intervals [1,4] and [4,7] are considered overlapping.
//
//
//     Constraints:
//
// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

function mergeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0])

  const merged = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]
    const lastMerged = merged[merged.length - 1]

    // If current interval overlaps with the last merged interval
    if (current[0] <= lastMerged[1]) {
      // Merge them by updating the end time
      lastMerged[1] = Math.max(lastMerged[1], current[1])
    } else {
      // No overlap, add current interval to merged array
      merged.push(current)
    }
  }

  return merged
}

// Test Cases
function runTests() {
  const testCases = [
    {
      input: [[1, 3], [2, 6], [8, 10], [15, 18]],
      expected: [[1, 6], [8, 10], [15, 18]],
    },
    {
      input: [[1, 4], [4, 5]],
      expected: [[1, 5]],
    },
    {
      input: [[4, 7], [1, 4]],
      expected: [[1, 7]],
    },
    {
      input: [[1, 4], [0, 4]],
      expected: [[0, 4]],
    },
    {
      input: [[1, 4], [2, 3]],
      expected: [[1, 4]],
    },
    {
      input: [[1, 2], [3, 4], [5, 6]],
      expected: [[1, 2], [3, 4], [5, 6]],
    },
    {
      input: [[]],
      expected: [[]],
    },
    {
      input: [[1, 4]],
      expected: [[1, 4]],
    },
  ]

  let allPassed = true

  testCases.forEach(({ input, expected }, index) => {
    const result = mergeIntervals(input)

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      console.error(`Test case ${index + 1} failed.`)
      console.error(`Input: ${JSON.stringify(input)}`)
      console.error(`Expected: ${JSON.stringify(expected)}`)
      console.error(`Got: ${JSON.stringify(result)}`)
      allPassed = false
    } else {
      console.log(`Test case ${index + 1} passed.`)
    }
  })

  if (allPassed) {
    console.log("All test cases passed!")
  } else {
    console.log("Some test cases failed.")
  }
}

// Run tests
runTests()
