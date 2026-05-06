/**
 * Bài toán: Top K Frequent Elements (LeetCode 347)
 * Pattern: Frequency Map + Bucket Sort
 * Độ phức tạp: Thời gian O(N), Không gian O(N)
 * Cho một mảng số nguyên nums và một số nguyên k. Hãy trả về k phần tử xuất hiện nhiều nhất trong mảng đó. Bạn có thể trả về kết quả theo bất kỳ thứ tự nào.Ràng buộc "chết người" của nhà tuyển dụng: Đề bài yêu cầu: Thuật toán của bạn BẮT BUỘC phải có độ phức tạp thời gian tốt hơn $O(N \log N)$.Ví dụ:Input: nums = [1, 1, 1, 2, 2, 3], k = 2Output: [1, 2](Giải thích: Số 1 xuất hiện 3 lần, số 2 xuất hiện 2 lần. Lấy 2 số top đầu là 1 và 2).
 */
function topKFrequent(nums, k) {
  // Bước 1: Đếm tần suất xuất hiện bằng Map
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Bước 2: Tạo các Xô (Buckets)
  // Mảng có N phần tử thì tần suất tối đa là N. 
  // Ta cần mảng dài N + 1 để index có thể chạm đến giá trị N.
  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  // Bước 3: Đổ dữ liệu vào Xô (Lấy tần suất làm Index)
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  // Bước 4: Đi lùi từ Xô to nhất về Xô nhỏ nhất để lấy top K
  const result = [];
  for (let i = buckets.length - 1; i >= 0; i--) {
    // Nếu Xô có chứa phần tử
    if (buckets[i].length > 0) {
      result.push(...buckets[i]); // Đổ tất cả các số trong Xô này vào kết quả
      
      // Nếu đã gom đủ K phần tử thì dừng ngay lập tức
      if (result.length >= k) {
        return result.slice(0, k); // Slice để đề phòng trường hợp Xô cuối cùng dư phần tử
      }
    }
  }

  return result;
}

// ================= HỆ THỐNG TEST CASES CỰC CHI TIẾT =================
function runTests() {
  // Hàm so sánh 2 mảng (bỏ qua thứ tự vì đề cho phép trả về kết quả thứ tự bất kỳ)
  const isMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return JSON.stringify([...arr1].sort((a,b) => a-b)) === JSON.stringify([...arr2].sort((a,b) => a-b));
  };

  const testCases = [
    {
      description: "1. Happy Path - Dữ liệu tiêu chuẩn",
      nums: [1, 1, 1, 2, 2, 3],
      k: 2,
      expected: [1, 2],
      explanation: "1 xuất hiện 3 lần, 2 xuất hiện 2 lần."
    },
    {
      description: "2. Mảng chỉ có 1 phần tử",
      nums: [1],
      k: 1,
      expected: [1],
      explanation: "Chỉ có 1 sự lựa chọn duy nhất."
    },
    {
      description: "3. Tần suất bằng nhau (Gom chung 1 xô)",
      nums: [4, 4, 5, 5, 6, 6, 7],
      k: 2,
      // Lưu ý: Đề bài Leetcode chuẩn luôn đảm bảo đáp án là duy nhất, 
      // tức là không có chuyện k=2 mà có 3 thằng cùng tần suất top đầu. 
      // Ở đây ta giả sử 4 và 5 được gom trước.
      expected: [4, 5],
      explanation: "4 và 5 cùng xuất hiện 2 lần, Xô số 2 sẽ chứa [4, 5]. Lấy đủ 2 phần tử là dừng."
    },
    {
      description: "4. Dữ liệu chứa số âm",
      nums: [-1, -1, 3, 3, 3, 0],
      k: 2,
      expected: [3, -1],
      explanation: "Số âm làm key của Map vẫn đếm bình thường. Tần suất không bao giờ âm."
    },
    {
      description: "5. Mỗi số chỉ xuất hiện đúng 1 lần",
      nums: [10, 20, 30],
      k: 3,
      expected: [10, 20, 30],
      explanation: "Tất cả các số chui hết vào Xô số 1 (Index 1). Trả về toàn bộ."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: TOP K FREQUENT ELEMENTS (BUCKET SORT) ===\n");

  testCases.forEach(({ description, nums, k, expected, explanation }, index) => {
    const result = topKFrequent(nums, k);

    if (!isMatch(result, expected)) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Input: nums = [${nums}], k = ${k}`);
      console.error(`   Kỳ vọng: [${expected}] | Thực tế: [${result}]`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Bạn đã phá vỡ rào cản O(N log N) bằng kỹ thuật Bucket Sort cực kỳ thông minh.");
  }
}

// Khởi chạy
runTests();
