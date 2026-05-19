/**
 * Giải bài toán Surrounded Regions (In-place)
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solve(board) {
    if (!board || board.length === 0) return;

    const m = board.length;
    const n = board[0].length;

    // Hàm DFS dùng để loang và đánh dấu các ô 'O' liên thông với biên thành 'T'
    function dfs(r, c) {
        // Kiểm tra điều kiện biên và ô hiện tại có phải 'O' không
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') {
            return;
        }
        
        // Đánh dấu tạm thời ô an toàn này thành 'T'
        board[r][c] = 'T';

        // Loang sang 4 hướng lân cận: Trên, Dưới, Trái, Phải
        dfs(r - 1, c); // Trên
        dfs(r + 1, c); // Dưới
        dfs(r, c - 1); // Trái
        dfs(r, c + 1); // Phải
    }

    // Bước 1: Quét và gọi DFS cho các ô 'O' ở Cột đầu tiên (c=0) và Cột cuối cùng (c=n-1)
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfs(i, 0);
        if (board[i][n - 1] === 'O') dfs(i, n - 1);
    }

    // Bước 1: Quét và gọi DFS cho các ô 'O' ở Hàng đầu tiên (i=0) và Hàng cuối cùng (i=m-1)
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') dfs(0, j);
        if (board[m - 1][j] === 'O') dfs(m - 1, j);
    }

    // Bước 2: Duyệt lại toàn bộ ma trận để cập nhật kết quả cuối cùng
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                // Ô 'O' bị bao vây hoàn toàn -> Biến thành 'X'
                board[i][j] = 'X';
            } else if (board[i][j] === 'T') {
                // Ô 'T' là ô an toàn liên thông với biên -> Trả lại thành 'O'
                board[i][j] = 'O';
            }
        }
    }
}


// ==========================================
// HỆ THỐNG UNIT TEST CHẠY BẰNG JAVASCRIPT THUẦN
// ==========================================

// Hàm helper dùng để so sánh 2 ma trận bằng nhau
function areMatricesEqual(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length) return false;
    for (let i = 0; i < matrixA.length; i++) {
        if (matrixA[i].length !== matrixB[i].length) return false;
        for (let j = 0; j < matrixA[i].length; j++) {
            if (matrixA[i][j] !== matrixB[i][j]) return false;
        }
    }
    return true;
}

function runTests() {
    const testCases = [
        {
            name: "Example 1: Ma trận tiêu chuẩn có vùng bị bao vây và vùng ở biên",
            input: [
                ["X","X","X","X"],
                ["X","O","O","X"],
                ["X","X","O","X"],
                ["X","O","X","X"]
            ],
            expected: [
                ["X","X","X","X"],
                ["X","X","X","X"],
                ["X","X","X","X"],
                ["X","O","X","X"]
            ]
        },
        {
            name: "Example 2: Ma trận kích thước 1x1",
            input: [["X"]],
            expected: [["X"]]
        },
        {
            name: "Vùng 'O' nằm hoàn toàn ở biên (Không bị bao vây)",
            input: [
                ["O","O","O"],
                ["O","X","O"],
                ["O","O","O"]
            ],
            expected: [
                ["O","O","O"],
                ["O","X","O"],
                ["O","O","O"]
            ]
        },
        {
            name: "Vùng 'O' lớn nằm bên trong bị bao vây hoàn toàn",
            input: [
                ["X","X","X","X","X"],
                ["X","O","O","O","X"],
                ["X","O","X","O","X"],
                ["X","O","O","O","X"],
                ["X","X","X","X","X"]
            ],
            expected: [
                ["X","X","X","X","X"],
                ["X","X","X","X","X"],
                ["X","X","X","X","X"],
                ["X","X","X","X","X"],
                ["X","X","X","X","X"]
            ]
        }
    ];

    let passed = 0;
    console.log("--- BẮT ĐẦU CHẠY UNIT TEST ---");

    testCases.forEach((test, index) => {
        // Sao chép sâu (Deep copy) dữ liệu đầu vào để tránh việc hàm thay đổi trực tiếp làm mất data gốc lúc in log
        const boardToSolve = JSON.parse(JSON.stringify(test.input));
        
        solve(boardToSolve);
        
        if (areMatricesEqual(boardToSolve, test.expected)) {
            console.log(`✅ Test ${index + 1} PASSED: [${test.name}]`);
            passed++;
        } else {
            console.error(`❌ Test ${index + 1} FAILED: [${test.name}]`);
            console.error(`   -> Kết quả thực tế: ${JSON.stringify(boardToSolve)}`);
            console.error(`   -> Kết quả kỳ vọng: ${JSON.stringify(test.expected)}`);
        }
    });

    console.log("\n--- KẾT QUẢ CHUNG ---");
    console.log(`Kết quả: Vượt qua ${passed}/${testCases.length} bài test.`);
    
    if (passed === testCases.length) {
        console.log("🎉 TẤT CẢ BÀI TEST ĐÃ VƯỢT QUA THÀNH CÔNG!");
    } else {
        console.log("⚠️ Có bài test bị lỗi, vui lòng kiểm tra lại cấu trúc logic.");
    }
}

// Chạy hệ thống kiểm thử
runTests();
