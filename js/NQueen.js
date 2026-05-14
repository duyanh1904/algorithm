/**
 * Bài toán: N-Queens (LeetCode 51 - Hard)
 * Pattern: Backtracking
 * Độ phức tạp: Thời gian O(N!), Không gian O(N^2) để lưu kết quả
 */
function solveNQueens(n) {
    const result = [];
    
    // 3 "Quyển sổ" lưu trữ vùng không gian đã bị chiếm
    const cols = new Set();
    const posDiag = new Set(); // Đường chéo phụ: r + c
    const negDiag = new Set(); // Đường chéo chính: r - c
    
    // Mảng 1 chiều để lưu vị trí: board[row] = col
    const board = [];

    // Hàm đệ quy Quay lui
    function backtrack(row) {
        // Điều kiện dừng: Nếu đã đi hết N hàng -> Tìm thấy 1 kết quả hợp lệ
        if (row === n) {
            result.push(formatBoard(board, n));
            return;
        }

        // Thử đặt quân Hậu vào từng cột của hàng hiện tại
        for (let col = 0; col < n; col++) {
            // Nếu ô (row, col) nằm trong vùng bị tấn công -> Bỏ qua
            if (cols.has(col) || posDiag.has(row + col) || negDiag.has(row - col)) {
                continue;
            }

            // [HÀNH ĐỘNG] 1. Đặt quân Hậu (Đánh dấu chiếm lãnh thổ)
            cols.add(col);
            posDiag.add(row + col);
            negDiag.add(row - col);
            board.push(col);

            // [ĐỆ QUY] 2. Đi tiếp sang hàng tiếp theo
            backtrack(row + 1);

            // [QUAY LUI] 3. Rút quân Hậu ra (Trả lại không gian để thử phương án khác)
            cols.delete(col);
            posDiag.delete(row + col);
            negDiag.delete(row - col);
            board.pop();
        }
    }

    // Bắt đầu từ hàng 0
    backtrack(0);
    return result;
}

/**
 * Hàm Helper: Biến mảng vị trí thành mảng chuỗi format theo yêu cầu LeetCode
 * Ví dụ: board = [1, 3, 0, 2] -> [".Q..", "...Q", "Q...", "..Q."]
 */
function formatBoard(board, n) {
    return board.map(colIndex => {
        const rowArr = new Array(n).fill('.');
        rowArr[colIndex] = 'Q';
        return rowArr.join('');
    });
}

// ================= HỆ THỐNG UNIT TEST =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: N-QUEENS\n");

    // Hàm Helper so sánh 2 mảng 2D bất chấp thứ tự của các cấu hình bàn cờ
    const isMatch = (actual, expected) => {
        if (actual.length !== expected.length) return false;
        
        const normalize = (arr) => arr.map(board => board.join('|')).sort();
        const normActual = normalize(actual);
        const normExpected = normalize(expected);
        
        for (let i = 0; i < normActual.length; i++) {
            if (normActual[i] !== normExpected[i]) return false;
        }
        return true;
    };

    const testCases = [
        {
            description: "1. Ví dụ chuẩn - Bàn cờ 4x4",
            n: 4,
            expected: [
                [".Q..", "...Q", "Q...", "..Q."],
                ["..Q.", "Q...", "...Q", ".Q.."]
            ],
            reason: "Có đúng 2 cách xếp hợp lệ cho bàn 4x4."
        },
        {
            description: "2. Edge Case - Bàn cờ 1x1",
            n: 1,
            expected: [
                ["Q"]
            ],
            reason: "Chỉ có 1 ô, đặt thẳng 1 quân hậu."
        },
        {
            description: "3. Tình huống vô nghiệm - Bàn cờ 2x2",
            n: 2,
            expected: [],
            reason: "Bàn cờ 2x2 không thể đặt 2 quân Hậu mà không ăn nhau."
        },
        {
            description: "4. Tình huống vô nghiệm - Bàn cờ 3x3",
            n: 3,
            expected: [],
            reason: "Bàn cờ 3x3 không thể đặt 3 quân Hậu mà không ăn nhau."
        },
        {
            description: "5. Bài toán kinh điển - Số lượng nghiệm cho Bàn cờ 8x8",
            n: 8,
            expectedLength: 92, // Carl Friedrich Gauss đã tính ra có 92 nghiệm
            reason: "Kiểm tra giới hạn và số lượng nghiệm chính xác của cờ vua tiêu chuẩn."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = solveNQueens(tc.n);
        let passed = false;

        // Xử lý riêng cho case 8x8 vì in ra 92 cái mảng thì quá dài
        if (tc.expectedLength !== undefined) {
            passed = actual.length === tc.expectedLength;
        } else {
            passed = isMatch(actual, tc.expected);
        }
        
        if (passed) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.error(`   🎯 Kỳ vọng số lượng: ${tc.expectedLength || tc.expected.length} | 🚨 Thực tế: ${actual.length}`);
        }
        console.log(`   💡 Mục đích test: ${tc.reason}\n`);
    });

    console.log("==================================================");
    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Khả năng Backtracking của bạn đã đạt mức Master.`);
    } else {
        console.log(`⚠️ Có lỗi xảy ra trong quá trình đệ quy quay lui.`);
    }
}

// Khởi chạy
runTests();
