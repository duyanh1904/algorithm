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
const numberOfSpecialChars = (word) => {
    const charSet = new Set(word);
    let specialCount = 0;

    for (let i = 97; i <= 122; i++) {
        const lowerChar = String.fromCharCode(i);
        const upperChar = String.fromCharCode(i - 32);

        if (charSet.has(lowerChar) && charSet.has(upperChar)) {
            specialCount++;
        }
    }

    return specialCount;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Có chữ b và B, c và C hợp lệ",
            input: "aaAbcBC",
            expected: 3 // 'a'/'A', 'b'/'B', 'c'/'C' đều đủ
        },
        {
            name: "Ví dụ 2: Không có cặp chữ hoa/thường nào trùng nhau",
            input: "abc",
            expected: 0
        },
        {
            name: "Ví dụ 3: Chỉ có cặp a/A và b/B, không có c/C",
            input: "abBCabA",
            expected: 2 // ĐÃ SỬA: trước đó ghi 3 (sai)
        },
        {
            name: "Trường hợp chuỗi rỗng hoặc không có ký tự trùng",
            input: "XYZxyz",
            expected: 3 // 'x'/'X', 'y'/'Y', 'z'/'Z'
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Count the Number of Special Characters I ===`);

    testCases.forEach((test, index) => {
        let actual;
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            actual = numberOfSpecialChars(...Object.values(test.input));
        } else {
            actual = numberOfSpecialChars(test.input);
        }

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
        process.exit(1);
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

runTests();
