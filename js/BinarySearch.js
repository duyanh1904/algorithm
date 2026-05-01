/**
 * Thuật toán: Tìm kiếm nhị phân trên mảng bị xoay (Search in Rotated Sorted Array)
 * Độ phức tạp: O(log n)
 */
function searchRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // Nếu tìm thấy, trả về luôn
    if (nums[mid] === target) return mid;

    // BƯỚC QUAN TRỌNG: Xác định xem nửa trái hay nửa phải đang được sắp xếp chuẩn (không bị gãy)
    
    // Trường hợp 1: Nửa bên trái đang được sắp xếp chuẩn
    if (nums[left] <= nums[mid]) {
      // Kiểm tra xem target có nằm lọt trong nửa trái này không
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1; // Có -> Thu hẹp về bên trái
      } else {
        left = mid + 1;  // Không -> Chắc chắn nằm ở bên phải
      }
    } 
    // Trường hợp 2: Nửa bên trái bị gãy -> Nửa bên phải chắc chắn được sắp xếp chuẩn
    else {
      // Kiểm tra xem target có nằm lọt trong nửa phải này không
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;  // Có -> Thu hẹp về bên phải
      } else {
        right = mid - 1; // Không -> Chắc chắn nằm ở bên trái
      }
    }
  }

  return -1; // Không tìm thấy
}

// ================= TEST CASES =================
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
