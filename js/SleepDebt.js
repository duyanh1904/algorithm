/**
 * Tính số giờ cần ngủ tối nay để bù nợ ngủ
 * @param {number[]} hours - Mảng số giờ đã ngủ mỗi đêm
 * @param {number} target - Số giờ cần ngủ mỗi đêm lý tưởng
 * @returns {number} - Số giờ cần ngủ tối nay (hoặc 0 nếu không nợ)
 */
function sleepDebt(hours, target) {
    // Tổng số giờ đã ngủ
    const totalActual = hours.reduce((sum, h) => sum + h, 0);
    
    // Tổng số giờ cần ngủ (các đêm trước + đêm nay)
    const totalNeed = target * (hours.length + 1);
    
    // Số giờ thiếu hụt (chính là số giờ cần ngủ tối nay)
    const deficit = totalNeed - totalActual;
    
    // Nếu không thiếu hoặc dư thì trả về 0
    return deficit > 0 ? deficit : 0;
}

// Hàm assert đơn giản để kiểm tra
function assertEquals(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
    } else {
        console.error(`❌ FAIL: ${testName}`);
        console.error(`   Expected: ${expected}`);
        console.error(`   Actual: ${actual}`);
    }
}

// Chạy tất cả các test
function runTests() {
    console.log("=== Running Sleep Debt Tests ===\n");
    
    // Test 1
    assertEquals(
        sleepDebt([6, 6, 6, 6, 6, 6], 8),
        20,
        "Test 1: 6 nights of 6h sleep, target 8h"
    );
    
    // Test 2
    assertEquals(
        sleepDebt([6, 7, 8, 4, 8, 6], 7),
        10,
        "Test 2: Mixed sleep hours, target 7h"
    );
    
    // Test 3
    assertEquals(
        sleepDebt([10, 10, 9, 10, 9, 11], 9),
        4,
        "Test 3: Almost enough sleep, target 9h"
    );
    
    // Test 4
    assertEquals(
        sleepDebt([8, 7, 6, 7, 6, 8], 6),
        0,
        "Test 4: Already met target exactly"
    );
    
    // Test 5
    assertEquals(
        sleepDebt([8, 9, 10, 9, 10, 7], 7),
        0,
        "Test 5: Overslept, no debt"
    );
    
    // Test thêm: trường hợp mảng rỗng
    assertEquals(
        sleepDebt([], 8),
        8,
        "Extra test: Empty array, need to sleep 8h tonight"
    );
    
    // Test thêm: thiếu nhiều
    assertEquals(
        sleepDebt([4, 4, 4], 8),
        20,
        "Extra test: 3 nights of 4h, target 8h → need 4*3 + 8 = 20"
    );
    
    console.log("\n=== All tests completed ===");
}

// Chạy test
runTests();
