/**
 * Bài toán: Decode Ways (LeetCode 91 - Medium)
 * Pattern: Dynamic Programming (Optimized Space)
 * Độ phức tạp: 
 * - Thời gian: O(N) với N là độ dài chuỗi s.
 * - Không gian: O(1) vì chỉ dùng 2 biến.
 */
function numDecodings(s) {
    // Edge case: Nếu chuỗi rỗng hoặc bắt đầu bằng '0', chắc chắn không thể giải mã
    if (!s || s[0] === '0') return 0;

    const n = s.length;
    
    // dp2 tương đương dp[i-2]: Số cách giải mã tại vị trí i-2
    // Khởi tạo dp[0] = 1 (Chuỗi rỗng có 1 cách hiểu khái niệm)
    let dp2 = 1; 
    
    // dp1 tương đương dp[i-1]: Số cách giải mã tại vị trí i-1
    // Khởi tạo dp[1] = 1 (Ký tự đầu tiên khác '0' nên chắc chắn có 1 cách)
    let dp1 = 1; 

    for (let i = 2; i <= n; i++) {
        let currentDp = 0; // Tương đương dp[i] hiện tại

        // 1. Kiểm tra 1 chữ số (từ s[i-1] đến s[i-1])
        // Lưu ý: i là độ dài, nên index trong chuỗi s là i-1
        const singleDigit = parseInt(s.substring(i - 1, i));
        if (singleDigit >= 1 && singleDigit <= 9) {
            currentDp += dp1;
        }

        // 2. Kiểm tra 2 chữ số (từ s[i-2] đến s[i-1])
        const doubleDigit = parseInt(s.substring(i - 2, i));
        if (doubleDigit >= 10 && doubleDigit <= 26) {
            currentDp += dp2;
        }

        // Cập nhật lại 2 biến dp cho vòng lặp tiếp theo
        // Dịch chuyển cửa sổ về phía trước: dp2 = dp1, dp1 = currentDp
        dp2 = dp1;
        dp1 = currentDp;
    }

    // Kết quả cuối cùng nằm ở dp1 (tương đương dp[n])
    return dp1;
}

// ================= HỆ THỐNG UNIT TEST =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: DECODE WAYS\n");

    const testCases = [
        {
            description: "1. Ví dụ chuẩn (1 bước hoặc 2 bước)",
            input: "12",
            expected: 2,
            reason: "'AB' (1 2) hoặc 'L' (12)."
        },
        {
            description: "2. Ví dụ chuẩn có 3 ký tự",
            input: "226",
            expected: 3,
            reason: "'BZ' (2 26), 'VF' (22 6), hoặc 'BBF' (2 2 6)."
        },
        {
            description: "3. Edge Case: Bắt đầu bằng 0",
            input: "06",
            expected: 0,
            reason: "Số '0' không có ý nghĩa, '06' không hợp lệ."
        },
        {
            description: "4. Edge Case: 0 nằm ở giữa hợp lệ",
            input: "2101",
            expected: 1,
            reason: "Bắt buộc phải ghép '10' (J). Chỉ có 1 cách: '2 10 1' (B J A)."
        },
        {
            description: "5. Edge Case: 0 nằm ở giữa KHÔNG hợp lệ",
            input: "2301",
            expected: 0,
            reason: "Số '30' không nằm trong 1-26. Chuỗi đứt đoạn, không thể giải mã."
        },
        {
            description: "6. Nhiều số 0 liên tiếp",
            input: "1001",
            expected: 0,
            reason: "Đến số 0 thứ hai, không thể ghép với số 0 đằng trước thành '00'."
        },
        {
            description: "7. Chuỗi chỉ toàn số lớn hơn 6 (Không thể ghép đôi)",
            input: "999",
            expected: 1,
            reason: "Chỉ có thể tách rời '9 9 9'. Chỉ có 1 cách."
        },
        {
            description: "8. Chuỗi dài phức tạp có số 0 ở cuối",
            input: "11106",
            expected: 2,
            reason: "'11106' -> '1 1 10 6' (AAJF) hoặc '11 10 6' (KJF)."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = numDecodings(tc.input);

        if (actual === tc.expected) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.error(`   👉 Đầu vào: "${tc.input}"`);
            console.error(`   🎯 Kỳ vọng: ${tc.expected} | 🚨 Thực tế: ${actual}`);
        }
        console.log(`   💡 Giải thích: ${tc.reason}\n`);
    });

    console.log("==================================================");
    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Thuật toán xử lý bẫy cực tốt.`);
    } else {
        console.log(`⚠️ Có lỗi trong khâu xử lý. Hãy xem lại các trường hợp chứa số 0.`);
    }
}

// Khởi chạy
runTests();
