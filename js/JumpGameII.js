// You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.
//
// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:
//
// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.
//
//
//
//     Example 1:
//
// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
//     Example 2:
//
// Input: nums = [2,3,0,1,4]
// Output: 2
//
//
//     Constraints:
//
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// It's guaranteed that you can reach nums[n - 1]

function jumpGameII(nums) {
  if (nums.length <= 1) {
    return 0
  }

  let jumps = 0
  let currentEnd = 0
  let farthest = 0

  for (let i = 0; i < nums.length - 1; i++) {
    // Update the farthest we can reach from current position
    farthest = Math.max(farthest, i + nums[i])

    // If we've reached the end of current jump range
    if (i === currentEnd) {
      jumps++
      currentEnd = farthest

      // If we can already reach the end, no need to continue
      if (currentEnd >= nums.length - 1) {
        break
      }
    }
  }

  return jumps
}

// Test Cases
function runTests() {
  const testCases = [
    {
      input: [2, 3, 1, 1, 4],
      expected: 2,
      explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index",
    },
    {
      input: [2, 3, 0, 1, 4],
      expected: 2,
      explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index",
    },
    {
      input: [0],
      expected: 0,
      explanation: "Already at the last index, no jumps needed",
    },
    {
      input: [1],
      expected: 0,
      explanation: "Already at the last index, no jumps needed",
    },
    {
      input: [1, 1, 1, 1],
      expected: 3,
      explanation: "Need 3 jumps: 0->1, 1->2, 2->3",
    },
    {
      input: [2, 1],
      expected: 1,
      explanation: "Jump directly from index 0 to index 1 (2 steps)",
    },
    {
      input: [3, 2, 1],
      expected: 1,
      explanation: "Jump directly from index 0 to index 2 (3 steps)",
    },
    {
      input: [1, 2, 3],
      expected: 2,
      explanation: "Jump 1 step from 0 to 1, then 3 steps from 1 to end",
    },
    {
      input: [2, 1, 0, 1],
      expected: 2,
      explanation: "Jump 1 step from 0 to 1, then 1 step from 1 to 2, then 1 step from 2 to 3",
    },
    {
      input: [5, 4, 3, 2, 1, 0],
      expected: 1,
      explanation: "Jump directly from index 0 to index 5 (5 steps)",
    },
    {
      input: [1, 1, 1, 1, 1],
      expected: 4,
      explanation: "Need 4 jumps to reach the end: 0->1->2->3->4",
    },
    {
      input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      expected: 1,
      explanation: "Jump directly from index 0 to index 10 (10 steps)",
    },
  ]

  let allPassed = true

  testCases.forEach(({ input, expected, explanation }, index) => {
    const result = jumpGameII(input)

    if (result !== expected) {
      console.error(`Test case ${index + 1} failed.`)
      console.error(`Input: [${input.join(', ')}]`)
      console.error(`Expected: ${expected}`)
      console.error(`Got: ${result}`)
      console.error(`Explanation: ${explanation}`)
      allPassed = false
    } else {
      console.log(`Test case ${index + 1} passed: ${explanation}`)
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
