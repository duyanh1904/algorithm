/**
 * LeetCode Daily Challenge
 * ID: 343
 * Title: Integer Break
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/integer-break/
 */

/**
 * @param {number} n
 * @return {number}
 */
const integerBreak = (n) => {
    // VỚI INPUT MẪU: n = 10

    // Trường hợp biên đặc biệt: n = 2 và n = 3 buộc phải tách thành các số nhỏ hơn chính nó
    if (n === 2) return 1; // 2 = 1 + 1 -> 1 * 1 = 1
    if (n === 3) return 2; // 3 = 2 + 1 -> 2 * 1 = 2

    // Tính thương và số dư khi chia cho 3
    const quotient = Math.floor(n / 3); // quotient = floor(10 / 3) = 3
    const remainder = n % 3;            // remainder = 10 % 3 = 1

    // Áp dụng 3 kịch bản toán học dựa trên số dư
    
    // Kịch bản 1: Chia hết cho 3
    if (remainder === 0) {
        return Math.pow(3, quotient);
    }
    
    // Kịch bản 2: Dư 1 (Gộp một số 3 với số 1 dư để tạo thành số 4)
    if (remainder === 1) {
        // --- DIỄN GIẢI CHI TIẾT TRACE CODE CHO n = 10 ---
        // Do remainder = 1, ta rơi vào nhánh này:
        // Math.pow(3, 3 - 1) * 4 = Math.pow(3, 2) * 4 = 9 * 4 = 36
        return Math.pow(3, quotient - 1) * 4;
    }
    
    // Kịch bản 3: Dư 2 (Giữ nguyên số 2 nhân vào cuối chuỗi)
    // Ví dụ n = 8: quotient = 2, remainder = 2 -> Math.pow(3, 2) * 2 = 9 * 2 = 18
    return Math.pow(3, quotient) * 2;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Số biên n = 2",
            input: 2,
            expected: 1
        },
        {
            name: "Ví dụ 2: Số n = 10 (Áp dụng quy tắc dư 1 gộp thành 4)",
            input: 10,
            expected: 36 // 3 * 3 * 4 = 36
        },
        {
            name: "Số n = 8 (Áp dụng quy tắc dư 2)",
            input: 8,
            expected: 18 // 3 * 3 * 2 = 18
        },
        {
            name: "Số n = 9 (Áp dụng quy tắc chia hết cho 3)",
            input: 9,
            expected: 27 // 3 * 3 * 3 = 27
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Integer Break ===`);

    testCases.forEach((test, index) => {
        let actual = integerBreak(test.input);
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
