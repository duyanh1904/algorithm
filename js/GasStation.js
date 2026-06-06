/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
const canCompleteCircuit = (gas, cost) => {
    // VỚI INPUT: gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]

    let totalSurplus = 0;   // Tổng lượng xăng chênh lệch của cả hành trình (Tổng gas - Tổng cost)
    let currentTank = 0;    // Lượng xăng tích lũy hiện tại trong bình khi đi qua từng trạm
    let startIndex = 0;     // Chỉ số trạm xuất phát được chọn giả định ban đầu

    // Chạy vòng lặp duyệt qua tất cả các trạm (i chạy từ 0 đến 4)
    for (let i = 0; i < gas.length; i++) {
        // Tính lượng xăng chênh lệch tại trạm hiện tại: lấy xăng nạp được trừ đi chi phí đi đến trạm tiếp theo
        const netGas = gas[i] - cost[i];

        totalSurplus += netGas; // Cộng dồn vào tổng chênh lệch của cả hệ thống
        currentTank += netGas;  // Cộng dồn vào bình xăng hiện tại để kiểm tra khả năng đi tiếp

        // --- DIỄN GIẢI CHI TIẾT TỪNG VÒNG LẶP VỚI INPUT TRÊN ---

        // 🔄 VÒNG LẶP LẦN 1 (i = 0):
        // netGas = gas[0] - cost[0] = 1 - 3 = -2
        // totalSurplus = 0 + (-2) = -2
        // currentTank = 0 + (-2) = -2
        // 🚨 Vì currentTank < 0 (-2 < 0): Chết máy! 
        // => Đổi startIndex = i + 1 = 0 + 1 = 1. Reset currentTank = 0.

        // 🔄 VÒNG LẶP LẦN 2 (i = 1):
        // netGas = gas[1] - cost[1] = 2 - 4 = -2
        // totalSurplus = -2 + (-2) = -4
        // currentTank = 0 + (-2) = -2
        // 🚨 Vì currentTank < 0 (-2 < 0): Lại chết máy!
        // => Đổi startIndex = i + 1 = 1 + 1 = 2. Reset currentTank = 0.

        // 🔄 VÒNG LẶP LẦN 3 (i = 2):
        // netGas = gas[2] - cost[2] = 3 - 5 = -2
        // totalSurplus = -4 + (-2) = -6
        // currentTank = 0 + (-2) = -2
        // 🚨 Vì currentTank < 0 (-2 < 0): Tiếp tục chết máy!
        // => Đổi startIndex = i + 1 = 2 + 1 = 3. Reset currentTank = 0.

        // 🔄 VÒNG LẶP LẦN 4 (i = 3):
        // netGas = gas[3] - cost[3] = 4 - 1 = 3
        // totalSurplus = -6 + 3 = -3
        // currentTank = 0 + 3 = 3
        // ✅ Vì currentTank >= 0 (3 >= 0): Xe đi tiếp an toàn. startIndex vẫn giữ nguyên là 3.

        // 🔄 VÒNG LẶP LẦN 5 (i = 4):
        // netGas = gas[4] - cost[4] = 5 - 2 = 3
        // totalSurplus = -3 + 3 = 0
        // currentTank = 3 + 3 = 6
        // ✅ Vì currentTank >= 0 (6 >= 0): Xe đi tiếp an toàn. Vòng lặp kết thúc.

        if (currentTank < 0) {
            startIndex = i + 1; // Chọn trạm tiếp theo làm điểm xuất phát mới
            currentTank = 0;    // Reset lại bình xăng về 0 để bắt đầu hành trình mới
        }
    }

    // Sau khi đi hết vòng lặp, ta kiểm tra biến tổng totalSurplus.
    // Nếu totalSurplus >= 0 (Trong ví dụ này là 0 >= 0), chứng tỏ tổng lượng xăng ĐỦ để đi hết 1 vòng.
    // Do tính chất duy nhất của đề bài, startIndex tìm được chắc chắn là đáp án đúng.
    // Nếu totalSurplus < 0, nghĩa là tổng xăng < tổng chi phí, không thể đi hết vòng -> Trả về -1.
    return totalSurplus >= 0 ? startIndex : -1;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Điểm xuất phát tối ưu là trạm index 3",
            input: {
                gas: [1, 2, 3, 4, 5],
                cost: [3, 4, 5, 1, 2]
            },
            expected: 3
        },
        {
            name: "Ví dụ 2: Tổng chi phí lớn hơn tổng xăng, không thể hoàn thành",
            input: {
                gas: [2, 3, 4],
                cost: [3, 4, 3]
            },
            expected: -1
        },
        {
            name: "Trường hợp biên chỉ có 1 trạm xăng và đủ xăng đi tiếp",
            input: {
                gas: [5],
                cost: [4]
            },
            expected: 0
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Gas Station ===`);

    testCases.forEach((test, index) => {
        let actual = canCompleteCircuit(test.input.gas, test.input.cost);
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
