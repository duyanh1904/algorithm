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

// ================= UNIT TESTS =================
describe("Thuật toán binarySearch", () => {
  
  test("1. Trả về đúng index khi tìm thấy (Happy Path)", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    expect(binarySearch(arr, 9)).toBe(4); // Nằm giữa mảng
    expect(binarySearch(arr, 7)).toBe(3);
  });

  test("2. Trả về đúng index khi giá trị nằm ở ĐẦU hoặc CUỐI mảng (Boundary values)", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    expect(binarySearch(arr, 1)).toBe(0);  // Nằm ở cực trái
    expect(binarySearch(arr, 15)).toBe(6); // Nằm ở cực phải
  });

  test("3. Trả về -1 khi giá trị KHÔNG tồn tại trong mảng", () => {
    const arr = [1, 3, 5, 7, 9, 11, 15];
    expect(binarySearch(arr, 8)).toBe(-1);  // Nằm lọt thỏm giữa 2 số
    expect(binarySearch(arr, 0)).toBe(-1);  // Nhỏ hơn số nhỏ nhất
    expect(binarySearch(arr, 20)).toBe(-1); // Lớn hơn số lớn nhất
  });

  test("4. Xử lý đúng với các mảng đặc biệt (Edge Cases)", () => {
    expect(binarySearch([], 5)).toBe(-1);          // Mảng rỗng
    expect(binarySearch([5], 5)).toBe(0);          // Mảng chỉ có 1 phần tử (tìm thấy)
    expect(binarySearch([5], 3)).toBe(-1);         // Mảng chỉ có 1 phần tử (không tìm thấy)
    expect(binarySearch([2, 2], 2)).toBe(1);       // Mảng có số trùng lặp (binary search cơ bản sẽ trả về 1 trong các index, ở đây là phần tử giữa)
  });

});
