/**
 * Bài toán: Trapping Rain Water (LeetCode 42 - Hard)
 * Thuật toán: Two Pointers
 * Độ phức tạp: Thời gian O(N), Không gian (Bộ nhớ) O(1)
 */
function trap(height) {
  // Edge case: Mảng rỗng hoặc có ít hơn 3 cột thì không thể đọng nước
  if (!height || height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  
  let maxLeft = 0;
  let maxRight = 0;
  let totalWater = 0;

  // Hai con trỏ chạy dần vào giữa cho đến khi gặp nhau
  while (left < right) {
    // Bên phải đang có cột cao hơn -> Mực nước phụ thuộc vào maxLeft
    if (height[left] < height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left]; // Cập nhật vách ngăn trái
      } else {
        totalWater += maxLeft - height[left]; // Đổ nước vào
      }
      left++; // Xong việc ở ô left, nhích sang phải
    } 
    // Bên trái đang có cột cao hơn -> Mực nước phụ thuộc vào maxRight
    else {
      if (height[right] >= maxRight) {
        maxRight = height[right]; // Cập nhật vách ngăn phải
      } else {
        totalWater += maxRight - height[right]; // Đổ nước vào
      }
      right--; // Xong việc ở ô right, nhích sang trái
    }
  }

  return totalWater;
}

// ================= HỆ THỐNG TEST CASES CỰC MẠNH =================
function runTests() {
  const testCases = [
    {
      description: "1. Bản đồ kinh điển (Ví dụ chuẩn của LeetCode)",
      height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      expected: 6,
      explanation: "Có nhiều rãnh nước nhỏ đọng lại được tổng cộng 6 đơn vị."
    },
    {
      description: "2. Thung lũng khổng lồ (Lõm ở giữa)",
      height: [4, 2, 0, 3, 2, 5],
      expected: 9,
      explanation: "Bị kẹp giữa cột cao 4 ở đầu và 5 ở cuối. Nước lấp đầy phần lõm."
    },
    {
      description: "3. Ngọn núi dốc (Lên đỉnh rồi xuống dốc)",
      height: [1, 2, 3, 4, 5, 4, 3, 2, 1],
      expected: 0,
      explanation: "Đồ thị hình ngọn núi, nước sẽ chảy tuột hết xuống 2 bên, không đọng giọt nào."
    },
    {
      description: "4. Đồng bằng (Phẳng lì)",
      height: [3, 3, 3, 3, 3],
      expected: 0,
      explanation: "Không có vách ngăn cao hơn để giữ nước."
    },
    {
      description: "5. Bể chứa lệch (Vách trái cao chót vót)",
      height: [10, 0, 0, 0, 2],
      expected: 6,
      explanation: "Vách trái cao 10, vách phải cao 2. Mực nước đọng lại tối đa chỉ dâng lên được ngang mức 2."
    },
    {
      description: "6. Edge Case: Mảng quá ngắn",
      height: [2, 1],
      expected: 0,
      explanation: "Cần ít nhất 3 cột (2 vách và 1 đáy) mới đọng được nước."
    },
    {
      description: "7. Cấu trúc cái phễu",
      height: [5, 4, 3, 2, 1, 2, 3, 4, 5],
      expected: 16,
      explanation: "Nước lấp đầy các bậc thang của phễu."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: TRAPPING RAIN WATER (HARD) ===\n");

  testCases.forEach(({ description, height, expected, explanation }, index) => {
    const result = trap(height);

    if (result !== expected) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Input: [${height.join(', ')}]`);
      console.error(`   Kỳ vọng: ${expected} | Thực tế: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Bạn vừa đánh bại một trong những câu hỏi hóc búa nhất của FAANG với độ phức tạp tối ưu nhất O(1) Space.");
  }
}

// Khởi chạy hệ thống
runTests();
