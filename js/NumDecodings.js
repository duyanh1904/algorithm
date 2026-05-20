/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = (s) => {
    // Nếu chuỗi rỗng hoặc bắt đầu bằng ký tự '0', không có cách giải mã nào hợp lệ
    if (!s || s[0] === '0') return 0;

    const n = s.length;
    // Khởi tạo mảng dp có độ dài (n + 1) để lưu số cách giải mã đến từng vị trí
    // dp[i] sẽ lưu số cách giải mã của chuỗi con từ ký tự đầu tiên đến ký tự thứ i
    const dp = new Array(n + 1).fill(0);

    // Trường hợp cơ sở: 
    // dp[0] = 1 tượng trưng cho một chuỗi rỗng (luôn có 1 cách "không làm gì cả")
    // dp[1] = 1 vì chúng ta đã kiểm tra s[0] khác '0' ở trên (chuỗi 1 ký tự luôn có 1 cách)
    dp[0] = 1;
    dp[1] = 1;

    // Vòng lặp tính toán từ ký tự thứ 2 (vị trí index 1 trong chuỗi) đến hết chuỗi
    for (let i = 2; i <= n; i++) {
        // Lấy ra ký tự đơn lẻ hiện tại (đứng ở vị trí i - 1 của chuỗi s)
        const oneDigit = parseInt(s.substring(i - 1, i), 10);
        // Lấy ra cặp 2 ký tự kết thúc tại vị trí hiện tại (đứng ở vị trí i - 2 đến i)
        const twoDigits = parseInt(s.substring(i - 2, i), 10);

        // Kiểm tra xem ký tự đơn lẻ có hợp lệ không (từ 1 đến 9)
        // Nếu hợp lệ, số cách giải mã tại dp[i] sẽ được cộng thêm số cách giải mã trước đó là dp[i - 1]
        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }

        // Kiểm tra xem cặp 2 ký tự có hợp lệ không (từ 10 đến 26)
        // Nếu hợp lệ, số cách giải mã tại dp[i] được cộng thêm số cách giải mã của 2 bước trước là dp[i - 2]
        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    // Kết quả cuối cùng nằm ở phần tử cuối cùng của mảng dp
    return dp[n];
};

// Hàm chạy toàn bộ các kịch bản kiểm thử (Test Cases)
const runTests = () => {
    // Định nghĩa danh sách các bài test đa dạng trường hợp
    const testCases = [
        { name: "Ví dụ 1: Chuỗi cơ bản 2 chữ số", input: "12", expected: 2 }, // (1 2) -> AB, (12) -> L
        { name: "Ví dụ 2: Chuỗi 3 chữ số", input: "226", expected: 3 }, // (2 2 6), (22 6), (2 26)
        { name: "Ví dụ 3: Bắt đầu bằng số 0 (Không hợp lệ)", input: "06", expected: 0 },
        { name: "Chứa số 0 hợp lệ ở giữa", input: "10", expected: 1 }, // Chỉ có thể dịch thành (10) -> J
        { name: "Chứa số 0 đứng độc lập bị lỗi", input: "230", expected: 0 }, // Số 30 không dịch được, số 0 đứng riêng cũng chịu
        { name: "Chuỗi dài có nhiều cách phối hợp", input: "11106", expected: 2 }, // (1, 1, 10, 6) hoặc (11, 10, 6)
        { name: "Ranh giới trên của bảng chữ cái", input: "2626", expected: 4 } // (2,6,2,6), (26,2,6), (2,6,26), (26,26)
    ];

    let passedCount = 0;

    console.log("=== BẮT ĐẦU CHẠY UNIT TEST (DECODE WAYS) ===");

    // Duyệt qua từng bài test
    testCases.forEach((test, index) => {
        const actual = numDecodings(test.input);
        const isPassed = actual === test.expected;

        if (isPassed) {
            console.log(`✅ Test #${index + 1} THÀNH CÔNG: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} THẤT BẠI: ${test.name}`);
            console.error(`   - Input   : "${test.input}"`);
            console.error(`   - Expected: ${test.expected}`);
            console.error(`   - Actual  : ${actual}`);
        }
    });

    console.log("=========================================");
    console.log(`Kết quả: Vượt qua ${passedCount}/${testCases.length} bài kiểm tra.`);
};

// Thực thi bộ kiểm thử
runTests();
