/**
 * LeetCode Daily Challenge
 * ID: 86
 * Title: Partition List
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/partition-list/
 */

// Định nghĩa cấu trúc Node của Danh sách liên kết đơn (Singly-linked list) chuẩn LeetCode
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = (head, x) => {
    // VỚI INPUT MẪU: head = [1 -> 4 -> 2], x = 3

    // 1. Khởi tạo 2 Node giả (Dummy Nodes) làm điểm neo đầu cho 2 chuỗi phụ
    const lessHead = new ListNode(0);    // Neo đầu cho chuỗi chứa các Node < x
    const greaterHead = new ListNode(0); // Neo đầu cho chuỗi chứa các Node >= x

    // 2. Hai con trỏ chạy (pointers) đại diện cho đuôi hiện tại của 2 chuỗi phụ
    let less = lessHead;       // Ban đầu đứng ở Node giả 0
    let greater = greaterHead; // Ban đầu đứng ở Node giả 0

    // Con trỏ dùng để duyệt qua danh sách liên kết gốc
    let current = head;

    // 3. Vòng lặp duyệt qua từng Node cho đến hết danh sách
    while (current !== null) {
        if (current.val < x) {
            // Nếu giá trị nhỏ hơn x, móc Node này vào đuôi chuỗi less
            less.next = current;
            less = less.next; // Dịch chuyển con trỏ đuôi tiến lên một nấc
        } else {
            // Nếu giá trị lớn hơn hoặc bằng x, móc Node này vào đuôi chuỗi greater
            greater.next = current;
            greater = greater.next; // Dịch chuyển con trỏ đuôi tiến lên một nấc
        }

        // --- DIỄN GIẢI CHI TIẾT ĐƯỜNG ĐI TRACE CODE QUA TỪNG VÒNG LẶP ---
        
        // 🔄 VÒNG LẶP LẦN 1: current đang ở Node(1)
        //    Vì 1 < 3 (Thỏa mãn nhóm nhỏ hơn)
        //    less.next = Node(1) -> Chuỗi less lúc này: [0 -> 1]
        //    less dịch sang Node(1).
        //    current dịch sang Node(4).

        // 🔄 VÒNG LẶP LẦN 2: current đang ở Node(4)
        //    Vì 4 >= 3 (Thỏa mãn nhóm lớn hơn hoặc bằng)
        //    greater.next = Node(4) -> Chuỗi greater lúc này: [0 -> 4]
        //    greater dịch sang Node(4).
        //    current dịch sang Node(2).

        // 🔄 VÒNG LẶP LẦN 3: current đang ở Node(2)
        //    Vì 2 < 3 (Thỏa mãn nhóm nhỏ hơn)
        //    less.next = Node(2) -> Chuỗi less lúc này: [0 -> 1 -> 2]
        //    less dịch sang Node(2).
        //    current dịch về null (Kết thúc vòng lặp).

        current = current.next; // Dịch chuyển sang Node tiếp theo của chuỗi gốc
    }

    // 4. KẾT NỐI HAI CHUỖI VÀ CHUẨN HÓA BIÊN DƯỚI
    
    // Cắt đứt liên kết cũ ở đuôi chuỗi greater để tránh lỗi tạo vòng lặp vô hạn (Cycle)
    // Tại thời điểm này, Node(2) ở chuỗi less thực chất vẫn đang có next trỏ sang Node(4) ở chuỗi greater
    greater.next = null; 

    // Đấu đuôi chuỗi 'less' vào đầu thực tế của chuỗi 'greater' (bỏ qua Node giả greaterHead)
    // less.next = greaterHead.next => Node(2).next = Node(4)
    // Toàn bộ chuỗi lúc này liên kết liền mạch: [0(less) -> 1 -> 2 -> 4 -> null]
    less.next = greaterHead.next;

    // Trả về đầu thực tế của chuỗi kết quả (bỏ qua Node giả lessHead ban đầu)
    // Kết quả thu được cấu trúc hoàn chỉnh: [1 -> 2 -> 4]
    return lessHead.next;
};

// ==================================================================
// HÀM HỖ TRỢ CHUYỂN ĐỔI MẢNG THÀNH LINKED LIST VÀ NGƯỢC LẠI ĐỂ CHẠY TEST
// ==================================================================
const createLinkedList = (arr) => {
    const dummy = new ListNode(0);
    let current = dummy;
    for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
};

const linkedListToArray = (head) => {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Gom các số nhỏ hơn 3 lên trước, giữ nguyên thứ tự gốc",
            input: { head: [1, 4, 3, 2, 5, 2], x: 3 },
            expected: [1, 2, 2, 4, 3, 5]
        },
        {
            name: "Ví dụ 2: Mảng ngắn, số nhỏ hơn đứng sau cùng",
            input: { head: [2, 1], x: 2 },
            expected: [1, 2]
        },
        {
            name: "Trường hợp biên: Danh sách rỗng",
            input: { head: [], x: 0 },
            expected: []
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Partition List ===`);

    testCases.forEach((test, index) => {
        const headNode = createLinkedList(test.input.head);
        const resultNode = partition(headNode, test.input.x);
        const actual = linkedListToArray(resultNode);

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
