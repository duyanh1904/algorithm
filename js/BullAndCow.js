/**
 * LeetCode Daily Challenge
 * ID: 299
 * Title: Bulls and Cows
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/bulls-and-cows/
 */

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
const getHint = (secret, guess) => {
    // VỚI INPUT MẪU: secret = "1123", guess = "0111"

    let bulls = 0;
    let cows = 0;

    // Mảng 10 phần tử lưu tần suất xuất hiện lệch nhau của chữ số từ 0 -> 9.
    // Trị số dương đại diện cho chữ số dư ra ở 'secret', trị số âm đại diện cho 'guess'.
    const count = new Array(10).fill(0);

    // Duyệt qua từng ký tự của hai chuỗi (độ dài bằng nhau)
    for (let i = 0; i < secret.length; i++) {
        const sChar = parseInt(secret[i]); // Chữ số tại vị trí i của secret
        const gChar = parseInt(guess[i]);  // Chữ số tại vị trí i của guess

        if (sChar === gChar) {
            bulls++;
        } else {
            // Nếu chữ số sChar từng xuất hiện dư ra trong chuỗi guess trước đó (tức là count[sChar] < 0)
            if (count[sChar] < 0) {
                cows++;
            }
            // Nếu chữ số gChar từng xuất hiện dư ra trong chuỗi secret trước đó (tức là count[gChar] > 0)
            if (count[gChar] > 0) {
                cows++;
            }

            // Ghi nhận tần suất: secret cần thêm (tăng), guess cần bớt (giảm)
            count[sChar]++;
            count[gChar]--;
        }

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE QUA TỪNG VÒNG LẶP ---
        
        // 🔄 VÒNG LẶP LẦN 1 (i = 0): sChar = 1, gChar = 0 (Khác nhau)
        //    count[1] = 0 (không < 0) -> Bỏ qua
        //    count[0] = 0 (không > 0) -> Bỏ qua
        //    Cập nhật mảng đếm: count[1]++ (thành 1), count[0]-- (thành -1)
        //    Trạng thái: bulls=0, cows=0, count = [0: -1, 1: 1, ...]

        // 🔄 VÒNG LẶP LẦN 2 (i = 1): sChar = 1, gChar = 1 (Giống nhau)
        //    sChar === gChar => Tìm thấy Bull! 
        //    Trạng thái: bulls=1, cows=0, mảng count giữ nguyên.

        // 🔄 VÒNG LẶP LẦN 3 (i = 2): sChar = 2, gChar = 1 (Khác nhau)
        //    count[2] = 0 (không < 0) -> Bỏ qua
        //    count[1] = 1 (ĐANG LỚN HƠN 0! Nghĩa là chữ số 1 từng dư ra ở secret trước đó) -> Khớp Cows! cows++ thành 1.
        //    Cập nhật mảng đếm: count[2]++ (thành 1), count[1]-- (từ 1 về 0)
        //    Trạng thái: bulls=1, cows=1, count = [0: -1, 1: 0, 2: 1, ...]

        // 🔄 VÒNG LẶP LẦN 4 (i = 3): sChar = 3, gChar = 1 (Khác nhau)
        //    count[3] = 0 (không < 0) -> Bỏ qua
        //    count[1] = 0 (không > 0) -> Bỏ qua (Do chữ số 1 của secret đã bị dùng hết ở vòng trước)
        //    Cập nhật mảng đếm: count[3]++ (thành 1), count[1]-- (thành -1)
        //    Trạng thái cuối cùng: bulls=1, cows=1
    }

    // Trả về chuỗi định dạng theo yêu cầu đề bài "xAyB"
    return `${bulls}A${cows}B`;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: 1 chữ số đúng vị trí, 3 chữ số sai vị trí",
            input: { secret: "1807", guess: "7810" },
            expected: "1A3B"
        },
        {
            name: "Ví dụ 2: Trùng lặp chữ số, chỉ tính lượng khớp tối đa làm Cows",
            input: { secret: "1123", guess: "0111" },
            expected: "1A1B"
        },
        {
            name: "Trường hợp biên: Hai chuỗi giống nhau hoàn toàn",
            input: { secret: "1234", guess: "1234" },
            expected: "4A0B"
        },
        {
            name: "Trường hợp biên: Không có chữ số nào trùng khớp",
            input: { secret: "1234", guess: "5678" },
            expected: "0A0B"
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Bulls and Cows ===`);

    testCases.forEach((test, index) => {
        let actual = getHint(test.input.secret, test.input.guess);
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
