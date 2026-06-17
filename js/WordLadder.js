/**
 * LeetCode Daily Challenge
 * ID: 127
 * Title: Word Ladder
 * Difficulty: Hard
 * URL: https://leetcode.com/problems/word-ladder/
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = (beginWord, endWord, wordList) => {
    // VỚI INPUT MẪU: beginWord = "hit", endWord = "cog", wordList = ["hot", "dog", "cog"]

    // 1. Chuyển đổi mảng thành Set để tìm kiếm phần tử trong O(1)
    const wordSet = new Set(wordList);

    // Nếu từ đích không nằm trong từ điển, chắc chắn không thể biến đổi đến nơi
    if (!wordSet.has(endWord)) return 0;

    // 2. Khởi tạo hàng đợi BFS. Mỗi phần tử lưu cặp: [từ_hiện_tại, độ_dài_chuỗi_biến_đổi_đến_nó]
    const queue = [[beginWord, 1]]; 

    // 3. Vòng lặp BFS loang theo từng tầng láng giềng
    while (queue.length > 0) {
        // Lấy phần tử đầu tiên ra khỏi hàng đợi
        const [currentWord, level] = queue.shift();

        // Nếu đã biến đổi chạm tới endWord, trả về độ dài chuỗi bước đi ngay lập tức
        if (currentWord === endWord) {
            return level;
        }

        // 4. Sinh từ láng giềng bằng cách thay thế từng chữ cái từ 'a' đến 'z'
        for (let i = 0; i < currentWord.length; i++) {
            // Lưu lại chữ cái gốc tại vị trí i
            const originalChar = currentWord[i];

            for (let c = 97; c <= 122; c++) { // 97 là mã ASCII của 'a', 122 là 'z'
                const newChar = String.fromCharCode(c);

                // Bỏ qua nếu chữ cái thay thế trùng với chữ cái gốc ban đầu
                if (newChar === originalChar) continue;

                // Tạo từ mới ghép bởi: đoạn trước + chữ cái mới + đoạn sau
                const nextWord = currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);

                // Nếu từ mới sinh ra nằm trong tập hợp wordSet (hợp lệ và chưa từng đi qua)
                if (wordSet.has(nextWord)) {
                    // Đẩy vào hàng đợi với số bước tăng lên 1 đơn vị
                    queue.push([nextWord, level + 1]);
                    // XÓA KHỎI SET để đánh dấu là đã duyệt qua (Visited)
                    wordSet.delete(nextWord);
                }
            }
        }

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE LUỒNG CHẠY (VÒNG LẶP BFS) ---
        //
        // 🔄 TẦNG 1: queue ban đầu = [["hit", 1]], wordSet = {"hot", "dog", "cog"}
        //   - Lấy ["hit", 1] ra. currentWord = "hit", level = 1.
        //   - Thử thay chữ cái ở vị trí i = 2 ('t') thành 't'->'ot' => sinh ra "hot".
        //   - Vì "hot" nằm trong wordSet -> queue.push(["hot", 2]), wordSet.delete("hot")
        //   - Kết thúc Tầng 1: queue = [["hot", 2]], wordSet còn {"dog", "cog"}
        //
        // 🔄 TẦNG 2: queue = [["hot", 2]]
        //   - Lấy ["hot", 2] ra. currentWord = "hot", level = 2.
        //   - Thử thay chữ cái vị trí i = 0 ('h') thành 'd' => sinh ra "dot" (không có trong Set).
        //   - Thử tiếp tục các tổ hợp khác... không trúng từ nào trong Set nữa.
        //   - Kết thúc Tầng 2: queue = [] (Hàng đợi trống rỗng)
        //
        // 🎯 Do không chạm được đến "cog" trong kịch bản mẫu thu gọn này, hàm sẽ thoát vòng lặp.
    }

    // Nếu duyệt hết đồ thị mà không tìm thấy đường tới endWord, trả về 0
    return 0;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Tìm được đường đi ngắn nhất qua 5 bước liên kết",
            input: {
                beginWord: "hit",
                endWord: "cog",
                wordList: ["hot", "dot", "dog", "lot", "log", "cog"]
            },
            expected: 5 // hit -> hot -> dot -> dog -> cog
        },
        {
            name: "Ví dụ 2: Thất bại do endWord không tồn tại trong từ điển",
            input: {
                beginWord: "hit",
                endWord: "cog",
                wordList: ["hot", "dot", "dog", "lot", "log"]
            },
            expected: 0
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Word Ladder ===`);

    testCases.forEach((test, index) => {
        let actual = ladderLength(test.input.beginWord, test.input.endWord, test.input.wordList);
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
