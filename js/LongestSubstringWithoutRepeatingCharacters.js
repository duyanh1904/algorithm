/**
 * Bài toán: Longest Substring Without Repeating Characters
 * Mức độ: Medium
 * Độ phức tạp: Thời gian O(n), Không gian bộ nhớ O(min(n, m)) với m là bảng chữ cái
 */
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const charSet = new Set(); // Dùng Set để tra cứu cực nhanh O(1)

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    // BƯỚC QUAN TRỌNG: Nếu gặp ký tự trùng, trượt 'left' lên để loại bỏ
    while (charSet.has(currentChar)) {
      charSet.delete(s[left]);
      left++;
    }

    // Sau khi cửa sổ đã "sạch", thêm ký tự mới vào và cập nhật độ dài
    charSet.add(currentChar);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// ================= TEST CASES =================
function runTests() {
  const testCases = [
    {
      s: "abcabcbb",
      expected: 3,
      explanation: "Chuỗi 'abc', 'bca', hoặc 'cab' (dài 3)"
    },
    {
      s: "bbbbb",
      expected: 1,
      explanation: "Chỉ có 'b' (dài 1)"
    },
    {
      s: "pwwkew",
      expected: 3,
      explanation: "Chuỗi 'wke'. Tránh nhầm với 'pwke' vì w bị lặp."
    },
    {
      s: "",
      expected: 0,
      explanation: "Edge case: Chuỗi rỗng"
    },
    {
      s: " ",
      expected: 1,
      explanation: "Edge case: Chuỗi có 1 khoảng trắng (khoảng trắng cũng tính là 1 ký tự)"
    },
    {
      s: "au",
      expected: 2,
      explanation: "Hai ký tự hoàn toàn khác nhau"
    },
    {
      // ĐÂY LÀ TEST CASE BẪY CHẾT NGƯỜI
      s: "dvdf",
      expected: 3,
      explanation: "Chuỗi 'vdf'. Rất nhiều người ra 2 vì họ chỉ clear Set rồi đếm lại từ chữ 'd' thứ hai."
    }
  ];

  let allPassed = true;
  console.log("=== BẮT ĐẦU CHẠY TEST: SLIDING WINDOW ===\n");

  testCases.forEach(({ s, expected, explanation }, index) => {
    const result = lengthOfLongestSubstring(s);

    if (result !== expected) {
      console.error(`❌ Case ${index + 1} FAILED`);
      console.error(`   Input: "${s}"`);
      console.error(`   Kỳ vọng: ${expected} | Thực tế trả về: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: "${s}"`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🎉 HOÀN HẢO! Code đã xử lý mượt mà mọi Edge Cases.");
  }
}

// Khởi chạy hệ thống
runTests();
