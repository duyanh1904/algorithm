/**
 * Hàm tính số lượng đường đi duy nhất
 * @param {number} m - Số hàng
 * @param {number} n - Số cột
 * @return {number} - Số đường đi duy nhất
 */
function uniquePaths(m, n) {
    // Tạo mảng 1 chiều kích thước n, lấp đầy bằng số 1
    // Đại diện cho hàng đầu tiên (chỉ có 1 cách đi duy nhất là rẽ phải)
    let dp = new Array(n).fill(1);

    // Lặp qua các hàng còn lại (từ hàng index 1 đến m-1)
    for (let i = 1; i < m; i++) {
        // Lặp qua các cột (từ cột index 1 đến n-1)
        for (let j = 1; j < n; j++) {
            // dp[j] mới = dp[j] cũ (ô phía trên) + dp[j-1] (ô bên trái)
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    // Kết quả nằm ở ô cuối cùng của mảng
    return dp[n - 1];
}

// --- Hệ thống Test Runner thu nhỏ ---
function runTest(testName, actual, expected) {
    if (actual === expected) {
        console.log(`✅ PASSED: ${testName}`);
    } else {
        console.error(`❌ FAILED: ${testName} | Expected: ${expected}, but got: ${actual}`);
    }
}

// --- Các ca kiểm thử (Unit Tests) ---
function testUniquePaths() {
    console.log("--- Bắt đầu chạy Unit Test ---");

    // Test case 1: Ví dụ từ đề bài (m = 3, n = 7)
    runTest("Example 1 (m = 3, n = 7)", uniquePaths(3, 7), 28);

    // Test case 2: Ví dụ từ đề bài (m = 3, n = 2)
    runTest("Example 2 (m = 3, n = 2)", uniquePaths(3, 2), 3);

    // Test case 3: Lưới nhỏ nhất 1x1
    runTest("Lưới 1x1", uniquePaths(1, 1), 1);

    // Test case 4: Chỉ có 1 hàng (m = 1, n = 5) -> Chỉ có 1 đường đi thẳng sang phải
    runTest("Lưới 1x5", uniquePaths(1, 5), 1);

    // Test case 5: Chỉ có 1 cột (m = 5, n = 1) -> Chỉ có 1 đường đi thẳng xuống dưới
    runTest("Lưới 5x1", uniquePaths(5, 1), 1);

    // Test case 6: Lưới vuông 3x3
    runTest("Lưới vuông 3x3", uniquePaths(3, 3), 6);

    console.log("--- Hoàn thành Unit Test ---");
}

// Thực thi test
testUniquePaths();
