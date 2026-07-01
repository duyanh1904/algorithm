/**
 * LeetCode Daily Challenge (Inspired by Azure DNS Gateway Partitioning)
 * ID: 3690
 * Title: Azure DNS Gateway Load Balancer (Partition to K Equal Sum Subsets)
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
 *
 * Context: Trong Azure DNS, nhiều cổng gateway xử lý lượng truy vấn khác nhau.
 * Bài toán kiểm tra xem có thể phân chia các vùng DNS (loads) thành K cổng gateway
 * sao cho tổng tải trên mỗi gateway bằng nhau (target = total / k) hay không.
 */

/**
 * @param {number[]} loads - Mảng số nguyên đại diện cho lượng truy vấn (triệu lượt/ngày) của từng vùng DNS.
 * @param {number} k - Số lượng Azure DNS Gateways có sẵn.
 * @return {boolean}
 */
const canPartitionDNS = (loads, k) => {
    const total = loads.reduce((a, b) => a + b, 0);

    // Nếu không có gateway hoặc tổng không chia hết -> không thể chia đều
    if (k <= 0 || total % k !== 0) return false;

    const target = total / k;
    // Sắp xếp giảm dần để tối ưu Backtracking (nhặt phần tử lớn trước)
    loads.sort((a, b) => b - a);

    // Nếu phần tử lớn nhất vượt quá target, chắc chắn thất bại
    if (loads[0] > target) return false;

    const used = new Array(loads.length).fill(false);

    const backtrack = (start, currentSum, completedGroups) => {
        // Nếu đã tạo được k-1 group, group cuối cùng tự động hợp lệ
        if (completedGroups === k - 1) return true;

        for (let i = start; i < loads.length; i++) {
            if (used[i] || currentSum + loads[i] > target) continue;

            used[i] = true;
            if (currentSum + loads[i] === target) {
                // Đã hoàn thành 1 group, bắt đầu tìm group tiếp theo
                if (backtrack(0, 0, completedGroups + 1)) return true;
            } else {
                // Tiếp tục thêm phần tử vào group hiện tại
                if (backtrack(i + 1, currentSum + loads[i], completedGroups)) return true;
            }
            used[i] = false;

            // Tối ưu: Nếu thất bại ngay khi bắt đầu group mới (currentSum = 0) -> dừng
            if (currentSum === 0) return false;
            // Bỏ qua các phần tử trùng giá trị để tránh lặp vô ích
            while (i + 1 < loads.length && loads[i + 1] === loads[i]) i++;
        }
        return false;
    };

    return backtrack(0, 0, 0);
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "K=2, Có thể chia đều: [1,2,3,4] -> 1+4=5, 2+3=5",
            input: { loads: [1, 2, 3, 4], k: 2 },
            expected: true
        },
        {
            name: "K=2, Không thể chia đều do tổng lẻ: [1,2,3,5] -> tổng 11 không chia hết cho 2",
            input: { loads: [1, 2, 3, 5], k: 2 },
            expected: false
        },
        {
            name: "K=3, Chia đều thành 3 cổng: [1,2,3,4,5,6] -> target=7 (1+6, 2+5, 3+4)",
            input: { loads: [1, 2, 3, 4, 5, 6], k: 3 },
            expected: true
        },
        {
            name: "K=3, Không thể chia đều: [1,1,1,1,1,1,1] -> tổng 7 không chia hết cho 3",
            input: { loads: [1, 1, 1, 1, 1, 1, 1], k: 3 },
            expected: false
        },
        {
            name: "Phần tử lớn vượt target: [10,1,1], K=2 -> target=6, có phần tử 10 > 6",
            input: { loads: [10, 1, 1], k: 2 },
            expected: false
        },
        {
            name: "K=1 (chỉ 1 gateway) -> luôn true vì chỉ cần gộp hết lại",
            input: { loads: [5, 3, 2], k: 1 },
            expected: true // tổng = 10, target = 10
        },
        {
            name: "Có mảng rỗng hoặc K=0 -> false",
            input: { loads: [], k: 0 },
            expected: false
        },
        {
            name: "Các vùng DNS có tải trùng nhau và chia được: [4,4,4,4], K=2 -> target=8, cặp (4+4)",
            input: { loads: [4, 4, 4, 4], k: 2 },
            expected: true
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Azure DNS Gateway Partitioning (K Equal Sum) ===`);

    testCases.forEach((test, index) => {
        let actual;
        // Xử lý input là object chứa nhiều tham số (loads, k)
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            actual = canPartitionDNS(test.input.loads, test.input.k);
        } else {
            // Fallback (không dùng đến trong test này)
            actual = canPartitionDNS(test.input);
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
        process.exit(1); // Thoát với mã lỗi nếu có test sai
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCases.length} bài test.`);
    }
};

// Chạy toàn bộ unit test
runTests();