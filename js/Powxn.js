/**
 * Bài toán: Pow(x, n) (LeetCode 50 - Medium)
 * Pattern: Binary Exponentiation (Lũy thừa nhị phân)
 * Độ phức tạp: Thời gian O(log n), Không gian O(1)
 */
function myPow(x, n) {
    // Trường hợp cơ sở
    if (n === 0) return 1;
    if (x === 0) return 0;

    // Lấy trị tuyệt đối của số mũ để tính toán cho dễ
    let absN = Math.abs(n);
    let result = 1;
    let base = x;

    while (absN > 0) {
        // Nếu số mũ là số lẻ, ta nhân 'kết quả' với 'cơ số' hiện tại
        if (absN % 2 === 1) {
            result *= base;
        }
        
        // Nâng cấp cơ số lên bình phương (x -> x^2 -> x^4 -> x^8)
        base *= base;
        
        // Chia đôi số mũ (bỏ phần thập phân nếu có)
        absN = Math.floor(absN / 2);
    }

    // Nếu số mũ ban đầu là số âm, kết quả thực sự là 1 / result
    return n < 0 ? 1 / result : result;
}

// ================= HỆ THỐNG UNIT TEST =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: FAST EXPONENTIATION (POW)\n");

    // Hàm so sánh cho số thực (để tránh lỗi sai số dấu phẩy động trong JS)
    const isCloseEnough = (a, b) => Math.abs(a - b) < 1e-5;

    const testCases = [
        {
            description: "1. Happy Path - Ví dụ 1 (Số mũ dương)",
            x: 2.00000, n: 10,
            expected: 1024.00000,
            reason: "Trường hợp chuẩn để tính số mũ chẵn."
        },
        {
            description: "2. Happy Path - Ví dụ 2 (Số mũ lẻ, thập phân)",
            x: 2.10000, n: 3,
            expected: 9.26100,
            reason: "Tính số mũ lẻ cho số thực."
        },
        {
            description: "3. Số mũ âm - Ví dụ 3",
            x: 2.00000, n: -2,
            expected: 0.25000,
            reason: "Kiểm tra cơ chế đảo ngược 1 / result."
        },
        {
            description: "4. Edge Case: Số mũ bằng 0",
            x: 100.5, n: 0,
            expected: 1.00000,
            reason: "Bất kỳ số nào mũ 0 cũng bằng 1."
        },
        {
            description: "5. Edge Case: Cơ số bằng 1",
            x: 1.00000, n: 2147483647,
            expected: 1.00000,
            reason: "1 mũ bao nhiêu cũng bằng 1. Tránh tính toán dư thừa."
        },
        {
            description: "6. Edge Case: Cơ số âm, số mũ lẻ",
            x: -2.00000, n: 3,
            expected: -8.00000,
            reason: "Số âm mũ lẻ phải giữ nguyên dấu âm."
        },
        {
            description: "7. STRESS TEST - Cực hạn 32-bit Negative",
            x: 2.00000, n: -2147483648,
            expected: 0.00000, // Do số quá nhỏ nên tiệm cận 0
            reason: "Kiểm tra giới hạn số âm lớn nhất của 32-bit integer (-2^31). Nếu dùng bitwise sẽ bị tràn số."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = myPow(tc.x, tc.n);
        
        if (isCloseEnough(actual, tc.expected)) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.error(`   👉 Input: x=${tc.x}, n=${tc.n}`);
            console.error(`   🎯 Expected: ${tc.expected}`);
            console.error(`   🚨 Actual:   ${actual}`);
        }
        console.log(`   💡 Mục đích test: ${tc.reason}\n`);
    });

    console.log("==================================================");
    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Thuật toán O(log n) chịu tải hoàn hảo.`);
    } else {
        console.log(`⚠️ Có lỗi trong khâu xử lý. Hãy xem lại các test case bị hỏng.`);
    }
}

// Khởi chạy
runTests();
