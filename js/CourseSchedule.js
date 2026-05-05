/**
 * Bài toán: Course Schedule (LeetCode 207 - Medium)
 * Pattern: Topological Sort (Kahn's Algorithm - BFS)
 * Độ phức tạp: 
 * - Thời gian: O(V + E) với V là số môn học (đỉnh), E là số điều kiện (cạnh). Ta chỉ duyệt qua mỗi đỉnh và cạnh đúng 1 lần.
 * - Không gian: O(V + E) để lưu trữ Đồ thị (Graph) và mảng inDegree.
 */
function canFinish(numCourses, prerequisites) {
  // 1. Khởi tạo mảng "Cục nợ" (In-degree) và Đồ thị (Adjacency List)
  const inDegree = new Array(numCourses).fill(0);
  const graph = new Map();
  
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []); // Mỗi môn học có một mảng chứa các môn học "đàn em" phụ thuộc vào nó
  }

  // 2. Xây dựng Đồ thị và đếm In-degree
  for (let [course, preReq] of prerequisites) {
    // Để học `course`, phải học `preReq` -> `preReq` trỏ tới `course`
    graph.get(preReq).push(course);
    inDegree[course]++; // Tăng "cục nợ" của môn `course` lên 1
  }

  // 3. Khởi tạo Queue bằng cách gom tất cả các môn có In-degree == 0 (Học được ngay)
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let coursesTaken = 0; // Đếm số môn đã học thành công

  // 4. Bắt đầu quá trình học (BFS)
  while (queue.length > 0) {
    // Trong thực tế cần O(1) Queue, ở đây dùng shift() O(N) của JS cho ngắn gọn
    const currentCourse = queue.shift(); 
    coursesTaken++; // Học xong 1 môn!

    // Lấy danh sách các môn "đàn em" đang bị khóa bởi môn hiện tại
    const nextCourses = graph.get(currentCourse);
    
    for (let nextCourse of nextCourses) {
      inDegree[nextCourse]--; // Môn đàn anh đã học xong, giảm nợ cho đàn em
      
      // Nếu đàn em đã trả hết nợ (đủ điều kiện tiên quyết) -> Cho vào danh sách chuẩn bị học
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // 5. Nếu tổng số môn đã học bằng số môn yêu cầu -> Thành công. Ngược lại là bị Deadlock.
  return coursesTaken === numCourses;
}

// ================= HỆ THỐNG TEST CASES CỰC KỲ KHẮC NGHIỆT =================
function runTests() {
  const testCases = [
    {
      description: "1. Happy Path - Một đường thẳng",
      numCourses: 2,
      prerequisites: [[1, 0]],
      expected: true,
      explanation: "0 -> 1. Học 0 xong học 1. Không có vấn đề gì."
    },
    {
      description: "2. Chu trình chết (Deadlock / Cycle) cơ bản",
      numCourses: 2,
      prerequisites: [[1, 0], [0, 1]],
      expected: false,
      explanation: "0 cần 1, 1 lại cần 0. Queue ban đầu sẽ rỗng (vì không ai có inDegree=0). Vòng lặp while không chạy, coursesTaken = 0. Trả về false."
    },
    {
      description: "3. Đồ thị hội tụ (Nhiều môn cơ sở cho 1 môn chuyên ngành)",
      numCourses: 4,
      prerequisites: [[3, 1], [3, 2], [1, 0], [2, 0]],
      expected: true,
      explanation: "Học 0 -> mở khóa được 1 và 2. Học xong 1 và 2 -> mở khóa được 3. (Mô hình kim tự tháp hợp lệ)."
    },
    {
      description: "4. Chu trình ẩn ở sâu bên trong (Hidden Cycle)",
      numCourses: 5,
      prerequisites: [[1, 0], [2, 1], [3, 2], [1, 3], [4, 2]],
      expected: false,
      explanation: "Môn 0 học được. Nhưng nhóm [1, 2, 3] tạo thành vòng lặp khép kín (1->2->3->1). Chúng tự khóa nhau vĩnh viễn, kéo theo môn 4 cũng không bao giờ được học."
    },
    {
      description: "5. Đồ thị bị đứt gãy (Disconnected Components)",
      numCourses: 6,
      prerequisites: [[1, 0], [3, 2], [5, 4]],
      expected: true,
      explanation: "Có 3 khoa khác nhau trong trường, không liên quan đến nhau. Vẫn có thể học song song và hoàn thành tất cả."
    },
    {
      description: "6. Hoàn toàn không có điều kiện tiên quyết",
      numCourses: 3,
      prerequisites: [],
      expected: true,
      explanation: "Tất cả các môn đều có inDegree = 0. Bốc hết vào Queue và pass."
    },
    {
      description: "7. Cú lừa đồ thị song song (Không phải chu trình)",
      numCourses: 3,
      prerequisites: [[2, 0], [2, 1]],
      expected: true,
      explanation: "Môn 2 phụ thuộc vào CẢ 0 và 1. Đây không phải chu trình. Học 0 và 1 trước (thứ tự nào cũng được), sau đó học 2."
    }
  ];

  let allPassed = true;
  console.log("=== KIỂM THỬ THUẬT TOÁN: COURSE SCHEDULE (TOPOLOGICAL SORT) ===\n");

  testCases.forEach(({ description, numCourses, prerequisites, expected, explanation }, index) => {
    const result = canFinish(numCourses, prerequisites);

    if (result !== expected) {
      console.error(`❌ Case ${index + 1} FAILED: ${description}`);
      console.error(`   numCourses: ${numCourses}, prerequisites: ${JSON.stringify(prerequisites)}`);
      console.error(`   Kỳ vọng: ${expected} | Thực tế: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ Case ${index + 1} PASSED: ${description}`);
      console.log(`   💡 ${explanation}`);
    }
  });

  if (allPassed) {
    console.log("\n🚀 PERFECT! Bạn vừa xử lý thành công lõi của hệ thống NPM (Node Package Manager). Khi bạn chạy lệnh `npm install`, đây chính xác là cách NodeJS gỡ rối các module phụ thuộc lẫn nhau đấy!");
  }
}

// Khởi chạy hệ thống
runTests();
