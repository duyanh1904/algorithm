/**
 * LeetCode Daily Challenge (Inspired by Azure Subnet Resource Packing)
 * ID: 4123
 * Title: Can Assign Subnets to Regions (Bin Packing)
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/ (Biến thể Bin Packing)
 *
 * Context: Trong Azure, mỗi Region có dung lượng tài nguyên giới hạn (CPU/RAM).
 * Các Subnet cần được cấp phát vào đúng 1 Region nhất định.
 * Kiểm tra xem có thể xếp tất cả subnetRequirements vào các regionCapacities
 * mà không vượt quá dung lượng của từng Region hay không. edit
 */

/**
 * @param {number[]} regionCapacities - Mảng dung lượng tối đa của từng Azure Region.
 * @param {number[]} subnetRequirements - Mảng nhu cầu tài nguyên của từng Subnet cần cấp phát.
 * @return {boolean}
 */
const canAssignSubnets = (regionCapacities, subnetRequirements) => {
    // Tính tổng dung lượng và tổng nhu cầu
    const totalCapacity = regionCapacities.reduce((a, b) => a + b, 0);
    const totalRequirement = subnetRequirements.reduce((a, b) => a + b, 0);

    // Nếu không đủ tổng tài nguyên hoặc không có region nào -> thất bại
    if (totalRequirement > totalCapacity || regionCapacities.length === 0) {
        return false;
    }

    // Không có subnet nào cần cấp phát -> luôn thành công
    if (subnetRequirements.length === 0) {
        return true;
    }

    // Sắp xếp nhu cầu giảm dần (ưu tiên gói lớn trước để tối ưu Backtracking)
    subnetRequirements.sort((a, b) => b - a);

    // Lọc bỏ các Region có dung lượng = 0 vì không dùng được
    const availableRegions = regionCapacities.filter(cap => cap > 0);

    // Nếu có subnet nào yêu cầu lớn hơn region lớn nhất -> không thể xếp
    if (subnetRequirements[0] > Math.max(...availableRegions)) {
        return false;
    }

    // Mảng lưu tài nguyên đã dùng của từng Region
    const used = new Array(availableRegions.length).fill(0);

    const backtrack = (subnetIdx) => {
        // Đã xếp hết tất cả subnet -> thành công
        if (subnetIdx === subnetRequirements.length) {
            return true;
        }

        const currentReq = subnetRequirements[subnetIdx];

        // Duyệt các Region để thử xếp subnet hiện tại vào
        for (let i = 0; i < availableRegions.length; i++) {
            // Kiểm tra nếu Region này đủ chỗ trống
            if (used[i] + currentReq <= availableRegions[i]) {
                // Xếp thử
                used[i] += currentReq;

                // Đệ quy xếp các subnet tiếp theo
                if (backtrack(subnetIdx + 1)) {
                    return true;
                }

                // Quay lui (undo)
                used[i] -= currentReq;
            }

            // Tối ưu quan trọng:
            // Nếu Region i chưa được sử dụng mà không xếp được subnet hiện tại,
            // thì các Region trống khác cũng sẽ thất bại -> thoát luôn
            if (used[i] === 0) {
                break;
            }
        }

        return false;
    };

    return backtrack(0);
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "3 Region, 3 Subnet (mỗi region nhận 1 subnet vừa đủ)",
            input: {
                regionCapacities: [5, 5, 5],
                subnetRequirements: [4, 4, 4]
            },
            expected: true // Mỗi region 5, mỗi subnet 4 -> vừa đủ
        },
        {
            name: "3 Region nhưng tổng cầu > tổng cung",
            input: {
                regionCapacities: [5, 5, 5],
                subnetRequirements: [4, 4, 4, 3]
            },
            expected: false // Tổng cầu = 15, tổng cung = 15 (vừa đủ về mặt số học)
            // Nhưng thực tế 5=4+? (cần 1), 5=4+? (cần 1), 5=4+? (cần 1),
            // không có region nào còn 3 chỗ trống vì 5-4=1 -> false
        },
        {
            name: "3 Region, 6 Subnet ghép cặp hoàn hảo (3+3)",
            input: {
                regionCapacities: [6, 6, 6],
                subnetRequirements: [3, 3, 3, 3, 3, 3]
            },
            expected: true // Mỗi region chứa 2 subnet 3+3=6
        },
        {
            name: "2 Region, 4 Subnet xếp chéo hợp lệ",
            input: {
                regionCapacities: [10, 10],
                subnetRequirements: [6, 4, 6, 4]
            },
            expected: true // Region1: 6+4, Region2: 6+4
        },
        {
            name: "Không đủ region (mảng region rỗng)",
            input: {
                regionCapacities: [],
                subnetRequirements: [1, 2, 3]
            },
            expected: false
        },
        {
            name: "Không có subnet nào cần cấp phát",
            input: {
                regionCapacities: [10, 20],
                subnetRequirements: []
            },
            expected: true // Không có gì để xếp nên luôn đúng
        },
        {
            name: "Một subnet quá lớn không region nào chứa nổi",
            input: {
                regionCapacities: [5, 8],
                subnetRequirements: [10, 3]
            },
            expected: false // 10 > max(5,8) = 8 -> thất bại
        },
        {
            name: "Có Region dung lượng 0 bị loại bỏ, nhưng vẫn xếp được",
            input: {
                regionCapacities: [0, 7, 8],
                subnetRequirements: [4, 4, 3, 4] // Tổng = 15, Region có 7+8=15
            },
            expected: true // Region 7 = 4+3, Region 8 = 4+4
        },
        {
            name: "Trường hợp đánh đố: 3 region [8,8,8], 4 subnet [6,6,6,6]",
            input: {
                regionCapacities: [8, 8, 8],
                subnetRequirements: [6, 6, 6, 6]
            },
            expected: false // Mỗi region chỉ đủ cho 1 subnet 6, còn dư 2, không đủ cho subnet thứ 4
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Azure Subnet Resource Packing (Bin Packing) ===`);

    testCases.forEach((test, index) => {
        // Lấy tham số từ input object
        const { regionCapacities, subnetRequirements } = test.input;
        const actual = canAssignSubnets(regionCapacities, subnetRequirements);

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