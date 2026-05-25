/**
 * LeetCode Daily Challenge
 * ID: 1871
 * Title: Jump Game VII
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/jump-game-vii/
 */

/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function(s, minJump, maxJump) {
    
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1",
            input: {
    "s": "&quot;011010&quot;",
    "minJump": 2,
    "maxJump": 3
},
            expected: true
        },
        {
            name: "Ví dụ 2",
            input: {
    "s": "&quot;01101110&quot;",
    "minJump": 2,
    "maxJump": 3
},
            expected: false
        },

    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Jump Game VII ===`);

    testCases.forEach((test, index) => {
        let actual;
        // Kiểm tra xem input là một Object nhiều tham số hay chỉ là một giá trị đơn lẻ
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            // Truyền các thuộc tính của object làm các đối số tương ứng của hàm
            actual = canReach(...Object.values(test.input));
        } else {
            actual = canReach(test.input);
        }

        // Hỗ trợ so sánh cả mảng hoặc object bằng cách chuyển về chuỗi JSON
        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Expected:`, test.expected);
            console.error(`   - Actual:`, actual);
        }
    });

    console.log("-----------------------------------------");
    if (passedCount !== testCases.length) {
        console.error(`Kết quả: Thất bại ${testCases.length - passedCount}/${testCases.length} bài test.`);
        // Chú ý: Ta không exit(1) ở đây vì file mới cào về chưa có logic giải thuật bên trong (đang rỗng) 
        // nên test mẫu chắc chắn sẽ fail, tránh làm sập luồng GitHub Actions khi cào bài mới.
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

runTests();
