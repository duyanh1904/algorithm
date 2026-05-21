/**
 * LeetCode 134
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
    let totalTank = 0;   // Tổng lượng xăng tích lũy toàn bộ hành trình
    let currentTank = 0; // Lượng xăng tích lũy tính từ trạm bắt đầu hiện tại
    let startingStation = 0;

    for (let i = 0; i < gas.length; i++) {
        const netGas = gas[i] - cost[i];
        totalTank += netGas;
        currentTank += netGas;

        // Nếu xăng bị âm tại trạm này, không thể đi tiếp từ startingStation hiện tại
        if (currentTank < 0) {
            // Đổi trạm bắt đầu sang trạm tiếp theo
            startingStation = i + 1;
            // Reset lại bình xăng tạm thời về 0
            currentTank = 0;
        }
    }

    // Nếu kết thúc vòng lặp mà tổng lượng xăng nhỏ hơn tổng chi phí -> Thất bại
    return totalTank >= 0 ? startingStation : -1;
}

// Export module để dùng cho Unit Test nếu chạy trong môi trường Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { canCompleteCircuit };
}

// --- SCRIPT RUNNER TỰ CHẾ (CHẠY THUẦN BẰNG NODEJS) ---
function runTests() {
    const cases = [
        { gas: [1,2,3,4,5], cost: [3,4,5,1,2], expected: 3, name: "LeetCode Example 1" },
        { gas: [2,3,4],     cost: [3,4,3],     expected: -1, name: "LeetCode Example 2" },
        { gas: [5],         cost: [4],         expected: 0,  name: "Single station Success" },
        { gas: [2],         cost: [3],         expected: -1, name: "Single station Fail" },
        { gas: [1,1,1,1,10],cost: [2,2,2,2,6], expected: 4,  name: "Solution at the end" }
    ];

    let passed = 0;
    console.log("=== RUNNING UNIT TESTS ===");
    cases.forEach((c, idx) => {
        const result = canCompleteCircuit(c.gas, c.cost);
        if (result === c.expected) {
            console.log(`✅ [PASS] Case ${idx + 1}: ${c.name}`);
            passed++;
        } else {
            console.log(`❌ [FAIL] Case ${idx + 1}: ${c.name} | Expected: ${c.expected}, Got: ${result}`);
        }
    });
    console.log(`\n👉 Result: ${passed}/${cases.length} tests passed.`);
}

// Kích hoạt chạy thử nếu chạy file trực tiếp bằng Node
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
