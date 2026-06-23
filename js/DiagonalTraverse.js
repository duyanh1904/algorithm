/**
 * LeetCode Daily Challenge
 * ID: 498
 * Title: Diagonal Traverse
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/diagonal-traverse/
 */

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = (mat) => {
    // Trường hợp biên: Ma trận trống hoặc không hợp lệ
    if (!mat || mat.length === 0 || mat[0].length === 0) return [];

    const m = mat.length;    // Số dòng của ma trận
    const n = mat[0].length; // Số cột của ma trận
    
    const result = new Array(m * n); // Mảng lưu kết quả thu hoạch cuối cùng
    
    let r = 0, c = 0; // Khởi tạo tọa độ xuất phát tại ô gốc (0, 0)
    let direction = 1; // 1 nghĩa là hướng đi lên (Upward), -1 là hướng đi xuống (Downward)

    for (let i = 0; i < m * n; i++) {
        result[i] = mat[r][c]; // Thu hoạch phần tử tại vị trí hiện tại

        // --- KỊCH BẢN 1: HƯỚNG ĐI LÊN (direction === 1) ---
        if (direction === 1) {
            if (c === n - 1) {
                // Nếu đã chạm biên phải cực cùng, bước kế tiếp bắt buộc phải đi xuống dòng dưới
                r++;
                direction = -1; // Đổi hướng sang đi xuống
            } else if (r === 0) {
                // Nếu chưa chạm biên phải nhưng đã chạm biên trên cùng, bước kế tiếp dịch sang cột phải
                c++;
                direction = -1; // Đổi hướng sang đi xuống
            } else {
                // Trường hợp thông thường nằm giữa đường chéo: Dòng giảm, Cột tăng
                r--;
                c++;
            }
        } 
        // --- KỊCH BẢN 2: HƯỚNG ĐI XUỐNG (direction === -1) ---
        else {
            if (r === m - 1) {
                // Nếu đã chạm biên dưới cực cùng, bước kế tiếp bắt buộc phải dịch sang cột phải
                c++;
                direction = 1; // Đổi hướng sang đi lên
            } else if (c === 0) {
                // Nếu chưa chạm biên dưới nhưng đã chạm biên trái cùng, bước kế tiếp dịch xuống dòng dưới
                r++;
                direction = 1; // Đổi hướng sang đi lên
            } else {
                // Trường hợp thông thường nằm giữa đường chéo: Dòng tăng, Cột giảm
                r++;
                c--;
            }
        }

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE QUA TỪNG PHẦN TỬ THU HOẠCH ---
        // VỚI INPUT: [ [1,2,3], [4,5,6], [7,8,9] ] (m=3, n=3)
        //
        // 🔄 Bước i = 0: Thu hoạch mat[0][0] = 1. direction = 1.
        //   - Rơi vào điều kiện else if (r === 0) -> c++ thành 1. Đổi direction = -1. (Tọa độ kế: 0, 1)
        // 🔄 Bước i = 1: Thu hoạch mat[0][1] = 2. direction = -1.
        //   - Rơi vào điều kiện else if (c === 0) -> r++ thành 1. Đổi direction = 1.  (Tọa độ kế: 1, 0)
        // 🔄 Bước i = 2: Thu hoạch mat[1][0] = 4. direction = 1.
        //   - Không chạm biên -> Trường hợp thông thường: r-- thành 0, c++ thành 1.        (Tọa độ kế: 0, 1)
        // 🔄 Bước i = 3: Thu hoạch mat[0][1] = 5? Lỗi trace! Thực tế i=2 xong tọa độ kế là (1,0) -> i=2 lấy 4.
        //   Sửa chuẩn thứ tự kết quả: 1 (0,0) -> 2 (0,1) -> 4 (1,0) -> 7 (2,0) -> 5 (1,1) -> 3 (0,2) ...
    }

    return result;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Ma trận vuông 3x3 tiêu chuẩn",
            input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            expected: [1, 2, 4, 7, 5, 3, 6, 8, 9]
        },
        {
            name: "Ví dụ 2: Ma trận vuông 2x2 ngắn gọn",
            input: [[1, 2], [3, 4]],
            expected: [1, 2, 3, 4]
        },
        {
            name: "Trường hợp biên: Ma trận hình chữ nhật dẹt (1 dòng nhiều cột)",
            input: [[1, 2, 3, 4]],
            expected: [1, 2, 3, 4]
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Diagonal Traverse ===`);

    testCases.forEach((test, index) => {
        let actual = findDiagonalOrder(test.input);
        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

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
