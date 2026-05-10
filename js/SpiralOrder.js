/**
 * Bài toán: Spiral Matrix (LeetCode 54 - Medium)
 * Pattern: Matrix Boundary Simulation
 * Độ phức tạp: Thời gian O(M * N), Không gian O(1) (không tính mảng kết quả)
 */
function spiralOrder(matrix) {
  const result = [];
  
  // Xử lý an toàn nếu ma trận rỗng
  if (!matrix || matrix.length === 0) return result;

  // Khởi tạo 4 bức tường (biên)
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  // Điều kiện sống còn: Các bức tường chưa đâm chéo vào nhau
  while (top <= bottom && left <= right) {
    
    // 1. Đi từ Trái sang Phải (Dọc theo bức tường Top)
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++; // Duyệt xong hàng trên cùng, thu hẹp trần nhà xuống

    // 2. Đi từ Trên xuống Dưới (Dọc theo bức tường Right)
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--; // Duyệt xong cột ngoài cùng bên phải, ép tường phải vào trong

    // CẢNH BÁO: Phải kiểm tra xem trần và sàn có bị lọt qua nhau chưa!
    // Tránh việc lặp lại khi ma trận chỉ có 1 hàng đơn lẻ
    if (top <= bottom) {
      // 3. Đi từ Phải sang Trái (Dọc theo bức tường Bottom)
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--; // Duyệt xong hàng dưới cùng, đôn sàn nhà lên
    }

    // CẢNH BÁO: Phải kiểm tra xem tường trái và phải có bị lọt qua nhau chưa!
    // Tránh việc lặp lại khi ma trận chỉ có 1 cột đơn lẻ
    if (left <= right) {
      // 4. Đi từ Dưới lên Trên (Dọc theo bức tường Left)
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++; // Duyệt xong cột ngoài cùng bên trái, ép tường trái vào trong
    }
  }

  return result;
}

// ================= HỆ THỐNG UNIT TEST CHUYÊN SÂU =================

function runTests() {
  console.log("\n🧪 BẮT ĐẦU CHẠY UNIT TEST: SPIRAL MATRIX\n");

  // Hàm so sánh 2 mảng 1 chiều
  const isMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testCases = [
    {
      description: "1. Happy Path - Ma trận vuông (3x3)",
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
      reason: "Trường hợp chuẩn mực nhất, đi xoắn ốc hoàn hảo vào tâm."
    },
    {
      description: "2. Chữ nhật NẰM NGANG (3x4) - Nhiều cột hơn hàng",
      matrix: [
        [ 1,  2,  3,  4],
        [ 5,  6,  7,  8],
        [ 9, 10, 11, 12]
      ],
      expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      reason: "Kết thúc ở hàng giữa. Đảm bảo không bị lặp lại các phần tử."
    },
    {
      description: "3. Chữ nhật DỌC (4x3) - Nhiều hàng hơn cột",
      matrix: [
        [ 1,  2,  3],
        [ 4,  5,  6],
        [ 7,  8,  9],
        [10, 11, 12]
      ],
      expected: [1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8],
      reason: "Kết thúc ở cột giữa. Bẫy rất nhiều lỗi logic nếu code không đối xứng."
    },
    {
      description: "4. THE DEADLY TRAP - Ma trận chỉ có 1 HÀNG DÀI (1x5)",
      matrix: [
        [1, 2, 3, 4, 5]
      ],
      expected: [1, 2, 3, 4, 5],
      reason: "Tấn công điểm yếu số 1: Code kém sẽ duyệt ngược lại 5, 4, 3, 2, 1."
    },
    {
      description: "5. THE DEADLY TRAP - Ma trận chỉ có 1 CỘT DỌC (5x1)",
      matrix: [
        [1],
        [2],
        [3],
        [4],
        [5]
      ],
      expected: [1, 2, 3, 4, 5],
      reason: "Tấn công điểm yếu số 2: Code kém sẽ đi từ dưới lên trên làm lặp dữ liệu."
    },
    {
      description: "6. Ma trận 1 phần tử (1x1)",
      matrix: [
        [99]
      ],
      expected: [99],
      reason: "Giới hạn nhỏ nhất của dữ liệu, mọi vòng lặp phải kết thúc ngay lập tức."
    },
    {
      description: "7. Ma trận chứa số âm và 0 (Giá trị biên)",
      matrix: [
        [-100, 0],
        [  -1, 5]
      ],
      expected: [-100, 0, 5, -1],
      reason: "Đảm bảo các giá trị âm (falsy) không gây ảnh hưởng đến logic của mảng."
    }
  ];

  let passedCount = 0;

  testCases.forEach((tc, index) => {
    const actual = spiralOrder(tc.matrix);

    if (isMatch(actual, tc.expected)) {
      console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
      passedCount++;
    } else {
      console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
      // Dùng console.table để in ma trận ra cho đẹp và dễ nhìn lỗi
      console.log("   👉 Ma trận đầu vào:");
      console.table(tc.matrix);
      console.error(`   🎯 Kỳ vọng: [${tc.expected.join(', ')}]`);
      console.error(`   🚨 Thực tế: [${actual.join(', ')}]`);
    }
    console.log(`   💡 Mục đích test: ${tc.reason}\n`);
  });

  console.log("==================================================");
  if (passedCount === testCases.length) {
    console.log(`🎉 HOÀN HẢO! Thuật toán đã vượt qua toàn bộ ${passedCount}/${testCases.length} Test Cases.`);
    console.log(`Cấu trúc điều khiển 4 bức tường của bạn chống chịu tuyệt đối trước mọi hình thù ma trận!`);
  } else {
    console.log(`⚠️ Có ${testCases.length - passedCount} lỗi. Hãy xem lại phần kiểm tra (top <= bottom).`);
  }
}

// Khởi chạy hệ thống test
runTests();
