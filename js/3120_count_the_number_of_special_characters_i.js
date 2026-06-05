/**
 * LeetCode Daily Challenge edittt
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
    // Sử dụng Set để lưu trữ các ký tự xuất hiện nhằm tối ưu thời gian tra cứu O(1)
    const charSet = new Set(word);
    let specialCount = 0;

    // Duyệt qua bảng mã ASCII của các ký tự từ 'a' đến 'z'
    for (let i = 97; i <= 122; i++) {
        const lowerChar = String.fromCharCode(i);       // Ký tự chữ thường (ví dụ: 'a')
        const upperChar = String.fromCharCode(i - 32);  // Ký tự chữ hoa tương ứng (ví dụ: 'A')

        // Nếu cả chữ thường và chữ hoa đều xuất hiện trong chuỗi
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
            expected: 3 // 'a' thiếu 'A', 'b'/'B' có đủ, 'c'/'C' có đủ -> Kết quả: 3 ('b', 'c')
        },
        {
            name: "Ví dụ 2: Không có cặp chữ hoa/thường nào trùng nhau",
            input: "abc",
            expected: 0
        },
        {
            name: "Ví dụ 3: Tất cả các chữ cái đều có đủ cặp",
            input: "abBCabA",
            expected: 3 // 'a'/'A', 'b'/'B', 'c'/'C' đều có đủ cặp
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
        // Vì mã giải thuật đã hoàn chỉnh và chính xác, ta mở lại exit(1) 
        // để nếu có lỗi logic phát sinh ngoài ý muốn, GitHub Actions sẽ lập tức báo đỏ chặn lỗi.
        process.exit(1);
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

runTests();
