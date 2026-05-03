/**
 * Bài toán: Sliding Window Maximum (LeetCode 239 - Hard)
 * Pattern: Monotonic Deque
 * Độ phức tạp: Thời gian O(N) (Mỗi phần tử vào và ra Deque đúng 1 lần), Không gian O(K)
 * Cho một mảng số nguyên nums và một cửa sổ trượt có kích thước k. Cửa sổ này trượt từ trái sang phải, mỗi lần nhích 1 bước. Bạn chỉ có thể nhìn thấy k số bên trong cửa sổ đó.Nhiệm vụ: Trả về một mảng chứa giá trị lớn nhất của mỗi cửa sổ trượt.Ví dụ: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3Cửa sổ [1,  3, -1] $\rightarrow$ Max là 3Cửa sổ [3, -1, -3] $\rightarrow$ Max là 3Cửa sổ [-1, -3,  5] $\rightarrow$ Max là 5...Output: [3, 3, 5, 5, 6, 7]
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Deque CHỈ LƯU INDEX, không lưu giá trị (để biết tuổi nghỉ hưu)

  for (let i = 0; i < nums.length; i++) {
    // 1. KIỂM TRA NGHỈ HƯU: Xóa phần tử ở ĐẦU hàng nếu nó đã trượt ra khỏi cửa sổ k
    // i - k + 1 chính là index bắt đầu của cửa sổ hiện tại. 
    // Nếu index ở đầu deque nhỏ hơn số này, nghĩa là nó đã out.
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift(); // Đá khỏi đầu hàng
    }

    // 2. SA THẢI KẺ YẾU: Xóa tất cả các phần tử ở CUỐI hàng mà nhỏ hơn phần tử mới vào
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop(); // Đá khỏi cuối hàng
    }

    // 3. NHẬN NGƯỜI MỚI: Thêm index của phần tử hiện tại vào CUỐI hàng
    deque.push(i);

    // 4. CHỐT KẾT QUẢ: Nếu cửa sổ đã trượt đủ k phần tử (i >= k - 1)
    // Người giỏi nhất luôn luôn nằm ở ĐẦU hàng đợi
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// ================= HỆ THỐNG TEST CASES (CÁC TRƯỜNG HỢP HIỂM HÓC NHẤT) =================
function runTests() {
  const isEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

  const testCases = [
    {
      description: "1. Happy Path - Mảng ngẫu nhiên (Ví dụ chuẩn của đề)",
      nums: [1, 3, -1, -3, 5, 3, 6, 7],
      k: 3,
      expected: [3, 3, 5, 5, 6, 7],
      explanation: "Deque liên tục lọc và giữ lại các giá trị lớn nhất cục bộ."
    },
    {
      description: "2. Mảng tăng dần liên tục",
      nums: [1, 2, 3, 4, 5, 6],
      k: 2,
      expected: [2, 3, 4, 5, 6],
      explanation: "Cứ số mới vào là lớn hơn số cũ. Deque liên tục sa thải người cũ, lúc nào cũng chỉ có đúng 1 người trong hàng."
    },
    {
      description: "3. Mảng giảm dần liên tục (Worst Case của Deque)",
      nums: [6, 5, 4, 3, 2, 1],
      k: 3,
      expected: [6, 5, 4, 3],
      explanation: "Không ai bị sa thải ngay vì ai mới vào cũng yếu hơn. Nhưng những người giỏi nhất ở ĐẦU hàng sẽ dần đến tuổi nghỉ hưu và bị shift() ra."
    },
    {
      description: "4. Kích thước cửa sổ bằng 1",
      nums: [9, -11, 2],
      k: 1,
      expected: [9, -11, 2],
      explanation: "Cửa sổ rộng 1 thì số lớn nhất chính là bản thân mỗi số. Trả về y nguyên mảng gốc."
    },
    {
      description: "5. Kích thước cửa sổ bằng toàn bộ mảng",
      nums: [4, -2, 7, 1, 9],
      k: 5,
      expected: [9],
      explanation: "Cửa sổ trùm hết mảng, chỉ trả về đúng 1 số lớn nhất toàn cục."
    },
    {
      description: "6. Bẫy thung lũng (Chứa một đỉnh giả rồi tụt xuống)",
      nums: [10, 1, 2, 3, 4],
      k: 3,
      expected: [10, 3, 4],
      explanation: "Khi 10 nghỉ hưu ở step thứ 3, số 3 (kẻ yếu hơn vừa vào) chính thức lên ngôi vương."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: SLIDING WINDOW MAXIMUM (HARD) ===\n");

  testCases.forEach(({ description, nums, k, expected, explanation }, index) => {
    const result = maxSlidingWindow(nums, k);

    if (!isEqual(result, expected)) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Input: nums = [${nums.join(', ')}], k = ${k}`);
      console.error(`   Kỳ vọng: [${expected.join(', ')}]`);
      console.error(`   Thực tế: [${result.join(', ')}]`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Master được bài toán này, bạn đã đứng trên top 5% những người ôn luyện LeetCode rồi đấy.");
  }
}

// Khởi chạy hệ thống
runTests();
