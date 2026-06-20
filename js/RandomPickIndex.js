/**
 * LeetCode Daily Challenge
 * ID: 398
 * Title: Random Pick Index
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/random-pick-index/
 */

class Solution {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        // VỚI INPUT MẪU KHỞI TẠO: nums = [1, 2, 3, 3]

        // Khởi tạo một Map để lưu trữ cặp: giá_trị -> [danh_sách_các_chỉ_số_index]
        this.indicesMap = new Map();

        // Duyệt qua mảng một lần duy nhất lúc khởi tạo (O(N) time, O(N) space)
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            
            if (!this.indicesMap.has(num)) {
                this.indicesMap.set(num, []);
            }
            
            // Đẩy chỉ số index i hiện tại vào danh sách quản lý của số num
            this.indicesMap.get(num).push(i);
        }

        // --- TRACE CODE SAU KHI KHỞI TẠO XONG ---
        // this.indicesMap = Map {
        //     1 => [0],
        //     2 => [1],
        //     3 => [2, 3]
        // }
    }

    /** * @param {number} target
     * @return {number}
     */
    pick(target) {
        // --- TRACE CODE KHI GỌI: pick(3) ---

        // 1. Lấy ra mảng các chỉ số index tương ứng với target trong O(1)
        const indices = this.indicesMap.get(target); // indices = [2, 3]

        // 2. Sinh ngẫu nhiên một vị trí index hợp lệ chạy từ 0 đến indices.length - 1
        const randomIndex = Math.floor(Math.random() * indices.length);

        // 3. Trả về chỉ số thực tế nằm trong mảng gốc với xác suất đồng đều tuyệt đối O(1)
        // Ví dụ: Nếu randomIndex ra 0 -> trả về indices[0] tức là số 2
        //        Nếu randomIndex ra 1 -> trả về indices[1] tức là số 3
        return indices[randomIndex];
    }
}

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    let passedCount = 0;
    const testCasesCount = 1;

    console.log(`=== RUNNING TESTS FOR: Random Pick Index ===`);

    try {
        // Khởi tạo đối tượng Solution với mảng chứa nhiều số 3 trùng lặp
        const solution = new Solution([1, 2, 3, 3, 3]);
        let results = [];

        // Lấy ngẫu nhiên vị trí của số 3 (Kỳ vọng trả về một trong các số: 2, 3, hoặc 4)
        const pick1 = solution.pick(3);
        results.push(pick1 === 2 || pick1 === 3 || pick1 === 4);

        // Lấy vị trí của số 1 (Chỉ có duy nhất 1 vị trí là index 0)
        const pick2 = solution.pick(1);
        results.push(pick2 === 0);

        // Lấy lại ngẫu nhiên vị trí số 3 một lần nữa
        const pick3 = solution.pick(3);
        results.push(pick3 === 2 || pick3 === 3 || pick3 === 4);

        // Tất cả các lần lấy mẫu trên đều phải trả về kết quả hợp lệ (true)
        const expected = [true, true, true];
        const isPassed = JSON.stringify(results) === JSON.stringify(expected);

        if (isPassed) {
            console.log(`✅ Test #1 PASSED: Thiết kế cấu trúc Hash Map giúp pick đạt O(1) chính xác`);
            passedCount++;
        } else {
            console.error(`❌ Test #1 FAILED: Vị trí ngẫu nhiên trả về nằm ngoài danh sách chỉ số.`);
            console.error(`   - Expected:`, expected);
            console.error(`   - Actual:  `, results);
        }
    } catch (error) {
        console.error(`❌ Test phát sinh lỗi nghiêm trọng khi thực thi:`, error);
    }

    console.log("-----------------------------------------");
    if (passedCount !== testCasesCount) {
        console.error(`Kết quả: Thất bại ${testCasesCount - passedCount}/${testCasesCount} bài test.`);
        process.exit(1);
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCasesCount} bài test.`);
    }
};

runTests();
