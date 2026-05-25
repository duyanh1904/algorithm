/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead. LeetCode 75
 */
const sortColors = (nums) => {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    // Duyệt cho đến khi con trỏ hiện tại vượt quá ranh giới nhóm số 2
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Đưa số 0 về vùng đầu mảng (vị trí low)
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // Số 1 nằm đúng vùng giữa, chỉ việc đi tiếp
            mid++;
        } else if (nums[mid] === 2) {
            // Đưa số 2 về vùng cuối mảng (vị trí high)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Lưu ý: Không tăng mid ở đây vì số vừa được đổi từ vị trí 'high' về 
            // chưa được kiểm tra xem nó là 0, 1 hay 2.
        }
    }
};

// Hàm so sánh 2 mảng số nguyên thuần túy
const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
};

// Trình chạy test framework bằng JS thuần
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Xáo trộn đầy đủ các màu",
            input: [2, 0, 2, 1, 1, 0],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "Ví dụ 2: Thiếu màu trắng (số 1)",
            input: [2, 0, 1],
            expected: [0, 1, 2]
        },
        {
            name: "Mảng đã được sắp xếp sẵn",
            input: [0, 0, 1, 2, 2],
            expected: [0, 0, 1, 2, 2]
        },
        {
            name: "Mảng chỉ chứa 1 màu duy nhất",
            input: [1, 1, 1],
            expected: [1, 1, 1]
        },
        {
            name: "Mảng ngược hoàn toàn",
            input: [2, 2, 1, 1, 0, 0],
            expected: [0, 0, 1, 1, 2, 2]
        }
    ];

    let passedCount = 0;

    console.log("=== BẮT ĐẦU CHẠY UNIT TEST (SORT COLORS) ===");

    testCases.forEach((test, index) => {
        // Sao chép mảng đầu vào để tránh việc làm thay đổi mảng mẫu của test case
        const nums = [...test.input]; 
        
        // Thực hiện hàm sắp xếp tại chỗ
        sortColors(nums);
        
        const isPassed = arraysAreEqual(nums, test.expected);

        if (isPassed) {
            console.log(`✅ Test #${index + 1} THÀNH CÔNG: ${test.name}`);
            passedCount++;
        } else {
            console.error(`❌ Test #${index + 1} THẤT BẠI: ${test.name}`);
            console.error(`   - Đầu vào gốc:`, test.input);
            console.error(`   - Thực tế nhận:`, nums);
            console.error(`   - Mong đợi:    `, test.expected);
        }
    });

    console.log("=========================================");
    console.log(`Kết quả: Vượt qua ${passedCount}/${testCases.length} bài kiểm tra.`);
};

// Kích hoạt chạy test
runTests();
