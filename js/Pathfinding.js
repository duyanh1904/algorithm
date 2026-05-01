/**
 * BƯỚC 1: TỰ XÂY DỰNG HÀNG ĐỢI ƯU TIÊN (MIN-HEAP)
 * Vì JS không có sẵn Priority Queue, ta phải tự viết để A* chạy mượt mà (O(log N)).
 */
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  
  enqueue(node, priority) {
    this.values.push({ node, priority });
    this.sort();
  }
  
  dequeue() {
    return this.values.shift();
  }
  
  isEmpty() {
    return this.values.length === 0;
  }
  
  sort() {
    // Để cho code bớt dài trong khuôn khổ bài viết, ta dùng sort mảng. 
    // Trong thực tế siêu tối ưu, bạn sẽ viết hàm Bubble Up/Sink Down của Min-Heap.
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

/**
 * BƯỚC 2: THUẬT TOÁN A* TÌM ĐƯỜNG TRÊN LƯỚI CÓ TRỌNG SỐ (WEIGHTED GRID)
 * Quy tắc lưới (Grid):
 * -1 : Vật cản (Tường/Đá) - Không thể đi qua.
 * > 0 : Chi phí để bước vào ô đó (Ví dụ: 1 là đường nhựa, 5 là đầm lầy, 10 là núi).
 * Trả về: Tổng chi phí nhỏ nhất để đi từ start đến end. Nếu không có đường, trả về null.
 */
function aStarSearch(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Ràng buộc input (Edge cases)
  if (start[0] < 0 || start[0] >= rows || start[1] < 0 || start[1] >= cols) return null;
  if (end[0] < 0 || end[0] >= rows || end[1] < 0 || end[1] >= cols) return null;
  if (grid[start[0]][start[1]] === -1 || grid[end[0]][end[1]] === -1) return null;
  
  // Hàm Heuristic: Khoảng cách Manhattan (Tổng số bước đi ngang + dọc)
  const heuristic = (r, c) => Math.abs(r - end[0]) + Math.abs(c - end[1]);
  
  const pq = new PriorityQueue();
  pq.enqueue(start, 0); // [row, col]
  
  // Lưu trữ chi phí rẻ nhất (g(n)) để đến được một ô
  const gScores = new Map();
  const startKey = `${start[0]},${start[1]}`;
  gScores.set(startKey, 0);
  
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Lên, Xuống, Trái, Phải
  
  while (!pq.isEmpty()) {
    const { node } = pq.dequeue();
    const [r, c] = node;
    const currentKey = `${r},${c}`;
    
    // Đã đến đích -> Trả về chi phí g(n) hiện tại
    if (r === end[0] && c === end[1]) {
      return gScores.get(currentKey);
    }
    
    // Duyệt qua 4 hướng
    for (let [dr, dc] of directions) {
      const newR = r + dr;
      const newC = c + dc;
      const neighborKey = `${newR},${newC}`;
      
      // Bỏ qua nếu ra khỏi lưới hoặc đụng tường
      if (newR < 0 || newR >= rows || newC < 0 || newC >= cols || grid[newR][newC] === -1) {
        continue;
      }
      
      // Chi phí tạm tính = Chi phí đến ô hiện tại + Chi phí bước vào ô tiếp theo
      const tentativeGScore = gScores.get(currentKey) + grid[newR][newC];
      
      // Nếu tìm được một đường đi rẻ hơn đến ô láng giềng này (hoặc chưa từng đến)
      if (!gScores.has(neighborKey) || tentativeGScore < gScores.get(neighborKey)) {
        gScores.set(neighborKey, tentativeGScore);
        
        // f(n) = g(n) + h(n)
        const fScore = tentativeGScore + heuristic(newR, newC);
        pq.enqueue([newR, newC], fScore);
      }
    }
  }
  
  return null; // Không tìm thấy đường
}

// ================= TEST CASES =================
function runTests() {
  const testCases = [
    {
      description: "1. Happy Path - Đường thẳng không vật cản (Toàn đường bằng phẳng cost=1)",
      grid: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ],
      start: [0, 0],
      end: [0, 2],
      expected: 2, // Đi [0,1] (cost 1) -> [0,2] (cost 1) = Tổng 2
      explanation: "Chỉ cần bước 2 bước sang phải."
    },
    {
      description: "2. Cạm bẫy trọng số - Đường ngắn nhưng đắt VS Đường dài nhưng rẻ",
      grid: [
        [ 1,  1, 10,  1],
        [ 1, 10, 10,  1],
        [ 1,  1,  1,  1]
      ],
      start: [0, 0],
      end: [0, 3],
      // Đường thẳng [0,1] -> [0,2](cost 10) -> [0,3] = 12
      // Đường vòng xuống dưới: [1,0]->[2,0]->[2,1]->[2,2]->[2,3]->[1,3]->[0,3] = 6 bước cost 1 = 6
      expected: 6,
      explanation: "A* đủ thông minh để né ô cost=10 và đi đường vòng dài hơn nhưng tổng chi phí (6) rẻ hơn đường thẳng (12)."
    },
    {
      description: "3. Né vật cản (Tường = -1)",
      grid: [
        [ 1, -1,  1],
        [ 1, -1,  1],
        [ 1,  1,  1]
      ],
      start: [0, 0],
      end: [0, 2],
      expected: 4, // Xuống dưới cùng rồi vòng lên
      explanation: "Bắt buộc đi vòng chữ U xuống dưới đáy để né bức tường."
    },
    {
      description: "4. Không có đường tới đích (Bị tường bao quanh)",
      grid: [
        [ 1,  1, -1,  1],
        [ 1,  1, -1,  1],
        [-1, -1, -1,  1],
        [ 1,  1,  1,  1]
      ],
      start: [0, 0],
      end: [0, 3],
      expected: null,
      explanation: "Đích bị cô lập hoàn toàn bởi tường (-1), thuật toán phải trả về null."
    },
    {
      description: "5. Điểm bắt đầu trùng với điểm kết thúc",
      grid: [
        [1, 1],
        [1, 1]
      ],
      start: [1, 1],
      end: [1, 1],
      expected: 0,
      explanation: "Đứng yên tại chỗ, chi phí là 0."
    },
    {
      description: "6. Edge Case - Tọa độ Start hoặc End nằm ngoài bản đồ",
      grid: [
        [1, 1],
        [1, 1]
      ],
      start: [-1, 0], // Lỗi
      end: [1, 1],
      expected: null,
      explanation: "Ràng buộc input sẽ phát hiện tọa độ sai và trả về null."
    },
    {
      description: "7. Mê cung phức tạp (Labyrinth)",
      grid: [
        [ 1,  1,  1,  1, -1],
        [-1, -1, -1,  1, -1],
        [ 1,  1,  1,  1, -1],
        [ 1, -1, -1, -1, -1],
        [ 1,  1,  1,  1,  1]
      ],
      start: [0, 0],
      end: [4, 4],
      expected: 14, 
      explanation: "Tìm được đường đi ngoằn ngoèo qua các vách ngăn của mê cung."
    }
  ];

  let allPassed = true;

  console.log("=== BẮT ĐẦU CHẠY TEST: A* PATHFINDING ===\n");

  testCases.forEach(({ description, grid, start, end, expected, explanation }, index) => {
    const result = aStarSearch(grid, start, end);

    if (result !== expected) {
      console.error(`❌ Test case ${index + 1} FAILED: ${description}`);
      console.error(`   Start: [${start}], End: [${end}]`);
      console.error(`   Expected cost: ${expected}`);
      console.error(`   Got cost: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ Test case ${index + 1} PASSED: ${description}`);
      console.log(`   -> ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🎉 XUẤT SẮC! Thuật toán A* đã vượt qua toàn bộ các bẫy logic.");
  } else {
    console.log("\n❌ Có lỗi xảy ra trong các test cases. Hãy xem lại logic Heuristic hoặc Priority Queue.");
  }
}

// Run tests
runTests();
