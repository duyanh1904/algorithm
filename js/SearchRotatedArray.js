/**
 * Search in Rotated Sorted Array
 *
 * There is an integer array nums sorted in ascending order (with distinct values).
 * Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length)
 * such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
 *
 * Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * @param {number[]} nums - The rotated sorted array
 * @param {number} target - The target value to search for
 * @return {number} - Index of target if found, -1 otherwise
 */
function searchRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // If we find the target, return its index
    if (nums[mid] === target) {
      return mid;
    }

    // Check if the left half is sorted (nums[left] <= nums[mid])
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      // Check if target is in the left half range
      if (target >= nums[left] && target < nums[mid]) {
        // Target is in the left half, search left
        right = mid - 1;
      } else {
        // Target is in the right half, search right
        left = mid + 1;
      }
    } else {
      // Right half is sorted (nums[mid] < nums[right])
      // Check if target is in the right half range
      if (target > nums[mid] && target <= nums[right]) {
        // Target is in the right half, search right
        left = mid + 1;
      } else {
        // Target is in the left half, search left
        right = mid - 1;
      }
    }
  }

  // Target not found
  return -1;
}

// Test Cases
function runTests() {
  const testCases = [
    {
      nums: [4, 5, 6, 7, 0, 1, 2],
      target: 0,
      expected: 4,
      explanation: "Target 0 is at index 4"
    },
    {
      nums: [4, 5, 6, 7, 0, 1, 2],
      target: 3,
      expected: -1,
      explanation: "Target 3 is not in the array"
    },
    {
      nums: [1],
      target: 0,
      expected: -1,
      explanation: "Single element array, target not found"
    },
    {
      nums: [1],
      target: 1,
      expected: 0,
      explanation: "Single element array, target found at index 0"
    },
    {
      nums: [3, 1],
      target: 1,
      expected: 1,
      explanation: "Rotated array [3,1], target 1 at index 1"
    },
    {
      nums: [3, 1],
      target: 3,
      expected: 0,
      explanation: "Rotated array [3,1], target 3 at index 0"
    },
    {
      nums: [5, 6, 7, 8, 9, 1, 2, 3, 4],
      target: 1,
      expected: 5,
      explanation: "Large rotated array, target 1 at index 5"
    },
    {
      nums: [5, 6, 7, 8, 9, 1, 2, 3, 4],
      target: 9,
      expected: 4,
      explanation: "Large rotated array, target 9 at index 4"
    },
    {
      nums: [5, 6, 7, 8, 9, 1, 2, 3, 4],
      target: 10,
      expected: -1,
      explanation: "Large rotated array, target 10 not found"
    },
    {
      nums: [2, 3, 4, 5, 6, 7, 8, 9, 1],
      target: 1,
      expected: 8,
      explanation: "Rotated by 1 position, target 1 at last index"
    },
    {
      nums: [2, 3, 4, 5, 6, 7, 8, 9, 1],
      target: 2,
      expected: 0,
      explanation: "Rotated by 1 position, target 2 at first index"
    }
  ];

  let allPassed = true;

  testCases.forEach(({ nums, target, expected, explanation }, index) => {
    const result = searchRotatedArray(nums, target);

    if (result !== expected) {
      console.error(`Test case ${index + 1} failed.`);
      console.error(`Input: nums = [${nums.join(', ')}], target = ${target}`);
      console.error(`Expected: ${expected}`);
      console.error(`Got: ${result}`);
      console.error(`Explanation: ${explanation}`);
      allPassed = false;
    } else {
      console.log(`✓ Test case ${index + 1} passed: ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🎉 All test cases passed!");
  } else {
    console.log("\n❌ Some test cases failed.");
  }
}

// Run tests
runTests();
