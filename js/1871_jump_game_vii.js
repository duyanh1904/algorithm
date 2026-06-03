/**
 * LeetCode Daily Challenge
 * ID: 1871
 * Title: Jump Game VII
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/jump-game-vii/
 */

/**
 * Thuật toán tối ưu O(N) sử dụng Sliding Window và Quy hoạch động
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
const canReach = (s, minJump, maxJump) => {
    // Làm sạch chuỗi đề phòng trường hợp chuỗi bị bọc bởi ký tự thực thể HTML &quot; từ crawler
    s = s.replace(/&quot;/g, '');
    
    const n = s.length;
    if (s[n - 1] === '1') return false;

    // dp[i] lưu trạng thái ô i có thể nhảy tới được từ điểm xuất phát hay không
    const dp = new Array(n).fill(false);
    dp[0] = true; // Ô đầu tiên luôn đứng sẵn

    // Số lượng điểm nhảy hợp lệ hiện tại nằm trong cửa sổ trượt [i - maxJump, i - minJump]
    let reachableCount = 0;

    for (let i = 1; i < n; i++) {
        // Mở rộng cửa sổ trượt: Thêm phần tử mới bước vào vùng có thể nhảy tới i
        if (i >= minJump) {
            if (dp[i - minJump]) {
                reachableCount++;
            }
        }

        // Thu hẹp cửa sổ trượt: Loại bỏ phần tử đã rơi ra ngoài giới hạn xa nhất (maxJump)
        if (i > maxJump) {
            if (dp[i - maxJump - 1]) {
                reachableCount--;
            }
        }

        // Nếu ô hiện tại là '0' và có ít nhất một điểm hợp lệ phía trước có thể nhảy tới nó
        if (s[i] === '0' && reachableCount > 0) {
            dp[i] = true;
        }
    }

    return dp[n - 1];
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1",
            input: {
                "s": "&quot;011010&quot;",
                "minJump": 2,
                "maxJump": 3
            },
            expected: true
        },
        {
            name: "Ví dụ 2",
            input: {
                "s": "&quot;01101110&quot;",
                "minJump": 2,
                "maxJump": 3
            },
            expected: false
        },
        {
            name: "Trường hợp chuỗi sạch không bị dính ký tự thực thể HTML",
            input: {
                "s": "011010",
                "minJump": 2,
                "maxJump": 3
            },
            expected: true
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Jump Game VII ===`);

    testCases.forEach((test, index) => {
        let actual;
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            actual = canReach(...Object.values(test.input));
        } else {
            actual = canReach(test.input);
        }

        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Expected:`, test.expected);
            console.error(`   - Actual:`, actual);
        }
    });

    console.log("-----------------------------------------");
    if (passedCount !== testCases.length) {
        console.error(`Kết quả: Thất bại ${testCases.length - passedCount}/${testCases.length} bài test.`);
        process.exit(1); // Trả về mã lỗi để kích hoạt GitHub Actions báo đỏ nếu thuật toán lỗi
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

runTests();
