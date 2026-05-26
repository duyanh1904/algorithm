/**
 * LeetCode Daily Challenge
 * ID: 3120
 * Title: Count the Number of Special Characters I
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/count-the-number-of-special-characters-i/
 */

/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [

    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Count the Number of Special Characters I ===`);

    testCases.forEach((test, index) => {
        let actual;
        // Kiểm tra xem input là một Object nhiều tham số hay chỉ là một giá trị đơn lẻ
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            // Truyền các thuộc tính của object làm các đối số tương ứng của hàm
            actual = numberOfSpecialChars(...Object.values(test.input));
        } else {
            actual = numberOfSpecialChars(test.input);
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
