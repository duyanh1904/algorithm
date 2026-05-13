/**
 * Bài toán: House Robber (LeetCode 198 - Medium)
 * Pattern: Dynamic Programming (Space Optimized)
 * Độ phức tạp: Thời gian O(N), Không gian O(1)
 */
function rob(nums) {
    // Edge cases: Nếu không có nhà nào hoặc chỉ có 1 nhà
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // Khởi tạo 2 biến nhớ cho 2 bước trước đó
    let prev2 = 0; // Trạng thái ở i-2
    let prev1 = 0; // Trạng thái ở i-1

    for (let i = 0; i < nums.length; i++) {
        const currentHouseMoney = nums[i];

        // Lựa chọn: (Cướp nhà hiện tại + tiền của nhà i-2) HOẶC (Bỏ qua, giữ tiền của nhà i-1)
        const currentMax = Math.max(currentHouseMoney + prev2, prev1);

        // --- Cập nhật lại 2 biến nhớ để "trượt" lên phía trước cho vòng lặp sau ---
        // Biến nhà i-1 bây giờ lùi về thành nhà i-2
        prev2 = prev1; 
        
        // Trạng thái max hiện tại trở thành nhà i-1 cho bước kế tiếp
        prev1 = currentMax; 
    }

    // Sau khi duyệt hết phố, prev1 chính là tổng tiền lớn nhất cầm được trên tay
    return prev1;
}

// ================= HỆ THỐNG UNIT TEST =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: HOUSE ROBBER (DP)\n");

    const testCases = [
        {
            description: "1. Ví dụ 1 LeetCode",
            nums: [1, 2, 3, 1],
            expected: 4,
            reason: "Cướp nhà 1 (1$) và nhà 3 (3$)."
        },
        {
            description: "2. Ví dụ 2 LeetCode",
            nums: [2, 7, 9, 3, 1],
            expected: 12,
            reason: "Cướp nhà 1 (2$), 3 (9$), và 5 (1$)."
        },
        {
            description: "3. Bẫy cướp 2 nhà sát nhau nhưng cách xa nhau mới là tối ưu",
            nums: [2, 1, 1, 2],
            expected: 4,
            reason: "Phải cướp nhà đầu (2) và nhà cuối (2), bỏ qua 2 nhà ở giữa."
        },
        {
            description: "4. Edge Case: Dãy chỉ có 1 nhà",
            nums: [5],
            expected: 5,
            reason: "Chỉ có 1 lựa chọn là cướp nó."
        },
        {
            description: "5. Edge Case: Dãy có 2 nhà",
            nums: [3, 1],
            expected: 3,
            reason: "Chọn nhà có tiền to hơn để cướp."
        },
        {
            description: "6. Dãy số giảm dần",
            nums: [100, 50, 20, 10],
            expected: 120,
            reason: "Cướp nhà 100 và nhà 20."
        },
        {
            description: "7. Tất cả các nhà đều 0$",
            nums: [0, 0, 0, 0],
            expected: 0,
            reason: "Kiểm tra lỗi logic với số 0 falsy."
        },
        {
            description: "8. Giá trị biến động mạnh",
            nums: [1, 3, 1, 3, 100],
            expected: 103,
            reason: "Bỏ qua các mồi nhử nhỏ để nhắm vào mục tiêu to (3 + 100)."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = rob(tc.nums);
        
        if (actual === tc.expected) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.error(`   👉 Input: [${tc.nums}]`);
            console.error(`   🎯 Expected: ${tc.expected}`);
            console.error(`   🚨 Actual:   ${actual}`);
        }
        console.log(`   💡 Giải thích: ${tc.reason}\n`);
    });

    console.log("==================================================");
    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Thuật toán DP O(1) Memory hoạt động hoàn hảo.`);
    } else {
        console.log(`⚠️ Có lỗi trong logic DP. Cần kiểm tra lại công thức chuyển trạng thái.`);
    }
}

// Khởi chạy hệ thống test
runTests();
