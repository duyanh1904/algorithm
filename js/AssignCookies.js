/**
 * LeetCode Daily Challenge
 * ID: 455
 * Title: Assign Cookies
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/assign-cookies/
 */

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
const findContentChildren = (g, s) => {
    // VỚI INPUT MẪU: g = [1, 2, 3], s = [1, 1]

    // 1. Sắp xếp cả 2 mảng theo thứ tự tăng dần
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    let child = 0;  // Con trỏ theo dõi đứa trẻ hiện tại
    let cookie = 0; // Con trỏ theo dõi miếng bánh quy hiện tại

    // 2. Vòng lặp duyệt qua hai mảng bằng kỹ thuật hai con trỏ
    while (child < g.length && cookie < s.length) {
        
        // Nếu kích thước bánh quy hiện tại đáp ứng được mức thèm ăn của trẻ
        if (s[cookie] >= g[child]) {
            // Đứa trẻ này thỏa mãn, chuyển sang đứa trẻ khó tính hơn kế tiếp
            child++;
        }
        
        // Miếng bánh hiện tại dù dùng được hay bị lãng phí thì cũng chuyển sang miếng tiếp theo
        cookie++;

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE QUA TỪNG VÒNG LẶP ---
        //
        // 🔄 VÒNG LẶP LẦN 1: child = 0 (g[0] = 1), cookie = 0 (s[0] = 1)
        //   - Kiểm tra điều kiện: s[0] >= g[0] <=> 1 >= 1 (Đúng!)
        //   - Trẻ child=0 thỏa mãn -> child tăng lên 1.
        //   - Bánh quy dùng xong -> cookie tăng lên 1.
        //   - Trạng thái: child = 1, cookie = 1
        //
        // 🔄 VÒNG LẶP LẦN 2: child = 1 (g[1] = 2), cookie = 1 (s[1] = 1)
        //   - Kiểm tra điều kiện: s[1] >= g[1] <=> 1 >= 2 (Sai!)
        //   - Miếng bánh quá nhỏ so với nhu cầu của đứa trẻ này. Giữ nguyên con trỏ child = 1.
        //   - Bánh quy bỏ qua -> cookie tăng lên 2.
        //   - Trạng thái: child = 1, cookie = 2
        //
        // 🏁 KẾT THÚC VÒNG LẶP: Điều kiện (cookie < s.length <=> 2 < 2) SAI -> Thoát lặp.
    }

    // Giá trị của con trỏ child chính là số lượng trẻ tối đa được thỏa mãn (Kết quả là 1)
    return child;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Thiếu bánh quy to, chỉ thỏa mãn được 1 đứa trẻ dễ tính",
            input: { g: [1, 2, 3], s: [1, 1] },
            expected: 1
        },
        {
            name: "Ví dụ 2: Dư dả bánh quy, thỏa mãn toàn bộ trẻ em",
            input: { g: [1, 2], s: [1, 2, 3] },
            expected: 2
        },
        {
            name: "Trường hợp biên: Không có bánh quy nào được cung cấp",
            input: { g: [1, 2, 3], s: [] },
            expected: 0
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Assign Cookies ===`);

    testCases.forEach((test, index) => {
        let actual = findContentChildren(test.input.g, test.input.s);
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
