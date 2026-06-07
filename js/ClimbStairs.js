/**
 * LeetCode 70 
 * @param {number} n 
 * @return {number}
 */
const climbStairs = (n) => {
    // VỚI INPUT MẪU: n = 4

    // Trường hợp cơ bản: Bậc 1 có 1 cách, Bậc 2 có 2 cách
    if (n === 1) return 1;
    if (n === 2) return 2;

    let prev2 = 1; // Đại diện cho số cách đi đến bậc (i - 2), ban đầu là bậc 1
    let prev1 = 2; // Đại diện cho số cách đi đến bậc (i - 1), ban đầu là bậc 2
    let current = 0; // Biến lưu trữ số cách của bậc hiện tại đang tính

    // Vòng lặp chạy từ bậc 3 đến bậc n (bậc 4)
    for (let i = 3; i <= n; i++) {
        
        // Tính số cách cho bậc hiện tại bằng tổng 2 bậc trước đó
        current = prev1 + prev2;

        // --- DIỄN GIẢI CHI TIẾT TỪNG VÒNG LẶP VỚI INPUT n = 4 ---

        // 🔄 VÒNG LẶP LẦN 1 (i = 3):
        // current = prev1 + prev2 = 2 + 1 = 3
        // prev2 nhận giá trị của prev1 cũ => prev2 = 2
        // prev1 nhận giá trị của current vừa tính => prev1 = 3
        // Trạng thái sau vòng lặp: prev2 = 2, prev1 = 3, current = 3

        // 🔄 VÒNG LẶP LẦN 2 (i = 4):
        // current = prev1 + prev2 = 3 + 2 = 5
        // prev2 nhận giá trị của prev1 cũ => prev2 = 3
        // prev1 nhận giá trị của current vừa tính => prev1 = 5
        // Trạng thái sau vòng lặp: prev2 = 3, prev1 = 5, current = 5

        // Dịch chuyển hai biến lưu trữ tiến lên một bậc để chuẩn bị cho lượt sau
        prev2 = prev1;
        prev1 = current;
    }

    // Trả về kết quả của bậc n cuối cùng (Với n = 4, kết quả là 5)
    return current;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Cầu thang có 2 bậc",
            input: 2,
            expected: 2 // 1+1, 2
        },
        {
            name: "Ví dụ 2: Cầu thang có 3 bậc",
            input: 3,
            expected: 3 // 1+1+1, 1+2, 2+1
        },
        {
            name: "Cầu thang có 4 bậc",
            input: 4,
            expected: 5 // Khớp với diễn giải trace code ở trên
        },
        {
            name: "Trường hợp biên: Chỉ có 1 bậc duy nhất",
            input: 1,
            expected: 1
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Climbing Stairs ===`);

    testCases.forEach((test, index) => {
        let actual = climbStairs(test.input);
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
