/**
 * Thuật toán: Tìm kiếm nhị phân cơ bản
 * Yêu cầu: Mảng đã được sắp xếp tăng dần và KHÔNG bị xoay
 * Độ phức tạp: O(log n)
 */
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    
    if (nums[mid] < target) {
      left = mid + 1; // Bỏ nửa trái
    } else {
      right = mid - 1; // Bỏ nửa phải
    }
  }

  return -1; // Không tìm thấy
}

// ================= TEST CASES =================
function runTests() {
  const testCases = [
    {
      nums: [1, 3, 5, 7, 9, 11, 15],
      target: 9,
      expected: 4,
      explanation: "Tìm thấy target ở giữa mảng (Happy Path)"
    },
    {
      nums: [1, 3, 5, 7, 9, 11, 15],
      target: 1,
      expected: 0,
      explanation: "Tìm thấy target ở cực trái (Boundary)"
    },
    {
      nums: [1, 3, 5, 7, 9, 11, 15],
      target: 15,
      expected: 6,
      explanation: "Tìm thấy target ở cực phải (Boundary)"
    },
    {
      nums: [1, 3, 5, 7, 9, 11, 15],
      target: 8,
      expected: -1,
      explanation: "Target không tồn tại trong mảng"
    },
    {
      nums: [],
      target: 5,
      expected: -1,
      explanation: "Mảng rỗng (Edge Case)"
    },
    {
      nums: [5],
      target: 5,
      expected: 0,
      explanation: "Mảng có 1 phần tử và tìm thấy"
    }
  ];

  let allPassed = true;

  testCases.forEach(({ nums, target, expected, explanation }, index) => {
    const result = binarySearch(nums, target);

    if (result !== expected) {
      console.error(`❌ Test case ${index + 1} failed.`);
      console.error(`   Input: nums = [${nums.join(', ')}], target = ${target}`);
      console.error(`   Expected: ${expected}`);
      console.error(`   Got: ${result}`);
      console.error(`   Explanation: ${explanation}`);
      allPassed = false;
    } else {
      console.log(`✓ Test case ${index + 1} passed: ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🎉 All test cases passed! Bạn đã hoàn thành xuất sắc.");
  } else {
    console.log("\n❌ Some test cases failed. Hãy kiểm tra lại code nhé.");
  }
}

// Run tests
runTests();
