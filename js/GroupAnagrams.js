/**
 * LeetCode Daily Challenge
 * ID: 49
 * Title: Group Anagrams
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/group-anagrams/
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
    // VỚI INPUT MẪU: strs = ["eat", "tea", "tan"]

    // Khởi tạo một đối tượng Map (bảng băm) để gom nhóm các từ
    // Cấu trúc map sẽ có dạng: { key_da_sap_xep: [mang_cac_tu_dao_chu] }
    const anagramMap = new Map();

    // Duyệt qua từng từ trong mảng đầu vào strs
    for (let i = 0; i < strs.length; i++) {
        const currentStr = strs[i];

        // Tạo 'key' bằng cách: Tách từ thành mảng -> Sắp xếp a-z -> Gộp lại thành chuỗi
        const sortedKey = currentStr.split('').sort().join('');

        // Nếu key này chưa tồn tại trong map, khởi tạo một mảng rỗng cho nó
        if (!anagramMap.has(sortedKey)) {
            anagramMap.set(sortedKey, []);
        }

        // Đẩy từ hiện tại vào nhóm của key tương ứng
        anagramMap.get(sortedKey).push(currentStr);

        // --- DIỄN GIẢI CHI TIẾT TRACE CODE QUA TỪNG VÒNG LẶP ---
        
        // 🔄 VÒNG LẶP LẦN 1 (i = 0, currentStr = "eat"):
        // sortedKey = "eat".split('').sort().join('') => "aet"
        // Vì "aet" chưa có trong map -> Tạo mới: anagramMap.set("aet", [])
        // Đẩy "eat" vào nhóm -> anagramMap = Map { "aet" => ["eat"] }

        // 🔄 VÒNG LẶP LẦN 2 (i = 1, currentStr = "tea"):
        // sortedKey = "tea".split('').sort().join('') => "aet"
        // Vì "aet" ĐÃ TỒN TẠI trong map, bỏ qua bước khởi tạo.
        // Đẩy "tea" vào nhóm -> anagramMap = Map { "aet" => ["eat", "tea"] }

        // 🔄 VÒNG LẶP LẦN 3 (i = 2, currentStr = "tan"):
        // sortedKey = "tan".split('').sort().join('') => "ant"
        // Vì "ant" chưa có trong map -> Tạo mới: anagramMap.set("ant", [])
        // Đẩy "tan" vào nhóm -> anagramMap = Map { "aet" => ["eat", "tea"], "ant" => ["tan"] }
    }

    // Chuyển đổi tất cả các mảng giá trị (values) trong Map thành một mảng 2 chiều duy nhất
    // Kết quả thu được: [ ["eat", "tea"], ["tan"] ]
    return Array.from(anagramMap.values());
};

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Ví dụ 1: Gom nhóm nhiều từ đảo chữ đan xen",
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            // Thứ tự các nhóm hoặc từ trong nhóm có thể bất kỳ, hệ thống sẽ so khớp nội dung
            expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
        },
        {
            name: "Ví dụ 2: Mảng chứa một chuỗi rỗng",
            input: [""],
            expected: [[""]]
        },
        {
            name: "Ví dụ 3: Mảng chứa một ký tự đơn lẻ",
            input: ["a"],
            expected: [["a"]]
        }
    ];

    let passedCount = 0;
    console.log(`=== RUNNING TESTS FOR: Group Anagrams ===`);

    testCases.forEach((test, index) => {
        let actual = groupAnagrams(test.input);

        // Chuẩn hóa sắp xếp lại kết quả của actual và expected để so sánh chuỗi JSON chính xác 
        // không bị lệch vị trí ranh giới giữa các nhóm
        const sortMatrix = (matrix) => 
            matrix.map(row => row.sort()).sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));

        const isPassed = JSON.stringify(sortMatrix(actual)) === JSON.stringify(sortMatrix(test.expected));

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
