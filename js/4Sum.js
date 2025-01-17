function fourSum(nums, target) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  const res = []

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue

      let left = j + 1
      let right = n - 1

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right]
        console.log(
          nums,
          nums[i],
          nums[j],
          nums[left],
          left,
          nums[right],
          right
        )

        if (sum === target) {
          res.push([nums[i], nums[j], nums[left], nums[right]])
          while (left < right && nums[left] === nums[left + 1]) left++
          while (left < right && nums[right] === nums[right - 1]) right--
          left++
          right--
        } else if (sum < target) {
          left++
        } else {
          right--
        }
      }
    }
  }

  return res
}

// Test Cases
function runTests() {
  const testCases = [
    {
      input: { nums: [1, 0, -1, 0, -2, 2], target: 0 },
      expected: [
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ],
    },
    {
      input: { nums: [2, 2, 2, 2, 2], target: 8 },
      expected: [[2, 2, 2, 2]],
    },
    {
      input: { nums: [0, 0, 0, 0], target: 0 },
      expected: [[0, 0, 0, 0]],
    },
    {
      input: { nums: [-3, -2, -1, 0, 0, 1, 2, 3], target: 0 },
      expected: [
        [-3, -2, 2, 3],
        [-3, -1, 1, 3],
        [-3, 0, 0, 3],
        [-3, 0, 1, 2],
        [-2, -1, 0, 3],
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ],
    },
    {
      input: { nums: [], target: 0 },
      expected: [],
    },
  ]

  let allPassed = true

  testCases.forEach(({ input, expected }, index) => {
    const { nums, target } = input
    const result = fourSum(nums, target)

    // Sort result and expected to avoid mismatch due to order
    const sortedResult = result.map((arr) => arr.sort((a, b) => a - b)).sort()
    const sortedExpected = expected
      .map((arr) => arr.sort((a, b) => a - b))
      .sort()

    if (JSON.stringify(sortedResult) !== JSON.stringify(sortedExpected)) {
      console.error(`Test case ${index + 1} failed.`)
      console.error(`Input: nums = ${nums}, target = ${target}`)
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
