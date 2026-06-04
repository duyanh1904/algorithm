/**
 * An n-bit gray code sequence. Leet code 89
 * @param {number} n
 * @return {number[]}
 */
const grayCode = (n) => {
    // VỚI INPUT n = 2:
    
    // 1. Tính tổng số phần tử của chuỗi bằng phép dịch bit: 1 << n tương đương 2^n
    // Nếu n = 2, thì 1 << 2 sẽ bằng 4.
    const totalElements = 1 << n; 
    
    // 2. Khởi tạo mảng rỗng để chứa kết quả đầu ra
    const result = [];

    // 3. Chạy vòng lặp từ i = 0 đến i < 4 (tức là i sẽ nhận các giá trị: 0, 1, 2, 3)
    for (let i = 0; i < totalElements; i++) {
        
        // Công thức cốt lõi: i ^ (i >> 1)
        const grayValue = i ^ (i >> 1);
        
        // --- DIỄN GIẢI CHI TIẾT TỪNG VÒNG LẶP VỚI INPUT n = 2 ---
        
        // 🔄 VÒNG LẶP LẦN 1 (i = 0):
        // i >> 1  => 0 >> 1  = 0  (Nhị phân: 00 >> 1 = 00)
        // i ^ 0   => 0 ^ 0   = 0  (Nhị phân: 00 ^ 00 = 00)
        // => grayValue = 0. Mảng result hiện tại = [0]

        // 🔄 VÒNG LẶP LẦN 2 (i = 1):
        // i >> 1  => 1 >> 1  = 0  (Nhị phân: 01 >> 1 = 00)
        // i ^ 0   => 1 ^ 0   = 1  (Nhị phân: 01 ^ 00 = 01)
        // => grayValue = 1. Mảng result hiện tại = [0, 1]

        // 🔄 VÒNG LẶP LẦN 3 (i = 2):
        // i >> 1  => 2 >> 1  = 1  (Nhị phân: 10 >> 1 = 01)
        // i ^ 1   => 2 ^ 1   = 3  (Nhị phân: 10 ^ 01 = 11)
        // => grayValue = 3. Mảng result hiện tại = [0, 1, 3]

        // 🔄 VÒNG LẶP LẦN 4 (i = 3):
        // i >> 1  => 3 >> 1  = 1  (Nhị phân: 11 >> 1 = 01)
        // i ^ 1   => 3 ^ 1   = 2  (Nhị phân: 11 ^ 01 = 10)
        // => grayValue = 2. Mảng result hiện tại = [0, 1, 3, 2]

        // Đẩy giá trị mã Gray vừa tính được vào mảng kết quả
        result.push(grayValue);
    }

    // 4. Trả về mảng kết quả cuối cùng: [0, 1, 3, 2]
    return result;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Mã Gray với n = 2",
            input: 2,
            expected: [0, 1, 3, 2]
        },
        {
            name: "Ví dụ 2: Mã Gray với n = 1",
            input: 1,
            expected: [0, 1]
        },
        {
            name: "Mã Gray với n = 3",
            input: 3,
            expected: [0, 1, 3, 2, 6, 7, 5, 4] 
            // Giải thích hệ nhị phân n=3: [000, 001, 011, 010, 110, 111, 101, 100] -> Mỗi số cạnh nhau chỉ lệch 1 bit
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Gray Code ===`);

    testCases.forEach((test, index) => {
        const actual = grayCode(test.input);
        
        // So sánh 2 mảng bằng JSON.stringify
        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

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
