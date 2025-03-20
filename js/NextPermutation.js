// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
//
//     For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
//     The next permutation of an array of integers is the next lexicographically greater permutation of its integer.
//     More formally, if all the permutations of the array are sorted in one container according to their lexicographical order,
//     then the next permutation of that array is the permutation that follows it in the sorted container.
//     If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).
//
// For example, the next permutation of arr = [1,2,3] is [1,3,2].
//     Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
//     While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
//     Given an array of integers nums, find the next permutation of nums.
//
//     The replacement must be in place and use only constant extra memory.
//
//
//
//     Example 1:
//
// Input: nums = [1,2,3]
// Output: [1,3,2]
// Example 2:
//
// Input: nums = [3,2,1]
// Output: [1,2,3]
// Example 3:
//
// Input: nums = [1,1,5]
// Output: [1,5,1]
//
//
// Constraints:
//
//     1 <= nums.length <= 100
// 0 <= nums[i] <= 100

function testNextPermutation() {
    // Test case 1: [1,2,3] -> [1,3,2]
    let nums1 = [1,2,3];
    let expected1 = [1,3,2];
    const r1 = nextPermutation(nums1);
    console.assert(r1.join() === expected1.join(),
        `Test 1 Failed: Expected ${expected1}, got ${r1}`);

    // Test case 2: [3,2,1] -> [1,2,3]
    let nums2 = [3,2,1];
    let expected2 = [1,2,3];
    const r2 = nextPermutation(nums2);
    console.assert(r2.join() === expected2.join(),
        `Test 2 Failed: Expected ${expected2}, got ${r2}`);

    // Test case 3: [1,1,5] -> [1,5,1]
    let nums3 = [1,1,5];
    let expected3 = [1,5,1];
    const r3 = nextPermutation(nums3);
    console.assert(r3.join() === expected3.join(),
        `Test 3 Failed: Expected ${expected3}, got ${r3}`);

    // Additional test cases
    // Test case 4: Single element [1] -> [1]
    let nums4 = [1];
    let expected4 = [1];
    const r4 = nextPermutation(nums4);
    console.assert(r4.join() === expected4.join(),
        `Test 4 Failed: Expected ${expected4}, got ${r4}`);

    // Test case 5: Two elements [1,2] -> [2,1]
    let nums5 = [1,2];
    let expected5 = [2,1];
    const r5 = nextPermutation(nums5);
    console.assert(r5.join() === expected5.join(),
        `Test 5 Failed: Expected ${expected5}, got ${r5}`);

    // Test case 6: Duplicate elements [1,3,2] -> [2,1,3]
    let nums6 = [1,3,2];
    let expected6 = [2,1,3];
    const r6 = nextPermutation(nums6);
    console.assert(r6.join() === expected6.join(),
        `Test 6 Failed: Expected ${expected6}, got ${r6}`);

    console.log("All tests completed");
}

function nextPermutation(nums) {
    // Step 1: Find first pair where nums[i] < nums[i+1] from right
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // Step 2: If no such pair, reverse entire array
    if (i < 0) {
        nums.reverse();
        return nums;
    }

    // Step 3: Find number just larger than nums[i]
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
        j--;
    }

    // Step 4: Swap the two numbers
    [nums[i], nums[j]] = [nums[j], nums[i]];

    // Step 5: Reverse subarray after position i
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }

    // Step 6: Return modified array
    return nums;
}

// Run the tests
testNextPermutation();