/**
 * Bài toán: Daily Temperatures (LeetCode 739 - Medium)
 * Pattern: Monotonic Stack (Ngăn xếp đơn điệu giảm)
 * Độ phức tạp: 
 * - Thời gian: O(N) vì mỗi phần tử chỉ bị đẩy vào (push) và lấy ra (pop) khỏi stack đúng 1 lần.
 * - Không gian bộ nhớ: O(N) cho Stack và mảng kết quả.
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  // Mảng kết quả ban đầu điền toàn số 0 (nếu không tìm thấy ngày ấm hơn thì mặc định là 0)
  const result = new Array(n).fill(0);
  
  // Stack chỉ lưu INDEX của các ngày, KHÔNG LƯU nhiệt độ
  const stack = []; 

  for (let i = 0; i < n; i++) {
    const currentTemp = temperatures[i];

    // VÒNG LẶP QUAN TRỌNG:
    // Chừng nào Stack còn người đợi VÀ nhiệt độ hôm nay LỚN HƠN nhiệt độ của ngày đang nằm trên đỉnh Stack
    while (stack.length > 0 && currentTemp > temperatures[stack[stack.length - 1]]) {
      // Lấy cái index của ngày lạnh lẽo đó ra
      const prevIndex = stack.pop();
      
      // Khoảng cách chờ đợi = Index hôm nay - Index ngày xưa
      result[prevIndex] = i - prevIndex;
    }

    // Sau khi đã giải quyết xong những ngày lạnh hơn trong Stack,
    // ta đưa ngày hôm nay vào Stack để chờ một ngày tương lai ấm hơn nó.
    stack.push(i);
  }

  return result;
}

// ================= HỆ THỐNG TEST CASES =================
function runTests() {
  const isEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

  const testCases = [
    {
      description: "1. Happy Path - Dữ liệu trồi sụt liên tục",
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
      expected: [1, 1, 4, 2, 1, 1, 0, 0],
      explanation: "Ngày 75 phải chờ 4 hôm mới gặp 76. Hai ngày cuối không có ai to hơn nên là 0."
    },
    {
      description: "2. Mùa đông khắc nghiệt (Nhiệt độ giảm dần liên tục)",
      temperatures: [90, 80, 70, 60, 50],
      expected: [0, 0, 0, 0, 0],
      explanation: "Không một ngày nào trong tương lai ấm hơn ngày trước đó. Toàn bộ mảng là 0. Stack ôm tất cả index vào mà không bao giờ pop ra."
    },
    {
      description: "3. Mùa hè oi bức (Nhiệt độ tăng dần liên tục)",
      temperatures: [50, 60, 70, 80, 90],
      expected: [1, 1, 1, 1, 0],
      explanation: "Cứ sang ngày mai là ấm hơn. Stack cứ nạp vào là bị pop ra ngay lập tức."
    },
    {
      description: "4. Đồng bằng nhiệt (Nhiệt độ bằng nhau liên tiếp)",
      temperatures: [70, 70, 70, 70, 71],
      expected: [4, 3, 2, 1, 0],
      explanation: "70 không lớn hơn 70, nên Stack giữ lại toàn bộ chuỗi 70. Đến ngày cuối (71), nó pop một phát dọn sạch sành sanh Stack."
    },
    {
      description: "5. Edge Case - Chỉ có 1 ngày",
      temperatures: [30],
      expected: [0],
      explanation: "Không có ngày mai để mà so sánh."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: DAILY TEMPERATURES (MONOTONIC STACK) ===\n");

  testCases.forEach(({ description, temperatures, expected, explanation }, index) => {
    const result = dailyTemperatures(temperatures);

    if (!isEqual(result, expected)) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Input: [${temperatures.join(', ')}]`);
      console.error(`   Kỳ vọng: [${expected.join(', ')}]`);
      console.error(`   Thực tế: [${result.join(', ')}]`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Kỹ thuật Monotonic Stack này là vũ khí tối thượng để giải quyết các bài toán 'Next Greater Element' (Phần tử lớn hơn tiếp theo).");
  }
}

// Khởi chạy hệ thống
runTests();
