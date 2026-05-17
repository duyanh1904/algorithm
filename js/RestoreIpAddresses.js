function restoreIpAddresses(s) {
    const result = [];
    
    // Nếu độ dài chuỗi không nằm trong khoảng [4, 12], không thể tạo được IP hợp lệ
    if (s.length < 4 || s.length > 12) {
        return result;
    }

    function backtrack(start, segments) {
        // Nếu đã tìm đủ 4 phần và dùng hết toàn bộ chuỗi s
        if (segments.length === 4) {
            if (start === s.length) {
                result.push(segments.join('.'));
            }
            return;
        }

        // Từ vị trí 'start', ta thử cắt độ dài từ 1 đến 3 ký tự
        for (let len = 1; len <= 3; len++) {
            // Tránh cắt vượt quá độ dài của chuỗi
            if (start + len > s.length) break;

            const segmentStr = s.substring(start, start + len);
            const segmentVal = parseInt(segmentStr, 10);

            // Kiểm tra điều kiện hợp lệ:
            // 1. Không có số 0 đứng đầu (ví dụ: "01", "00" là không hợp lệ)
            // 2. Giá trị phải nhỏ hơn hoặc bằng 255
            if ((segmentStr.length > 1 && segmentStr[0] === '0') || segmentVal > 255) {
                continue;
            }

            // Tiến hành lưu phần này vào mảng tạm và đệ quy tiếp
            segments.push(segmentStr);
            backtrack(start + len, segments);
            segments.pop(); // Quay lui (Backtrack)
        }
    }

    backtrack(0, []);
    return result;
}

// Hàm hỗ trợ so sánh 2 mảng (không quan trọng thứ tự phần tử)
function arraysEqualIgnoringOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((val, index) => val === sorted2[index]);
}

// Trình chạy test framework bằng JS thuần
function runTests() {
    const tests = [
        {
            name: "Ví dụ 1: Chuỗi chuẩn dài",
            input: "25525511135",
            expected: ["255.255.11.135", "255.255.111.35"]
        },
        {
            name: "Ví dụ 2: Toàn số 0",
            input: "0000",
            expected: ["0.0.0.0"]
        },
        {
            name: "Ví dụ 3: Nhiều cách phân tách",
            input: "101023",
            expected: ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]
        },
        {
            name: "Ranh giới: Chuỗi quá ngắn",
            input: "123",
            expected: []
        },
        {
            name: "Ranh giới: Chuỗi quá dài",
            input: "2552552552552",
            expected: []
        },
        {
            name: "Trường hợp số 0 dẫn đầu bị loại bỏ",
            input: "010010",
            // "0.10.0.10" và "0.100.1.0" là các kết quả đúng hợp lệ
            expected: ["0.10.0.10", "0.100.1.0"] 
        }
    ];

    let passedCount = 0;

    console.log("--- BẮT ĐẦU CHẠY UNIT TEST ---");
    
    tests.forEach((test, index) => {
        const actual = restoreIpAddresses(test.input);
        const isPassed = arraysEqualIgnoringOrder(actual, test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Input:    "${test.input}"`);
            console.error(`   - Expected:`, test.expected);
            console.error(`   - Actual:  `, actual);
        }
    });

    console.log("------------------------------");
    console.log(`Kết quả chung: Đạt ${passedCount}/${tests.length} bài test.`);
}

// Kích hoạt chạy test
runTests();
