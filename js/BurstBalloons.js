/**
 * LeetCode 312
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = (nums) => {
    // VỚI INPUT MẪU: nums = [3, 5]

    // 1. Tạo mảng mới bọc 2 số 1 ở hai đầu biên để xử lý trường hợp tràn mảng (Out of bounds)
    // newNums sẽ trở thành: [1, 3, 5, 1]
    const newNums = [1, ...nums, 1];
    const n = newNums.length; // n = 4

    // 2. Khởi tạo ma trận DP kích thước n x n (4 x 4) toàn bộ là số 0
    // dp[left][right] lưu số lượng coins lớn nhất thu được khi bắn hết bóng từ index 'left' đến 'right'
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    // 3. Duyệt qua độ dài của từng khoảng (window length) từ 1 đến n - 2 (Độ dài từ 1 đến 2)
    for (let len = 1; len <= n - 2; len++) {
        
        // Duyệt chỉ số left (bắt đầu từ 1 đến khi khoảng chạm biên phải)
        for (let left = 1; left <= n - 1 - len; left++) {
            // Xác định chỉ số right tương ứng dựa vào độ dài khoảng len
            const right = left + len - 1;

            // Chạy biến k từ left đến right: Thử giả định từng quả bóng k sẽ là quả nổ CUỐI CÙNG
            for (let k = left; k <= right; k++) {
                
                // Công thức tính điểm tích lũy:
                // Điểm đoạn trái dp[left][k-1] + Điểm đoạn phải dp[k+1][right] + Điểm khi bắn quả k cuối cùng
                const coins = dp[left][k - 1] + 
                              dp[k + 1][right] + 
                              newNums[left - 1] * newNums[k] * newNums[right + 1];

                // Cập nhật giá trị lớn nhất cho đoạn [left, right]
                dp[left][right] = Math.max(dp[left][right], coins);

                // --- DIỄN GIẢI CHI TIẾT TỪNG BƯỚC DUYỆT TRACE CODE ---
                
                // 🔄 LẦN DUYỆT 1 (len = 1): Xét các khoảng có độ dài bằng 1
                // 🔹 Với left = 1, right = 1 (Chỉ xét quả bóng 3): k chỉ có thể = 1
                //    coins = dp[1][0] + dp[2][1] + newNums[0]*newNums[1]*newNums[2] = 0 + 0 + 1 * 3 * 5 = 15
                //    => dp[1][1] = 15
                // 🔹 Với left = 2, right = 2 (Chỉ xét quả bóng 5): k chỉ có thể = 2
                //    coins = dp[2][1] + dp[3][2] + newNums[1]*newNums[2]*newNums[3] = 0 + 0 + 3 * 5 * 1 = 15
                //    => dp[2][2] = 15

                // 🔄 LẦN DUYỆT 2 (len = 2): Xét khoảng có độ dài bằng 2 [left=1, right=2] (Xét cả cụm 3, 5)
                // 🔹 Thử k = 1 (Quả bóng 3 nổ cuối cùng, tức là quả 5 nổ trước):
                //    coins = dp[1][0] + dp[2][2] + newNums[0]*newNums[1]*newNums[3] = 0 + 15 + 1 * 3 * 1 = 18
                // 🔹 Thử k = 2 (Quả bóng 5 nổ cuối cùng, tức là quả 3 nổ trước):
                //    coins = dp[1][1] + dp[3][2] + newNums[0]*newNums[2]*newNums[3] = 15 + 0 + 1 * 5 * 1 = 20
                // 🚀 Lấy Max(18, 20) => dp[1][2] = 20
            }
        }
    }

    // 4. Kết quả tối ưu của toàn bộ mảng gốc (từ index 1 đến n-2) nằm ở dp[1][n-2]
    // Với mảng [3, 5], kết quả trả về là dp[1][2] = 20
    return dp[1][n - 2];
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Mảng 4 quả bóng phối hợp thứ tự nổ tối ưu",
            input: [3, 1, 5, 8],
            expected: 167 
            // Thứ tự nổ tối ưu: 1 -> 5 -> 3 -> 8
            // Điểm thu được: (3*1*5) + (3*5*8) + (1*3*8) + (1*8*1) = 15 + 120 + 24 + 8 = 167
        },
        {
            name: "Ví dụ 2: Mảng có 2 quả bóng",
            input: [1, 5],
            expected: 10 // (5*1*1) + (1*1*1) = 10
        },
        {
            name: "Trường hợp biên: Chỉ có đúng 1 quả bóng đơn lẻ",
            input: [9],
            expected: 9 // 1 * 9 * 1 = 9
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Burst Balloons ===`);

    testCases.forEach((test, index) => {
        let actual = maxCoins(test.input);
        const isPassed = actual === test.expected;

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Expected:`, test.expected);
            console.error(`   - Actual:  `, actual);
        }
    });

    console.log("-----------------------------------------");
    if (passedCount !== testCases.length) {
        console.error(`Kết quả: Thất bại ${testCases.length - passedCount}/${testCases.length} bài test.`);
        process.exit(1);
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

runTests();
