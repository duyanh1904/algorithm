/**
 * LeetCode Daily Challenge
 * ID: 295
 * Title: Find Median from Data Stream
 * Difficulty: Hard
 * URL: https://leetcode.com/problems/find-median-from-data-stream/
 */

// Cấu trúc dữ liệu MinHeap tự triển khai bằng mảng để phục vụ thuật toán tối ưu
class MinHeap {
    constructor() {
        this.heap = [];
    }
    size() { return this.heap.length; }
    peek() { return this.heap[0]; }
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    pop() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return min;
    }
    bubbleUp(i) {
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.heap[p] <= this.heap[i]) break;
            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }
    }
    bubbleDown(i) {
        let len = this.heap.length;
        while (2 * i + 1 < len) {
            let left = 2 * i + 1, right = 2 * i + 2, minIdx = left;
            if (right < len && this.heap[right] < this.heap[left]) minIdx = right;
            if (this.heap[i] <= this.heap[minIdx]) break;
            [this.heap[i], this.heap[minIdx]] = [this.heap[minIdx], this.heap[i]];
            i = minIdx;
        }
    }
}

class MedianFinder {
    constructor() {
        // Chứa nửa dưới của chuỗi số (Gốc là MaxHeap, ta lưu -val vào MinHeap để đảo ngược tính chất)
        this.maxHeapLeft = new MinHeap(); 
        // Chứa nửa trên của chuỗi số (Sử dụng MinHeap chuẩn)
        this.minHeapRight = new MinHeap();
    }

    /** * @param {number} num
     * @return {void}
     */
    addNum(num) {
        // Bước 1: Luôn đẩy số vào nửa dưới (maxHeapLeft) trước.
        // Vì lưu dạng số âm nên số lớn nhất thực tế sẽ có trị tuyệt đối nhỏ nhất, nằm ở đỉnh heap.
        this.maxHeapLeft.push(-num);

        // Bước 2: Cân đối thứ tự: Đẩy phần tử lớn nhất của nửa dưới sang nửa trên (minHeapRight)
        this.minHeapRight.push(-this.maxHeapLeft.pop());

        // Bước 3: Cân đối kích thước: Đảm bảo maxHeapLeft luôn có số phần tử lớn hơn hoặc bằng minHeapRight
        if (this.maxHeapLeft.size() < this.minHeapRight.size()) {
            this.maxHeapLeft.push(-this.minHeapRight.pop());
        }

        // --- TRACE CODE KHI GỌI CHUỖI THAO TÁC THÊM SỐ ---
        //
        // 🔄 Lệnh 1: addNum(1)
        //   - Đẩy vào Left: maxHeapLeft.push(-1) -> heap: [-1]
        //   - Chuyển sang Right: minHeapRight.push(1) -> maxHeapLeft rỗng.
        //   - Cân bằng lượng: Left.size < Right.size (0 < 1) -> Đẩy ngược lại Left: maxHeapLeft.push(-1)
        //    Trạng thái: Left = [-1] (đại diện số 1), Right = []
        //
        // 🔄 Lệnh 2: addNum(2)
        //   - Đẩy vào Left: maxHeapLeft.push(-2) -> heap: [-2, -1] -> đỉnh là -2
        //   - Chuyển sang Right: minHeapRight.push(-(-2)) = push(2) -> maxHeapLeft còn [-1]
        //   - Cân bằng lượng: Left.size (1) >= Right.size (1) -> Không đổi.
        //    Trạng thái: Left = [-1] (số 1), Right = [2] (số 2)
        //
        // 🔄 Lệnh 3: addNum(3) (Sau khi đã gọi findMedian lần 1)
        //   - Đẩy vào Left: maxHeapLeft.push(-3) -> heap đỉnh là -3. Left: [-3, -1]
        //   - Chuyển sang Right: minHeapRight.push(-(-3)) = push(3) -> Right biến thành [2, 3], Left còn [-1]
        //   - Cân bằng lượng: Left.size < Right.size (1 < 2) -> Lấy đỉnh Right (2) trả về Left dạng số âm (-2)
        //    Trạng thái: Left = [-2, -1] (chứa số 2 và 1, đỉnh là 2), Right = [3] (chứa số 3)
    }

    /**
     * @return {number}
     */
    findMedian() {
        // Nếu tổng số phần tử lệch lẻ, phần tử trung vị nằm chính xác tại đỉnh nửa dưới (maxHeapLeft)
        if (this.maxHeapLeft.size() > this.minHeapRight.size()) {
            // Đảo dấu một lần nữa để lấy lại giá trị dương ban đầu
            return -this.maxHeapLeft.peek();
        }
        
        // Nếu tổng số phần tử chẵn, trung vị là trung bình cộng của 2 đỉnh heap
        // Lần gọi 1 (sau addNum(2)): Left đỉnh là -1 (số 1), Right đỉnh là 2 (số 2)
        // Kết quả tính toán: (-(-1) + 2) / 2 = (1 + 2) / 2 = 1.5
        
        // Lần gọi 2 (sau addNum(3)): Left kích thước là 2, Right kích thước là 1 (Lệch lẻ)
        // Rơi vào điều kiện if phía trên -> Kết quả: -(-2) = 2.0
        return (-this.maxHeapLeft.peek() + this.minHeapRight.peek()) / 2;
    }
}

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    let passedCount = 0;
    const testCasesCount = 1;

    console.log(`=== RUNNING TESTS FOR: Find Median from Data Stream ===`);

    try {
        const medianFinder = new MedianFinder();
        let results = [];

        medianFinder.addNum(1);    // Dòng dữ liệu hiện tại: [1]
        medianFinder.addNum(2);    // Dòng dữ liệu hiện tại: [1, 2]
        results.push(medianFinder.findMedian()); // Kì vọng: 1.5

        medianFinder.addNum(3);    // Dòng dữ liệu hiện tại: [1, 2, 3]
        results.push(medianFinder.findMedian()); // Kì vọng: 2.0

        const expected = [1.5, 2.0];
        const isPassed = JSON.stringify(results) === JSON.stringify(expected);

        if (isPassed) {
            console.log(`✅ Test #1 PASSED: Thiết kế cấu trúc luồng dữ liệu đạt chuẩn O(log N)`);
            passedCount++;
        } else {
            console.error(`❌ Test #1 FAILED: Kết quả trung vị không trùng khớp.`);
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
