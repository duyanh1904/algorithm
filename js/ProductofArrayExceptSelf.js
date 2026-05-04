/**
 * Bài toán: Product of Array Except Self (LeetCode 238 - Medium)
 * Thuật toán: Prefix and Suffix Products
 * Độ phức tạp: 
 * - Thời gian: O(N) vì chỉ duyệt qua mảng đúng 2 vòng tách biệt.
 * - Không gian: O(1) (Không tính mảng kết quả trả về theo quy chuẩn của LeetCode).
 * Cho một mảng số nguyên nums. Hãy trả về một mảng answer sao cho answer[i] bằng tích của tất cả các phần tử trong mảng nums, ngoại trừ nums[i].🔥 2 Cú Lừa Của Đề Bài (Ràng buộc chết người):Bạn KHÔNG ĐƯỢC PHÉP sử dụng phép chia (Division).Thuật toán phải chạy trong thời gian $O(N)$.Ví dụ:Input: nums = [1, 2, 3, 4]Output: [24, 12, 8, 6](Giải thích: Tại vị trí số 1 là 2*3*4 = 24. Tại vị trí số 2 là 1*3*4 = 12...)
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1); // Mảng kết quả ban đầu toàn số 1

  // BƯỚC 1: Quét từ trái sang phải để tính TÍCH CÁC SỐ BÊN TRÁI
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    // Lưu tích của các số bên trái vào answer[i]
    answer[i] = leftProduct;
    // Cập nhật leftProduct cho phần tử tiếp theo
    leftProduct *= nums[i];
  }

  // Lúc này answer của [1, 2, 3, 4] đang là: [1, 1, 2, 6]

  // BƯỚC 2: Quét từ phải sang trái để tính TÍCH CÁC SỐ BÊN PHẢI và nhân gộp vào
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    // answer[i] đang chứa tích bên trái. Giờ nhân thêm rightProduct (tích bên phải)
    answer[i] *= rightProduct;
    // Cập nhật rightProduct cho phần tử lùi tiếp theo
    rightProduct *= nums[i];
  }

  return answer;
}

// ================= HỆ THỐNG TEST CASES CỰC DỊ =================
function runTests() {
  const isEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

  const testCases = [
    {
      description: "1. Happy Path - Mảng số dương cơ bản",
      nums: [1, 2, 3, 4],
      expected: [24, 12, 8, 6],
      explanation: "Tích toàn cục là 24. Các số là 24/1, 24/2, 24/3, 24/4."
    },
    {
      description: "2. Cú lừa số 0 (Có đúng 1 số 0 trong mảng)",
      nums: [-1, 1, 0, -3, 3],
      expected: [0, 0, 9, 0, 0],
      explanation: "Bất kỳ số nào nhân với 0 cũng bằng 0. Vậy mọi vị trí đều bằng 0, TRỪ vị trí của chính số 0 đó (tích của các số còn lại là -1 * 1 * -3 * 3 = 9)."
    },
    {
      description: "3. Cú lừa số 0 kép (Có từ 2 số 0 trở lên)",
      nums: [0, 1, 2, 0],
      expected: [0, 0, 0, 0],
      explanation: "Khi có từ 2 số 0 trở lên, dù bạn che đi số 0 nào thì tích của phần còn lại vẫn sẽ vướng số 0 kia. Do đó toàn bộ mảng kết quả là 0."
    },
    {
      description: "4. Mảng toàn số âm",
      nums: [-2, -3, -4],
      expected: [12, 8, 6],
      explanation: "Nhân số âm với nhau, mảng lẻ số lượng số âm nên cần chú ý dấu. Trừ -2 thì (-3)*(-4) = 12..."
    },
    {
      description: "5. Mảng tối thiểu (Chỉ có 2 phần tử)",
      nums: [9, 8],
      expected: [8, 9],
      explanation: "Trừ 9 ra 8, trừ 8 ra 9. Kết quả bị đảo ngược chéo cho nhau."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: PRODUCT OF ARRAY EXCEPT SELF ===\n");

  testCases.forEach(({ description, nums, expected, explanation }, index) => {
    const result = productExceptSelf(nums);

    if (!isEqual(result, expected)) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Input: [${nums.join(', ')}]`);
      console.error(`   Kỳ vọng: [${expected.join(', ')}]`);
      console.error(`   Thực tế: [${result.join(', ')}]`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Không cần phép chia, không chạy 2 vòng lặp lồng nhau. Bạn đã xử lý bài toán vô cùng gọn gàng và tinh tế!");
  }
}

// Khởi chạy hệ thống
runTests();
