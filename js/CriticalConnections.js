/**
 * Bài toán: Critical Connections in a Network (LeetCode 1192 - Hard)
 * Pattern: Graph Theory, Tarjan's Algorithm (Bridges)
 * Độ phức tạp: Thời gian O(V + E), Không gian O(V + E)
 */
function criticalConnections(n, connections) {
  // Bước 1: Xây dựng Danh sách kề (Adjacency List)
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u); // Đồ thị vô hướng
  }

  const result = [];
  const disc = new Array(n).fill(-1); // Thời điểm phát hiện (-1 là chưa thăm)
  const low = new Array(n).fill(-1);  // Thời điểm nhỏ nhất có thể quay về
  let time = 0; // Đồng hồ đếm thời gian

  // Bước 2: Khởi tạo hàm DFS nội bộ để áp dụng Tarjan
  function dfs(u, parent) {
    // Đánh dấu thời gian phát hiện và low khởi điểm bằng nhau
    disc[u] = low[u] = time++;

    // Duyệt qua tất cả các hàng xóm của u
    for (const v of graph[u]) {
      // Bỏ qua đường vừa đi từ cha xuống (không tính là đường vòng)
      if (v === parent) continue;

      if (disc[v] === -1) {
        // TRƯỜNG HỢP 1: Hàng xóm v CHƯA được thăm -> Đi xuống DFS
        dfs(v, u);

        // Sau khi v đệ quy xong, u cập nhật lại low của mình dựa trên những gì v tìm được
        low[u] = Math.min(low[u], low[v]);

        // ĐIỀU KIỆN TÌM THẤY CẦU (CRITICAL CONNECTION)
        // Nếu thằng con v (và toàn bộ nhánh dưới của v) không thể tìm đường nào 
        // leo ngược lên được tổ tiên của u, hoặc chính u.
        if (low[v] > disc[u]) {
          result.push([u, v]);
        }
      } else {
        // TRƯỜNG HỢP 2: Hàng xóm v ĐÃ được thăm (Back-edge / Đường vòng)
        // Cập nhật low[u] bằng thời điểm phát hiện của v
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  // Bước 3: Kích hoạt DFS (Vì đề bài cho đồ thị liên thông nên chỉ cần gọi 1 lần từ node 0)
  // Nếu đồ thị có thể bị đứt gãy từ đầu (Forest), ta sẽ cần vòng lặp qua n node.
  dfs(0, -1);

  return result;
}

// ================= HỆ THỐNG TEST CASES HỌC THUẬT =================
function runTests() {
  // Hàm helper để so sánh mảng 2D (bỏ qua thứ tự các cạnh và thứ tự node trong cạnh)
  const isMatch = (res, expected) => {
    if (res.length !== expected.length) return false;
    const normalize = (arr) => arr.map(edge => edge.sort((a, b) => a - b).join(',')).sort();
    return JSON.stringify(normalize(res)) === JSON.stringify(normalize(expected));
  };

  const testCases = [
    {
      description: "1. Đồ thị quả tạ (Lollipop Graph - 1 vòng tròn + 1 đuôi)",
      n: 4,
      connections: [[0,1], [1,2], [2,0], [1,3]],
      expected: [[1,3]],
      explanation: "Tam giác 0-1-2 bảo vệ lẫn nhau. Cáp 1-3 là SPOF."
    },
    {
      description: "2. Đường thẳng (Tất cả đều là điểm chết)",
      n: 3,
      connections: [[0,1], [1,2]],
      expected: [[0,1], [1,2]],
      explanation: "Không có đường vòng nào. Đứt ở đâu cũng chia cắt đồ thị."
    },
    {
      description: "3. Đồ thị liên thông hoàn chỉnh (Mạng nhện an toàn)",
      n: 4,
      connections: [[0,1], [1,2], [2,3], [3,0], [0,2], [1,3]],
      expected: [],
      explanation: "Mọi node đều kết nối trực tiếp với nhau, không có kết nối nào là chí mạng."
    },
    {
      description: "4. Hai cụm server nối bằng 1 đường trục chính (Mô hình Core-Edge)",
      n: 6,
      connections: [[0,1], [1,2], [2,0], [3,4], [4,5], [5,3], [2,3]],
      expected: [[2,3]],
      explanation: "Cụm 1 (0,1,2) và Cụm 2 (3,4,5) tự an toàn, nhưng cáp nối 2 cụm (2,3) là cầu."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: TARJAN'S BRIDGE-FINDING ALGORITHM ===\n");

  testCases.forEach(({ description, n, connections, expected, explanation }, index) => {
    const result = criticalConnections(n, connections);

    if (!isMatch(result, expected)) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   Kỳ vọng: ${JSON.stringify(expected)} | Thực tế: ${JSON.stringify(result)}`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 XUẤT SẮC! Bạn đã nắm vững Thuật toán Tarjan ở độ phức tạp O(V+E). Đây là kiến thức cốt lõi mà các Kỹ sư Hệ thống Phân tán (Distributed Systems Engineers) dùng để thiết kế kiến trúc High Availability (HA).");
  }
}

// Khởi chạy
runTests();
