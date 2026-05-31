/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 * LettCode 79 
 */
const exist = (board, word) => {
    const m = board.length;
    const n = board[0].length;

    // --- SEARCH PRUNING (TỈA NHÁNH TÌM KIẾM) ---
    // Điều kiện tối thiểu: Chiều dài từ không được vượt quá tổng số ô trong bảng
    if (word.length > m * n) return false;

    // Đếm tần suất xuất hiện của các ký tự trong bảng để kiểm tra tính khả thi
    const boardCharCount = {};
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const char = board[r][c];
            boardCharCount[char] = (boardCharCount[char] || 0) + 1;
        }
    }

    // Nếu bảng không có đủ số lượng ký tự cần thiết cho từ, hủy luôn không cần tìm
    const wordCharCount = {};
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        wordCharCount[char] = (wordCharCount[char] || 0) + 1;
        if (!boardCharCount[char] || wordCharCount[char] > boardCharCount[char]) {
            return false;
        }
    }

    // TỐI ƯU HÓA ĐƯỜNG ĐI: Nếu ký tự cuối ít xuất hiện hơn ký tự đầu, 
    // lật ngược từ lại để duyệt từ đầu ít nhánh lỗi hơn.
    const firstCharCount = boardCharCount[word[0]] || 0;
    const lastCharCount = boardCharCount[word[word.length - 1]] || 0;
    if (lastCharCount < firstCharCount) {
        word = word.split('').reverse().join('');
    }
    // -------------------------------------------

    // Hàm đệ quy DFS Backtracking
    const dfs = (r, c, index) => {
        // Điều kiện dừng: Nếu đã khớp hết toàn bộ các ký tự của word
        if (index === word.length) return true;

        // Kiểm tra ranh giới ma trận và ký tự tại ô hiện tại có khớp không
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[index]) {
            return false;
        }

        // Đánh dấu ô hiện tại đã sử dụng (Tránh quay lại ô cũ trong cùng 1 từ)
        const temp = board[r][c];
        board[r][c] = '#'; 

        // Thử đi sang 4 hướng: Lên, Xuống, Trái, Phải
        const found = dfs(r + 1, c, index + 1) ||
                      dfs(r - 1, c, index + 1) ||
                      dfs(r, c + 1, index + 1) ||
                      dfs(r, c - 1, index + 1);

        // QUAY LUI (BACKTRACK): Hoàn trả lại ký tự gốc cho ô để dùng cho các nhánh tìm kiếm khác
        board[r][c] = temp;

        return found;
    };

    // Duyệt qua từng ô trong ma trận làm điểm xuất phát
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }

    return false;
};

// Trình chạy test framework bằng JS thuần
const runTests = () => {
    // Định nghĩa chung bảng board mẫu của LeetCode để tái sử dụng
    const sampleBoard = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ];

    const testCases = [
        {
            name: "Ví dụ 1: Tìm thấy từ ABCCED (Dích dắc)",
            input: { board: JSON.parse(JSON.stringify(sampleBoard)), word: "ABCCED" },
            expected: true
        },
        {
            name: "Ví dụ 2: Tìm thấy từ SEE (Hàng dưới cùng dịch lên)",
            input: { board: JSON.parse(JSON.stringify(sampleBoard)), word: "SEE" },
            expected: true
        },
        {
            name: "Ví dụ 3: Từ ABCB không tồn tại (Trùng ô chữ B cũ)",
            input: { board: JSON.parse(JSON.stringify(sampleBoard)), word: "ABCB" },
            expected: false
        },
        {
            name: "Pruning Test: Từ quá dài so với kích thước bảng",
            input: { board: [["A"]], word: "AAAA" },
            expected: false
        },
        {
            name: "Pruning Test: Bảng thiếu ký tự cần thiết",
            input: { board: [["A", "B"], ["C", "D"]], word: "ABZ" },
            expected: false
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Word Search I ===`);

    testCases.forEach((test, index) => {
        const { board, word } = test.input;
        const actual = exist(board, word);
        const isPassed = actual === test.expected;

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Word:     "${word}"`);
            console.error(`   - Expected: ${test.expected}`);
            console.error(`   - Actual:   ${actual}`);
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

// Thực thi chạy test
runTests();
