/**
 * Bài toán: Text Justification (LeetCode 68 - Hard)
 * Độ phức tạp: Thời gian O(N) với N là tổng số ký tự của tất cả các từ, Không gian O(maxWidth) cho mỗi dòng.
 */
function fullJustify(words, maxWidth) {
    const result = [];
    let currentLine = [];   // Lưu các từ của dòng hiện tại
    let numOfLetters = 0;   // Tổng độ dài các từ trong dòng (không tính khoảng trắng)

    for (let word of words) {
        // Kiểm tra xem thêm từ mới vào có bị tràn dòng không
        // Công thức: Chiều dài các từ + Số khoảng trắng tối thiểu (currentLine.length) + Chiều dài từ mới
        if (numOfLetters + currentLine.length + word.length > maxWidth) {
            
            // TÍNH TOÁN KHOẢNG TRẮNG CẦN THÊM
            const spacesNeeded = maxWidth - numOfLetters;
            const gaps = currentLine.length - 1; // Số khe hở giữa các từ
            
            // Xử lý bẫy 1: Dòng chỉ có đúng 1 từ
            if (gaps === 0) {
                result.push(currentLine[0] + ' '.repeat(spacesNeeded));
            } else {
                // Phân bổ khoảng trắng cho dòng nhiều từ
                const spacePerGap = Math.floor(spacesNeeded / gaps);
                let extraSpaces = spacesNeeded % gaps;
                
                let lineStr = '';
                for (let i = 0; i < currentLine.length; i++) {
                    lineStr += currentLine[i];
                    
                    // Thêm khoảng trắng vào sau từ (trừ từ cuối cùng)
                    if (i < gaps) {
                        // Nếu còn extraSpaces, khe hở này được nhận thêm 1 khoảng trắng
                        const spacesToApply = spacePerGap + (extraSpaces > 0 ? 1 : 0);
                        lineStr += ' '.repeat(spacesToApply);
                        extraSpaces--;
                    }
                }
                result.push(lineStr);
            }
            
            // Reset dòng tạm để chuẩn bị chứa từ mới làm tràn dòng ban nãy
            currentLine = [word];
            numOfLetters = word.length;
        } else {
            // Thêm từ vào dòng an toàn
            currentLine.push(word);
            numOfLetters += word.length;
        }
    }

    // XỬ LÝ BẪY 2: DÒNG CUỐI CÙNG (Left-justified)
    // Các từ cách nhau 1 dấu cách, dư bao nhiêu dồn hết về đuôi
    const lastLineStr = currentLine.join(' ');
    const trailingSpaces = maxWidth - lastLineStr.length;
    result.push(lastLineStr + ' '.repeat(trailingSpaces));

    return result;
}
// ================= HỆ THỐNG UNIT TEST CHUYÊN SÂU =================

function runTests() {
    console.log("🧪 BẮT ĐẦU CHẠY UNIT TEST: TEXT JUSTIFICATION\n");

    const isMatch = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    const testCases = [
        {
            description: "1. Happy Path - Dữ liệu cơ bản",
            words: ["This", "is", "an", "example", "of", "text", "justification."], maxWidth: 16,
            expected: [
                "This    is    an",
                "example  of text",
                "justification.  "
            ],
            reason: "Ví dụ 1 chuẩn của LeetCode."
        },
        {
            description: "2. Dòng chứa 1 từ duy nhất",
            words: ["What","must","be","acknowledgment","shall","be"], maxWidth: 16,
            expected: [
                "What   must   be",
                "acknowledgment  ",
                "shall be        "
            ],
            reason: "Ví dụ 2: Kiểm tra xử lý từ siêu dài chiếm trọn dòng và dòng cuối cùng."
        },
        {
            description: "3. Từ dài bằng đúng maxWidth",
            words: ["Supercalifragilistic"], maxWidth: 20,
            expected: [
                "Supercalifragilistic"
            ],
            reason: "Đảm bảo code không bị chia cho 0 khi gap = 0 và không thêm dấu cách dư thừa."
        },
        {
            description: "4. Mảng 1 phần tử nhỏ",
            words: ["Hi"], maxWidth: 5,
            expected: [
                "Hi   "
            ],
            reason: "Test nhỏ nhất có thể, kiểm tra logic dòng cuối cùng hoạt động độc lập."
        }
    ];

    let passedCount = 0;

    testCases.forEach((tc, index) => {
        const actual = fullJustify(tc.words, tc.maxWidth);
        
        if (isMatch(actual, tc.expected)) {
            console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
            passedCount++;
        } else {
            console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
            console.log(`   💡 Mục đích: ${tc.reason}`);
            
            // Vẽ thước đo để dễ đối chiếu
            let ruler = "   📏 Thước đo: |";
            for(let i=1; i<=tc.maxWidth; i++) ruler += (i%10===0) ? (i/10) : ".";
            console.log(ruler + "|");
            
            console.log("   🎯 Expected:");
            tc.expected.forEach(line => console.log(`      [${line}] (len: ${line.length})`));
            console.log("   🚨 Actual:");
            actual.forEach(line => console.log(`      [${line}] (len: ${line.length})`));
        }
        console.log("--------------------------------------------------");
    });

    if (passedCount === testCases.length) {
        console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Căn lề hoàn hảo.`);
    } else {
        console.log(`⚠️ Có lỗi trong khâu xử lý khoảng trắng. Hãy kiểm tra lại thước đo.`);
    }
}

// Khởi chạy
runTests();
