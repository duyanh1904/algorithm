/**
 * LeetCode Daily Challenge
 * ID: 78
 * Title: Subsets
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/subsets/
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
    // VỚI INPUT MẪU: nums = [1, 2]

    const result = []; // Mảng chứa tất cả các tập hợp con kết quả cuối cùng
    const currentSubset = []; // Mảng tạm thời lưu tập con đang được xây dựng trong luồng đệ quy

    // Hàm đệ quy Backtracking loang theo chỉ số index
    const backtrack = (index) => {
        // Điều kiện dừng: Khi index bằng chiều dài mảng, nghĩa là đã xét qua hết mọi phần tử
        if (index === nums.length) {
            // Sao chép sâu mảng tạm currentSubset hiện tại và đẩy vào mảng kết quả
            result.push([...currentSubset]);
            return;
        }

        // --- NHÁNH 1: LỰA CHỌN ĐƯA PHẦN TỬ nums[index] VÀO TẬP CON ---
        currentSubset.push(nums[index]); // Thêm phần tử vào tập con tạm thời
        backtrack(index + 1);            // Tiếp tục đệ quy tiến lên xét phần tử kế tiếp

        // --- NHÁNH 2: QUAY LUI (BACKTRACK) - BỎ PHẦN TỬ ĐÓ RA ---
        currentSubset.pop();             // Rút phần tử vừa thêm ra khỏi mảng tạm
        backtrack(index + 1);            // Đệ quy rẽ sang nhánh không chứa phần tử đó
    };

    // Bắt đầu kích hoạt đệ quy từ vị trí phần tử đầu tiên (index = 0)
    backtrack(0);

    // --- DIỄN GIẢI CHI TIẾT ĐƯỜNG ĐI TRACE CODE VỚI INPUT [1, 2] ---
    //
    // 🟢 Khởi động: backtrack(0) -> nums[0] là số 1
    //   |-- Nhánh 1: Thêm 1 vào. currentSubset = [1]. Gọi tiếp backtrack(1) -> nums[1] là số 2
    //   |     |-- Nhánh 1.1: Thêm 2 vào. currentSubset = [1, 2]. Gọi tiếp backtrack(2)
    //   |     |     |-- Điểm dừng (index=2): result.push([[1, 2]]) -> Gặp return.
    //   |     |-- Quay lui 1.1: Cắt số 2 ra. currentSubset = [1].
    //   |     |-- Nhánh 1.2: Không thêm 2. Gọi tiếp backtrack(2)
    //   |           |-- Điểm dừng (index=2): result.push([1]) -> Gặp return.
    //   |
    //   |-- Quay lui 1: Cắt số 1 ra. currentSubset = [].
    //   |-- Nhánh 2: Không thêm 1. Khởi động lại vòng đời từ backtrack(1) với currentSubset = []
    //         |-- Nhánh 2.1: Thêm 2 vào. currentSubset = [2]. Gọi tiếp backtrack(2)
    //         |     |-- Điểm dừng (index=2): result.push([2]) -> Gặp return.
    //         |-- Quay lui 2.1: Cắt số 2 ra. currentSubset = [].
    //         |-- Nhánh 2.2: Không thêm 2. Gọi tiếp backtrack(2)
    //               |-- Điểm dừng (index=2): result.push([]) -> Gặp return.
    //
    // 🎯 Kết thúc đệ quy, mảng result thu được thu hoạch đủ 4 phần tử: [[1,2], [1], [2], []]

    return result;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Tập lũy thừa của mảng 3 phần tử độc nhất",
            input: [1, 2, 3],
            expected: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []]
        },
        {
            name: "Ví dụ 2: Mảng chỉ
