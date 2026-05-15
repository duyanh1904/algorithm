/**
 * Bài toán: Maximal Rectangle (LeetCode 85 - Hard)
 * Pattern: Dynamic Programming + Monotonic Stack
 * Độ phức tạp: Thời gian O(Rows * Cols), Không gian O(Cols)
 */
function maximalRectangle(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0); // Mảng lưu chiều cao cột tại mỗi hàng
    let maxArea = 0;

    for (let r = 0; r < matrix.length; r++) {
        // 1. Cập nhật biểu đồ cột cho hàng hiện tại
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === '1') {
                heights[c] += 1; // Xây cao thêm
            } else {
                heights[c] = 0;  // Sụp đổ về 0
            }
        }

        // 2. Tính diện tích lớn nhất cho biểu đồ của hàng hiện tại
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

/**
 * Hàm Helper: Tính hình chữ nhật lớn nhất trong Histogram bằng Monotonic Stack
 * Độ phức tạp: O(N)
 */
function largestRectangleArea(heights) {
    // Thêm một cột ảo cao 0 ở cuối để ép Stack phải xả hết toàn bộ dữ liệu khi duyệt xong
    const h = [...heights, 0]; 
    const stack = []; // Lưu INDEX của cột, đảm bảo chiều cao tăng dần
    let max = 0;

    for (let i = 0; i < h.length; i++) {
        // Khi gặp một cột THẤP HƠN cột ở đỉnh Stack -> Cột trên đỉnh Stack đã tìm thấy "Giới hạn bên phải"
        while (stack.length > 0 && h[i] < h[stack[stack.length - 1]]) {
            const height = h[stack.pop()]; // Chiều cao của tòa nhà bị rút ra
            
            // Giới hạn bên phải chính là i hiện tại (do nó làm sập tòa nhà)
            // Giới hạn bên trái chính là đỉnh mới của Stack (người thấp hơn tòa nhà vừa rút)
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            
            max = Math.max(max, height * width);
        }
        stack.push(i);
    }

    return max;
}

// ================= HỆ THỐNG UNIT TEST =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: MAXIMAL RECTANGLE (HARD)\n");

    const testCases = [
        {
            description: "1. Ví dụ chuẩn LeetCode",
            matrix: [
                ["1","0","1","0","0"],
                ["1","0","1","1","1"],
                ["1","1","1","1","1"],
                ["1","0","0","1","0"]
            ],
            expected: 6,
            reason: "Hình chữ nhật 2x3 ở hàng 1 và 2 (cột 2, 3, 4)."
        },
        {
            description: "2. Edge Case - Chỉ có 1 số 0",
            matrix: [["0"]],
            expected: 0,
            reason: "Không có số 1 nào, diện tích là 0."
        },
        {
            description: "3. Edge Case - Chỉ có 1 số 1",
            matrix: [["1"]],
            expected: 1,
            reason: "Khối duy nhất tự tạo thành hình 1x1."
        },
        {
            description: "4. Ma trận 1 hàng (Mảng 1D)",
            matrix: [["0","1","1","0","1"]],
            expected: 2,
            reason: "Hình lớn nhất nằm trọn trong 1 hàng (1x2)."
        },
        {
            description: "5. Ma trận 1 cột (Mảng 1D dọc)",
            matrix: [
                ["1"],
                ["1"],
                ["0"],
                ["1"]
            ],
            expected: 2,
            reason: "Hai số 1 liên tiếp tạo thành hình 2x1."
        },
        {
            description: "6. Ma trận toàn số 1 (Full Matrix)",
            matrix: [
                ["1","1","1"],
                ["1","1","1"],
                ["1","1","1"]
            ],
            expected: 9,
            reason: "Diện tích chính là toàn bộ ma trận (3x3)."
        },
        {
            description: "7. Khối lớn bị giới hạn bởi số 0 ở góc",
            matrix: [
                ["1","1","1","1"],
                ["1","1","1","1"],
                ["1","1","1","0"]
            ],
            expected: 8,
            reason: "Hình 2x4 (2 hàng đầu) sẽ lớn hơn hình 3x3 (3 hàng đầu nhưng bỏ cột cuối)."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = maximalRectangle(tc.matrix);
        
        if (actual === tc.expected) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.error(`   🎯 Expected: ${tc.expected}`);
            console.error(`   🚨 Actual:   ${actual}`);
        }
        console.log(`   💡 Mục đích test: ${tc.reason}\n`);
    });

    console.log("==================================================");
    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Monotonic Stack kết hợp với DP thực sự là một vũ khí hủy diệt.`);
    } else {
        console.log(`⚠️ Có lỗi trong khâu xử lý Histogram.`);
    }
}

// Khởi chạy
runTests();
