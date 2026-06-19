/**
 * LeetCode Daily Challenge
 * ID: 385
 * Title: Mini Parser
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/mini-parser/
 */

// Lớp giả lập cấu trúc NestedInteger theo đặc tả interface của LeetCode
class NestedInteger {
    constructor(val = null) {
        this.val = val;
        this.list = val === null ? [] : null;
    }
    isInteger() { return this.val !== null; }
    getInteger() { return this.val; }
    setInteger(value) { this.val = value; this.list = null; }
    add(ni) { if (this.list) this.list.push(ni); }
    getList() { return this.list; }
}

/**
 * @param {string} s
 * @return {NestedInteger}
 */
const deserialize = (s) => {
    // VỚI INPUT MẪU: s = "[123,[456]]"

    // Trường hợp biên: Nếu ký tự đầu tiên không phải '[', chứng tỏ đây là một số đơn lẻ
    if (s[0] !== '[') {
        return new NestedInteger(parseInt(s));
    }

    const stack = [];
    let numberBuffer = ""; // Biến tạm tích lũy các chữ số và dấu âm thành chuỗi số hoàn chỉnh

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '[') {
            // 1. Gặp ngoặc mở -> Khởi tạo một danh sách mới, đẩy vào stack làm danh sách hiện hành
            stack.push(new NestedInteger());
        } 
        else if (char === ',' || char === ']') {
            // 2. Gặp dấu phẩy hoặc ngoặc đóng -> Chốt số nguyên (nếu buffer đang có số)
            if (numberBuffer !== "") {
                const ni = new NestedInteger(parseInt(numberBuffer));
                // Thêm số nguyên vừa chốt vào danh sách đang nằm ở đỉnh stack
                stack[stack.length - 1].add(ni);
                numberBuffer = ""; // Xóa sạch bộ đệm
            }

            // Nếu là dấu ngoặc đóng ']', chứng tỏ danh sách ở đỉnh stack đã gom đủ phần tử
            if (char === ']') {
                const completedList = stack.pop(); // Lấy danh sách hoàn chỉnh ra

                if (stack.length > 0) {
                    // Nếu stack vẫn còn, chứng tỏ completedList là con của danh sách cha ở đỉnh stack hiện tại
                    stack[stack.length - 1].add(completedList);
                } else {
                    // Nếu stack trống rỗng, completedList chính là danh sách gốc ngoài cùng (Root)
                    return completedList;
                }
            }
        } 
        else {
            // 3. Tích lũy các chữ số hoặc dấu âm '-' vào bộ đệm
            numberBuffer += char;
        }

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE QUA TỪNG KÝ TỰ CỦA CHUỖI "[123,[456]]" ---
        //
        // 🔄 i = 0, char = '[': stack.push(List_Gốc) -> stack = [ List_Gốc ]
        // 🔄 i = 1..3, char = '1','2','3': numberBuffer biến thành "123"
        // 🔄 i = 4, char = ',': 
        //      - Đệm "123" có dữ liệu -> Tạo Node(123) -> Thêm vào List_Gốc. List_Gốc hiện tại: [123]
        //      - numberBuffer reset về "".
        // 🔄 i = 5, char = '[': stack.push(List_Con) -> stack = [ List_Gốc, List_Con ]
        // 🔄 i = 6..8, char = '4','5','6': numberBuffer biến thành "456"
        // 🔄 i = 9, char = ']':
        //      - Đệm "456" có dữ liệu -> Tạo Node(456) -> Thêm vào đỉnh stack (List_Con). List_Con lúc này: [456]
        //      - Gặp ']' -> Lấy List_Con ra khỏi stack (stack.pop()). stack còn lại [ List_Gốc ].
        //      - Vì stack vẫn còn phần tử -> Thêm List_Con vào List_Gốc. List_Gốc lúc này: [123, [456]]
        // 🔄 i = 10, char = ']':
        //      - numberBuffer rỗng, bỏ qua.
        //      - Gặp ']' -> Lấy List_Gốc ra khỏi stack (stack.pop()). stack lúc này trống rỗng.
        //      - Trả về List_Gốc hoàn chỉnh: [123, [456]]
    }

    return null;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
// Hàm hỗ trợ đệ quy chuyển đổi đối tượng NestedInteger về cấu trúc mảng/số thông thường để so sánh JSON
const printNI = (ni) => {
    if (ni.isInteger()) return ni.getInteger();
    return ni.getList().map(item => printNI(item));
};

const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Chuỗi chỉ chứa một số nguyên đơn lẻ duy nhất",
            input: "324",
            expected: 324
        },
        {
            name: "Ví dụ 2: Chuỗi chứa các danh sách lồng nhau nhiều cấp",
            input: "[123,[456,[789]]]",
            expected: [123, [456, [789]]]
        },
        {
            name: "Trường hợp biên: Danh sách rỗng hoàn toàn",
            input: "[]",
            expected: []
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Mini Parser ===`);

    testCases.forEach((test, index) => {
        const parsedNI = deserialize(test.input);
        const actual = printNI(parsedNI);
        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} PASSED: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} FAILED: ${test.name}`);
            console.error(`   - Expected:`, JSON.stringify(test.expected));
            console.error(`   - Actual:  `, JSON.stringify(actual));
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
