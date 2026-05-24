/**
 * Định nghĩa một nút trong cây nhị phân. Leetcode 129
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = (root) => {
    
    // Hàm đệ quy DFS để duyệt cây
    const dfs = (node, currentSum) => {
        // Trường hợp cây rỗng hoặc đi vào nhánh cụt
        if (!node) return 0;

        // Tính số mới khi đi xuống nút hiện tại
        currentSum = currentSum * 10 + node.val;

        // ĐIỀU KIỆN DỪNG: Nếu gặp nút lá (không có con trái và con phải)
        // Trả về ngay giá trị số vừa tạo được
        if (!node.left && !node.right) {
            return currentSum;
        }

        // Nếu chưa phải là lá, tiếp tục đi xuống nhánh trái và nhánh phải,
        // sau đó cộng kết quả của 2 nhánh lại với nhau
        return dfs(node.left, currentSum) + dfs(node.right, currentSum);
    };

    // Bắt đầu duyệt từ gốc cây với số ban đầu là 0
    return dfs(root, 0);
};

// Hàm phụ trợ: Chuyển mảng thành cây nhị phân để làm dữ liệu đầu vào cho test
function buildTree(array) {
    if (!array.length) return null;
    let root = new TreeNode(array[0]);
    let queue = [root];
    let i = 1;
    while (queue.length && i < array.length) {
        let curr = queue.shift();
        if (array[i] !== null && array[i] !== undefined) {
            curr.left = new TreeNode(array[i]);
            queue.push(curr.left);
        }
        i++;
        if (i < array.length && array[i] !== null && array[i] !== undefined) {
            curr.right = new TreeNode(array[i]);
            queue.push(curr.right);
        }
        i++;
    }
    return root;
}

// Trình chạy test framework bằng JS thuần
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Cây đơn giản 3 nút",
            input: [1, 2, 3], // 12 + 13
            expected: 25
        },
        {
            name: "Ví dụ 2: Cây nhiều tầng",
            input: [4, 9, 0, 5, 1], // 495 + 491 + 40
            expected: 1026
        },
        {
            name: "Cây chỉ có 1 nút duy nhất",
            input: [7],
            expected: 7
        },
        {
            name: "Cây bị lệch hoàn toàn về một bên",
            input: [1, 2, null, 3, null, 4], // Đường duy nhất: 1 -> 2 -> 3 -> 4
            expected: 1234
        }
    ];

    let passedCount = 0;

    console.log("=== BẮT ĐẦU CHẠY UNIT TEST (SUM LEAF NUMBERS) ===");

    testCases.forEach((test, index) => {
        // Dựng cây từ mảng đầu vào
        const treeRoot = buildTree(test.input);
        // Chạy hàm giải bài toán
        const actual = sumNumbers(treeRoot);
        const isPassed = actual === test.expected;

        if (isPassed) {
            console.log(`✅ Test #${index + 1} THÀNH CÔNG: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} THẤT BẠI: ${test.name}`);
            console.error(`   - Mảng đầu vào:`, test.input);
            console.error(`   - Mong đợi (Expected): ${test.expected}`);
            console.error(`   - Thực tế (Actual)  : ${actual}`);
        }
    });

    console.log("=========================================");
    console.log(`Kết quả: Vượt qua ${passedCount}/${testCases.length} bài kiểm tra.`);
};

// Kích hoạt chạy test
runTests();
