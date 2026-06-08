/**
 * Game of life LeetCode 289
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const gameOfLife = (board) => {
    // VỚI INPUT MẪU: board = [[1, 1], [1, 0]]
    
    const m = board.length;    // m = 2
    const n = board[0].length; // n = 2

    // Định nghĩa 8 hướng xung quanh một ô (ngang, dọc, chéo)
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    // BƯỚC 1: Duyệt qua từng ô để tính toán và áp dụng mã hóa trạng thái tạm thời
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            let liveNeighbors = 0;

            // Đếm số láng giềng sống xung quanh ô (r, c)
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                // Kiểm tra xem tọa độ láng giềng có hợp lệ nằm trong ma trận không
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    // Nếu giá trị là 1 hoặc 2, nghĩa là trong QUÁ KHỨ ô láng giềng này ĐÃ SỐNG
                    if (board[nr][nc] === 1 || board[nr][nc] === 2) {
                        liveNeighbors++;
                    }
                }
            }

            // --- DIỄN GIẢI CHI TIẾT QUÁ TRÌNH MÃ HÓA TỪNG Ô (Đang ở Bước 1) ---

            // 🔄 Xét ô (0, 0) [Giá trị gốc = 1]:
            // 8 hướng xung quanh có 3 ô hợp lệ là (0,1)=1, (1,0)=1, (1,1)=0. => liveNeighbors = 2.
            // Luật: Ô sống có 2 láng giềng sống tiếp tục SỐNG.
            // => Giữ nguyên giá trị board[0][0] = 1.

            // 🔄 Xét ô (0, 1) [Giá trị gốc = 1]:
            // Láng giềng xung quanh là (0,0)=1, (1,0)=1, (1,1)=0. => liveNeighbors = 2.
            // Luật: Tiếp tục SỐNG.
            // => Giữ nguyên giá trị board[0][1] = 1.

            // 🔄 Xét ô (1, 0) [Giá trị gốc = 1]:
            // Láng giềng xung quanh là (0,0)=1, (0,1)=1, (1,1)=0. => liveNeighbors = 2.
            // Luật: Tiếp tục SỐNG.
            // => Giữ nguyên giá trị board[1][0] = 1.

            // 🔄 Xét ô (1, 1) [Giá trị gốc = 0]:
            // Láng giềng xung quanh là (0,0)=1, (0,1)=1, (1,0)=1. => liveNeighbors = 3.
            // Luật: Ô chết có đúng 3 láng giềng sống sẽ HỒI SINH (Chuyển từ Chết sang Sống).
            // => Mã hóa ô này thành giá trị 3. board[1][1] = 3.
            
            // Áp dụng các quy tắc để mã hóa trạng thái tương lai
            if (board[r][c] === 1) {
                // Ô đang sống nếu < 2 hoặc > 3 láng giềng sống thì sẽ chết (Mã hóa = 2)
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    board[r][c] = 2; 
                }
            } else if (board[r][c] === 0) {
                // Ô đang chết nếu có đúng 3 láng giềng sống thì hồi sinh (Mã hóa = 3)
                if (liveNeighbors === 3) {
                    board[r][c] = 3;
                }
            }
        }
    }

    // Kết thúc Bước 1, ma trận tạm thời lưu trong bộ nhớ là: [[1, 1], [1, 3]]

    // BƯỚC 2: Duyệt lại một lần cuối để giải mã, đưa về ma trận chuẩn 0 và 1
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === 2) {
                board[r][c] = 0; // Trạng thái 2 (Sống -> Chết) thành 0
            } else if (board[r][c] === 3) {
                board[r][c] = 1; // Trạng thái 3 (Chết -> Sống) thành 1
            }
        }
    }
    
    // 🎯 Kết thúc Bước 2: Ma trận được cập nhật In-place hoàn chỉnh thành: [[1, 1], [1, 1]]
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Ma trận m x n bất đối xứng cập nhật đồng thời",
            input: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
            expected: [
                [0, 0, 0],
                [1, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
            ]
        },
        {
            name: "Ví dụ 2: Tất cả các ô đều hồi sinh thành công",
            input: [
                [1, 1],
                [1, 0]
            ],
            expected: [
                [1, 1],
                [1, 1]
            ]
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Conway's Game of Life ===`);

    testCases.forEach((test, index) => {
        // Sao chép sâu ma trận đầu vào để thực hiện thay đổi in-place mà không làm hỏng dữ liệu gốc
        const boardToModify = JSON.parse(JSON.stringify(test.input));
        gameOfLife(boardToModify);

        const isPassed = JSON.stringify(boardToModify) === JSON.stringify(test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Expected:`, test.expected);
            console.error(`   - Actual:  `, boardToModify);
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
