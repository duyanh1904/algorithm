/**
 * LeetCode Daily Challenge
 * ID: 827
 * Title: Making A Large Island
 * Difficulty: Hard
 * URL: https://leetcode.com/problems/making-a-large-island/
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const largestIsland = (grid) => {
    // VỚI INPUT MẪU: grid = [[1, 0], [0, 1]]
    
    const n = grid.length; // n = 2
    const islandSizes = {}; // Object lưu trữ: { islandId: size }
    let islandId = 2;       // Bắt đầu đánh nhãn đảo từ số 2 (để phân biệt với 0 và 1)
    let maxIsland = 0;      // Biến lưu diện tích hòn đảo lớn nhất tìm được

    // Hàm đệ quy DFS để loang và tính diện tích đảo, đồng thời gán nhãn ID
    const getIslandSize = (r, c, id) => {
        if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) {
            return 0;
        }
        grid[r][c] = id; // Đổi số 1 thành ID của đảo để đánh dấu đã duyệt
        
        // Loang sang 4 hướng xung quanh
        return 1 + getIslandSize(r + 1, c, id) +
                   getIslandSize(r - 1, c, id) +
                   getIslandSize(r, c + 1, id) +
                   getIslandSize(r, c - 1, id);
    };

    // ====================================================
    // BƯỚC 1: QUÉT TOÀN BỘ MA TRẬN ĐỂ ĐÁNH NHÃN VÀ ĐO DIỆN TÍCH
    // ====================================================
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                const size = getIslandSize(r, c, islandId);
                islandSizes[islandId] = size; // Lưu kích thước vào map
                maxIsland = Math.max(maxIsland, size); // Đề phòng trường hợp ma trận toàn số 1
                islandId++; // Tăng ID lên cho hòn đảo tiếp theo
            }
        }
    }

    // --- TRẠNG THÁI SAU BƯỚC 1 VỚI INPUT [[1, 0], [0, 1]] ---
    // Ô (0,0) mang giá trị 1 ban đầu -> Kích thước = 1, gán ID = 2. grid[0][0] = 2.
    // Ô (1,1) mang giá trị 1 ban đầu -> Kích thước = 1, gán ID = 3. grid[1][1] = 3.
    // Ma trận grid hiện tại biến thành: [[2, 0], [0, 3]]
    // Object lưu kích thước: islandSizes = { "2": 1, "3": 1 }
    // Biến maxIsland hiện tại = 1.

    // Định nghĩa 4 hướng di chuyển (Dưới, Trên, Phải, Trái)
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    // ====================================================
    // BƯỚC 2: THỬ LẬT TỪNG Ô 0 THÀNH 1 ĐỂ TÌM ĐẢO LỚN NHẤT
    // ====================================================
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 0) {
                // Sử dụng Set để lưu các ID đảo xung quanh, tự động loại bỏ trùng lặp
                const neighborIslands = new Set();

                // Kiểm tra 4 hướng xung quanh ô 0 hiện tại
                for (const [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                        const neighborId = grid[nr][nc];
                        if (neighborId > 1) { // Nếu ô bên cạnh là một phần của đảo (có ID >= 2)
                            neighborIslands.add(neighborId);
                        }
                    }
                }

                // Bắt đầu tính diện tích mới: 1 điểm từ chính ô 0 vừa được lật thành 1
                let currentTotalSize = 1;
                
                // Cộng thêm diện tích của tất cả các đảo độc nhất xung quanh
                neighborIslands.forEach(id => {
                    currentTotalSize += islandSizes[id];
                });

                // --- DIỄN GIẢI CHI TIẾT TRACE CODE THỬ LẬT Ô 0 (Bước 2) ---
                
                // 🔄 Thử nghiệm 1 tại ô (0, 1) [Giá trị gốc = 0]:
                // Các hướng xung quanh: Trái là ô (0,0) có ID=2, Dưới là ô (1,1) có ID=3.
                // => neighborIslands thu được = Set { 2, 3 }
                // currentTotalSize = 1 (chính nó) + islandSizes[2] + islandSizes[3] = 1 + 1 + 1 = 3
                // maxIsland = Max(1, 3) => maxIsland biến thành 3.

                // 🔄 Thử nghiệm 2 tại ô (1, 0) [Giá trị gốc = 0]:
                // Các hướng xung quanh: Trên là ô (0,0) có ID=2, Phải là ô (1,1) có ID=3.
                // => neighborIslands thu được = Set { 2, 3 }
                // currentTotalSize = 1 + 1 + 1 = 3
                // maxIsland = Max(3, 3) => maxIsland giữ nguyên là 3.

                // Cập nhật kết quả hòn đảo kỷ lục
                maxIsland = Math.max(maxIsland, currentTotalSize);
            }
        }
    }

    // Trả về kích thước hòn đảo lớn nhất sau khi tối ưu hóa kết nối (Kết quả: 3)
    return maxIsland;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Lật một ô 0 để kết nối hai đảo biệt lập kích thước 1",
            input: [
                [1, 0],
                [0, 1]
            ],
            expected: 3
        },
        {
            name: "Ví dụ 2: Lật ô 0 duy nhất để mở rộng đảo sẵn có thành full ma trận",
            input: [
                [1, 1],
                [1, 0]
            ],
            expected: 4
        },
        {
            name: "Ví dụ 3: Ma trận toàn số 1, không có ô 0 nào để lật",
            input: [
                [1, 1],
                [1, 1]
            ],
            expected: 4
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Making A Large Island ===`);

    testCases.forEach((test, index) => {
        // Bản sao ma trận để tránh làm hỏng test case tiếp theo do hàm biến đổi In-place
        const gridCopy = JSON.parse(JSON.stringify(test.input));
        let actual = largestIsland(gridCopy);
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
