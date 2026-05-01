// 1. Import module test và assert tích hợp sẵn của Node 20+
import { describe, test } from 'node:test';
import assert from 'node:assert';

// 2. Hàm cần test
function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) left = mid + 1; 
    else right = mid - 1; 
  }
  return -1;
}

// 3. Viết Unit Test bằng Node.js 20 Test Runner
describe("Thuật toán binarySearch", () => {
  
  test("1. Trả về đúng index khi tìm thấy (Happy Path)", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    // Dùng assert.strictEqual thay cho expect(...).toBe(...)
    assert.strictEqual(binarySearch(arr, 9), 4); // Nằm giữa mảng
    assert.strictEqual(binarySearch(arr, 7), 3);
  });

  test("2. Trả về đúng index khi giá trị nằm ở ĐẦU hoặc CUỐI mảng (Boundary values)", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    assert.strictEqual(binarySearch(arr, 1), 0);  // Nằm ở cực trái
    assert.strictEqual(binarySearch(arr, 15), 6); // Nằm ở cực phải
  });

  test("3. Trả về -1 khi giá trị KHÔNG tồn tại trong mảng", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    assert.strictEqual(binarySearch(arr, 8), -1);  // Nằm lọt thỏm giữa 2 số
    assert.strictEqual(binarySearch(arr, 0), -1);  // Nhỏ hơn số nhỏ nhất
    assert.strictEqual(binarySearch(arr, 20), -1); // Lớn hơn số lớn nhất
  });

  test("4. Xử lý đúng với các mảng đặc biệt (Edge Cases)", () => {
    assert.strictEqual(binarySearch([], 5), -1);          // Mảng rỗng
    assert.strictEqual(binarySearch([5], 5), 0);          // Mảng chỉ có 1 phần tử (tìm thấy)
    assert.strictEqual(binarySearch([5], 3), -1);         // Mảng chỉ có 1 phần tử (không tìm thấy)
    assert.strictEqual(binarySearch([2, 2], 2), 1);       // Mảng có số trùng lặp
  });

});
