/**
 * Giải bài toán Edit Distance bằng Quy hoạch động LeetCode 72
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // Khởi tạo mảng dp 2 chiều (m + 1) x (n + 1)
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Điền các trường hợp cơ sở
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Tính toán các trạng thái tiếp theo
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Ký tự giống nhau, không tốn chi phí
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Ký tự khác nhau, lấy min của 3 thao tác + 1
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j - 1], // Replace
                    dp[i - 1][j],     // Delete
                    dp[i][j - 1]      // Insert
                );
            }
        }
    }

    return dp[m][n];
}


// ==========================================
// HỆ THỐNG UNIT TEST CHẠY BẰNG JAVASCRIPT THUẦN
// ==========================================

function runTests() {
    const testCases = [
        {
            name: "Example 1: horse -> ros",
            word1: "horse",
            word2: "ros",
            expected: 3
        },
        {
            name: "Example 2: intention -> execution",
            word1: "intention",
            word2: "execution",
            expected: 5
        },
        {
            name: "Hai chuỗi giống nhau hoàn toàn",
            word1: "leetcode",
            word2: "leetcode",
            expected: 0
        },
        {
            name: "Một chuỗi rỗng hoàn toàn",
            word1: "",
            word2: "abc",
            expected: 3
        },
        {
            name: "Cả hai chuỗi đều rỗng",
            word1: "",
            word2: "",
            expected: 0
        },
        {
            name: "Chỉ thay thế toàn bộ ký tự",
            word1: "abc",
            word2: "xyz",
            expected: 3
        }
    ];

    let passed = 0;
    console.log("--- BẮT ĐẦU CHẠY UNIT TEST ---");

    testCases.forEach((test, index) => {
        const result = minDistance(test.word1, test.word2);
        
        if (result === test.expected) {
            console.log(`✅ Test ${index + 1} PASSED: [${test.name}]`);
            passed++;
        } else {
            console.error(`❌ Test ${index + 1} FAILED: [${test.name}]`);
            console.error(`   -> Kết quả thực tế: ${result} | Kỳ vọng: ${test.expected}`);
        }
    });

    console.log("\n--- KẾT QUẢ CHUNG ---");
    console.log(`Kết quả: K通過 ${passed}/${testCases.length} bài test.`);
    
    if (passed === testCases.length) {
        console.log("🎉 TẤT CẢ BÀI TEST ĐÃ VƯỢT QUA THÀNH CÔNG!");
    } else {
        console.log("⚠️ Có bài test bị lỗi, vui lòng kiểm tra lại logic.");
    }
}

// Kích hoạt chạy test
runTests();
