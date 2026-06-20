/**
 * LeetCode Daily Challenge
 * ID: 380
 * Title: Insert Delete GetRandom O(1)sss
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/insert-delete-getrandom-o1/
 */

class RandomizedSet {
    constructor() {
        this.list = [];     // Mảng dùng để lưu các giá trị thực tế nhằm phục vụ việc getRandom O(1)
        this.map = new Map(); // Hash Map lưu cặp: val -> index_trong_list phục vụ tìm kiếm O(1)
    }

    /** * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        // Nếu phần tử đã tồn tại trong tập hợp, trả về false
        if (this.map.has(val)) return false;

        // Lưu vị trí index sắp tới của val (chính là độ dài hiện tại của mảng list) vào map
        this.map.set(val, this.list.length);
        // Đẩy giá trị val vào cuối mảng list
        this.list.push(val);

        // --- TRACE CODE KHI GỌI TUẦN TỰ INSERT ---
        // 🔄 Lệnh 1: insert(10)
        //    this.list = [10]
        //    this.map  = Map { 10 => 0 } -> Kết quả: true
        // 🔄 Lệnh 2: insert(20)
        //    this.list = [10, 20]
        //    this.map  = Map { 10 => 0, 20 => 1 } -> Kết quả: true

        return true;
    }

    /** * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        // Nếu phần tử không tồn tại trong tập hợp, trả về false
        if (!this.map.has(val)) return false;

        // --- TRACE CODE KHI GỌI: remove(10) ứng với trạng thái list=[10, 20], map={10=>0, 20=>1} ---

        // 1. Lấy ra vị trí index của phần tử cần xóa trong mảng list
        const idxToRemove = this.map.get(val); // idxToRemove = 0
        
        // 2. Lấy ra giá trị của phần tử nằm ở cuối mảng list hiện tại
        const lastElement = this.list[this.list.length - 1]; // lastElement = 20

        // 3. Tiến hành ghi đè phần tử cuối mảng vào vị trí của phần tử cần xóa trong list
        this.list[idxToRemove] = lastElement; 
        // Sau dòng này: this.list biến thành [20, 20] (Phần tử 10 đã bị ghi đè mất)

        // 4. Cập nhật lại vị trí index mới của lastElement trong map thành idxToRemove
        this.map.set(lastElement, idxToRemove);
        // Sau dòng này: this.map biến thành Map { 10 => 0, 20 => 0 }

        // 5. Cắt bỏ phần tử thừa ở cuối mảng list đi (Thao tác pop() luôn tốn O(1))
        this.list.pop();
        // Sau dòng này: this.list biến thành [20]

        // 6. Xóa bỏ hoàn toàn phần tử val cần xóa ra khỏi map
        this.map.delete(val);
        // Sau dòng này: this.map biến thành Map { 20 => 0 }

        return true;
    }

    /**
     * @return {number}
     */
    getRandom() {
        // Sinh ngẫu nhiên một chỉ số index hợp lệ từ 0 đến list.length - 1
        const randomIndex = Math.floor(Math.random() * this.list.length);
        
        // Trả về phần tử tại vị trí index ngẫu nhiên đó với xác suất đồng đều O(1)
        return this.list[randomIndex];
    }
}

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    let passedCount = 0;
    const testCasesCount = 1;

    console.log(`=== RUNNING TESTS FOR: Insert Delete GetRandom O(1) ===`);

    try {
        const randomizedSet = new RandomizedSet();
        let results = [];

        results.push(randomizedSet.insert(1));   // Thêm 1 thành công -> true. Tập hợp: [1]
        results.push(randomizedSet.remove(2));   // Xóa 2 thất bại vì không có -> false
        results.push(randomizedSet.insert(2));   // Thêm 2 thành công -> true. Tập hợp: [1, 2]
        
        // getRandom() có thể trả về 1 hoặc 2 một cách ngẫu nhiên
        const rand1 = randomizedSet.getRandom();
        results.push(rand1 === 1 || rand1 === 2); 

        results.push(randomizedSet.remove(1));   // Xóa 1 thành công -> true. Tập hợp còn: [2]
        results.push(randomizedSet.insert(2));   // Thêm 2 thất bại vì đã trùng -> false
        
        // Hiện tại tập hợp chỉ còn duy nhất số 2, getRandom chắc chắn phải ra 2
        const rand2 = randomizedSet.getRandom();
        results.push(rand2 === 2);

        // So sánh chuỗi kết quả thực tế thu được với kỳ vọng của đề bài
        const expected = [true, false, true, true, true, false, true];
        const isPassed = JSON.stringify(results) === JSON.stringify(expected);

        if (isPassed) {
            console.log(`✅ Test #1 PASSED: Chuỗi thao tác mô phỏng chạy chính xác hằng số O(1)`);
            passedCount++;
        } else {
            console.error(`❌ Test #1 FAILED: Kết quả không khớp kỳ vọng.`);
            console.error(`   - Expected:`, expected);
            console.error(`   - Actual:  `, results);
        }
    } catch (error) {
        console.error(`❌ Test phát sinh lỗi nghiêm trọng khi thực thi:`, error);
    }

    console.log("-----------------------------------------");
    if (passedCount !== testCasesCount) {
        console.error(`Kết quả: Thất bại ${testCasesCount - passedCount}/${testCasesCount} bài test.`);
        process.exit(1);
    } else {
        console.log(`Kết quả: Tuyệt vời! Vượt qua tất cả ${passedCount}/${testCasesCount} bài test.`);
    }
};

runTests();
