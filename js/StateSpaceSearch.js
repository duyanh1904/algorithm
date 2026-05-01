/**
 * THUẬT TOÁN: BFS 3D (State-Space Search)
 * 0: Đường đi, 1: Tường
 * k: Số lượng tường tối đa có thể phá
 * Output: Trả về số bước ngắn nhất để thoát. Trả về -1 nếu vô phương cứu chữa.
 */
function shortestPathWithObstacles(grid, k) {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Ràng buộc (Edge case)
  if (rows === 0 || cols === 0) return -1;
  
  // TỐI ƯU HÓA ĐỈNH CAO: Nếu số búa phá tường (k) lớn hơn cả quãng đường Manhattan 
  // từ điểm đầu đến điểm cuối, ta có thể đi xuyên tường một mạch theo đường chim bay!
  if (k >= rows + cols - 2) {
    return rows + cols - 2;
  }
  
  // Khởi tạo hàng đợi BFS. Mỗi phần tử lưu: [row, col, steps_taken, remaining_k]
  const queue = [[0, 0, 0, k]];
  
  // Mảng Visited đặc biệt: Lưu số "k" LỚN NHẤT còn lại tại ô (r, c)
  // Khởi tạo tất cả bằng -1 (chưa từng đến)
  const visited = Array.from({ length: rows }, () => Array(cols).fill(-1));
  visited[0][0] = k;
  
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  while (queue.length > 0) {
    // Trong thực tế, dùng mảng làm Queue sẽ bị O(N) khi shift(). 
    // Nhưng để test chạy được gọn nhẹ, ta tạm dùng shift().
    const [r, c, steps, remainK] = queue.shift();
    
    // Nếu đến đích -> Vì là BFS, lần đầu tiên đến đích CHẮC CHẮN là đường ngắn nhất!
    if (r === rows - 1 && c === cols - 1) {
      return steps;
    }
    
    // Loang ra 4 hướng
    for (let [dr, dc] of directions) {
      const newR = r + dr;
      const newC = c + dc;
      
      // Kiểm tra xem có vượt quá giới hạn bản đồ không
      if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
        
        // Trạng thái số búa còn lại nếu bước vào ô tiếp theo
        const newRemainK = remainK - grid[newR][newC];
        
        // ĐIỀU KIỆN SỐNG CÒN CỦA THUẬT TOÁN:
        // 1. Số búa còn lại phải >= 0 (tức là ô đó là đường, hoặc là tường nhưng vẫn đủ búa đập)
        // 2. newRemainK phải LỚN HƠN số búa tốt nhất từng được ghi nhận tại ô này trước đó.
        // (Nếu số búa còn lại <= số búa ghi nhận trước đó, tức là ta đang đi vào vết xe đổ tồi tệ hơn, bỏ qua ngay!)
        if (newRemainK >= 0 && newRemainK > visited[newR][newC]) {
          visited[newR][newC] = newRemainK; // Cập nhật kỷ lục búa tại ô này
          queue.push([newR, newC, steps + 1, newRemainK]);
        }
      }
    }
  }
  
  return -1; // Duyệt cạn không gian mà không tới được đích
}

// ================= TEST CASES CỰC KỲ CHI TIẾT =================
function runTests() {
  const testCases = [
    {
      description: "Case 1: Không có búa (k=0), đi đường vòng an toàn",
      grid: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0]
      ],
      k: 0,
      expected: 4, 
      explanation: "Chỉ có thể đi vòng qua bức tường. [0,0]->[0,1]->[0,2]->[1,2]->[2,2]"
    },
    {
      description: "Case 2: Có 1 búa (k=1), đi thẳng xuyên tường",
      grid: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0]
      ],
      k: 1,
      expected: 4, // Thay vì đi vòng, ta đập tường. Tình cờ đập tường ở [1,0] xuống [2,0] rồi sang [2,2] cũng mất 4 bước.
      explanation: "Có búa nên có thể đập tường [1,0] đi xuống [2,0] -> [2,1] -> [2,2]. Số bước vẫn là 4."
    },
    {
      description: "Case 3: Xung đột Trạng Thái (Bẫy Visited thông thường)",
      grid: [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0]
      ],
      k: 1,
      expected: 6,
      explanation: "Nếu thuật toán ngốc nghếch đập bức tường đầu tiên ở [0,1], nó sẽ kẹt ở bức tường thứ hai [1,3]. BFS chuẩn sẽ tìm được đường vòng qua tường 1, để dành búa đập tường 2."
    },
    {
      description: "Case 4: Bị nhốt hoàn toàn, búa không đủ lực",
      grid: [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 0]
      ],
      k: 2,
      expected: -1,
      explanation: "Đích và Đầu đều bị bao vây bởi lớp tường dày đặc. Cần ít nhất 3 búa mới tới nơi, nhưng chỉ có 2 búa -> Chết trong mê cung (-1)."
    },
    {
      description: "Case 5: Mê cung ziczac, chọn đập tường để rút ngắn thời gian",
      grid: [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0]
      ],
      k: 1,
      expected: 10,
      explanation: "Mê cung bắt ta phải đi hình con rắn (rất dài). Nhưng vì có 1 búa, ta chỉ cần đi vòng 1 lần, lần còn lại ta đập tường [3,1] để nhảy xuống đích luôn. Rút ngắn vô số bước!"
    },
    {
      description: "Case 6: Búa vô cực (k rất lớn)",
      grid: [
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 0]
      ],
      k: 100,
      expected: 5,
      explanation: "Có tới 100 búa. Thuật toán kích hoạt 'TỐI ƯU HÓA ĐỈNH CAO' ngay từ đầu code, đi thẳng theo đường chim bay (Manhattan distance: r-1 + c-1 = 2 + 3 = 5)."
    },
    {
      description: "Case 7: Điểm xuất phát chính là điểm đích (Grid 1x1)",
      grid: [
        [0]
      ],
      k: 1,
      expected: 0,
      explanation: "Vừa đẻ ra đã ở đích. Mất 0 bước."
    }
  ];

  let allPassed = true;
  console.log("=== THỬ THÁCH MÊ CUNG KHÔNG GIAN ĐA CHIỀU (BFS 3D) ===\n");

  testCases.forEach(({ description, grid, k, expected, explanation }, index) => {
    const result = shortestPathWithObstacles(grid, k);

    if (result !== expected) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Búa có (k): ${k}`);
      console.error(`   Kỳ vọng: ${expected} | Thực tế trả về: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 Giải mã: ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Code của bạn đã chịu đựng được mọi trường hợp hiểm hóc nhất của LeetCode Hard.");
  } else {
    console.log("\n❌ Có bug. Hãy kiểm tra lại cách bạn lưu Trạng thái vào biến visited.");
  }
}

// Khởi chạy hệ thống
runTests();
