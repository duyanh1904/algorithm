/**
 * LeetCode Daily Challenge
 * ID: 3121
 * Title: Count the Number of Special Characters II
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/count-the-number-of-special-characters-ii/
 */

/**
 * @param {string} word
 * @return {number}
 */
const numberOfSpecialChars = (word) => {
    // Lưu index xuất hiện cuối cùng của ký tự thường
    const lastLower = new Map();
    // Lưu index xuất hiện đầu tiên của ký tự hoa
    const firstUpper = new Map();

    // Duyệt một lần qua chuỗi để ghi nhận các vị trí index
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char >= 'a' && char <= 'z') {
            lastLower.set(char, i); // Luôn cập nhật để lấy vị trí cuối cùng
        } else if (char >= 'A' && char <= 'Z') {
            if (!firstUpper.has(char)) {
                firstUpper.set(char, i); // Chỉ ghi nhận lần đầu tiên xuất hiện
            }
        }
    }

    let specialCount = 0;

    // Duyệt qua bảng chữ cái từ 'a' đến 'z'
    for (let i = 97; i <= 122; i++) {
        const lowerChar = String.fromCharCode(i);
        const upperChar = String.fromCharCode(i - 32);

        // Điều kiện: Cả 2 dạng phải tồn tại và mọi chữ thường phải đứng trước chữ hoa đầu tiên
        if (lastLower.has(lowerChar) && firstUpper.has(upperChar)) {
            if (lastLower.get(lowerChar) < firstUpper.get(upperChar)) {
                specialCount++;
            }
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
            name: "Ví dụ 1: Hợp lệ hoàn toàn",
            input: "aaAbcBC",
            expected: 3 // 'a'/'A' (1 < 2), 'b'/'B' (4 < 5), 'c'/'C' (3 < 6) -> Đều thỏa mãn
        },
        {
            name: "Ví dụ 2: Không hợp lệ vì chữ thường xuất hiện sau chữ hoa",
            input: "abc",
            expected: 0
        },
        {
            name: "Ví dụ 3: Chữ 'a' thường xuất hiện xen kẽ sau 'A' hoa",
            input: "AbBCabA",
            expected: 0 // 'a' xuất hiện tại index 4 đứng sau 'A' tại index 0 -> Loại
        },
        {
            name: "Trường hợp biên: Nhiều chữ thường đứng trước nhiều chữ hoa",
            input: "cccCCC",
            expected: 1 // 'c' cuối là index 2 < 'C' đầu là index 3 -> Hợp lệ
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Count the Number of Special Characters II ===`);

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
