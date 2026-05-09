/**
 * Bài toán: Count of Smaller Numbers After Self (LeetCode 315 - Hard)
 * Pattern: Binary Indexed Tree (Fenwick Tree) + Coordinate Compression
 * Độ phức tạp: Thời gian O(N log N), Không gian O(N)
 */
function countSmaller(nums) {
  const n = nums.length;
  if (n === 0) return [];

  console.log("=== BƯỚC 1: NÉN TỌA ĐỘ (DISCRETIZATION) ===");
  // Lọc trùng và sắp xếp tăng dần để lấy "Thứ hạng" (Rank)
  const sortedUnique = [...new Set(nums)].sort((a, b) => a - b);
  const ranks = new Map();
  // Fenwick Tree bắt buộc phải dùng mảng bắt đầu từ index 1
  sortedUnique.forEach((val, index) => ranks.set(val, index + 1));
  console.log("Bảng xếp hạng (Rank):", ranks);

  // --- KHỞI TẠO FENWICK TREE ---
  // Kích thước bằng số lượng rank duy nhất + 1
  const bit = new Array(sortedUnique.length + 1).fill(0);

  // Hàm Update: Tăng tần suất xuất hiện của một Rank thêm 'delta'
  const update = (index, delta) => {
    let curr = index;
    while (curr < bit.length) {
      bit[curr] += delta;
      // NHẢY BIT LÊN NODE CHA: x = x + (x & -x)
      curr += curr & (-curr); 
    }
  };

  // Hàm Query: Đếm TỔNG số lần xuất hiện của các Rank từ 1 đến 'index'
  const query = (index) => {
    let sum = 0;
    let curr = index;
    while (curr > 0) {
      sum += bit[curr];
      // NHẢY BIT XUỐNG NODE CON: x = x - (x & -x)
      curr -= curr & (-curr); 
    }
    return sum;
  };

  console.log("\n=== BƯỚC 2: DUYỆT TỪ PHẢI SANG TRÁI VÀ ĐẾM BẰNG BIT ===");
  const result = new Array(n).fill(0);

  // Mấu chốt: Duyệt ngược từ phải sang trái
  for (let i = n - 1; i >= 0; i--) {
    const val = nums[i];
    const rank = ranks.get(val); // Lấy thứ hạng của số hiện tại

    console.log(`\n👉 Xét số: ${val} (Rank: ${rank}) ở vị trí [${i}]`);

    // 1. QUERY: Hỏi xem trong BIT hiện tại (các số bên phải đã duyệt qua),
    // có bao nhiêu số có thứ hạng NHỎ HƠN rank của tôi (tức là từ 1 đến rank - 1)?
    const smallerCount = query(rank - 1);
    result[i] = smallerCount;
    console.log(`   🔍 Truy vấn số lượng phần tử có Rank < ${rank} -> Đếm được: ${smallerCount}`);

    // 2. UPDATE: Đánh dấu sự tồn tại của tôi (Rank này) vào BIT
    // Để các thằng đi sau (nằm bên trái tôi) có thể nhìn thấy tôi!
    update(rank, 1);
    console.log(`   📝 Update: Thêm 1 phiếu cho Rank ${rank} vào hệ thống BIT.`);
    console.log(`   [Trạng thái BIT ngầm]:`, bit.join(', '));
  }

  console.log("\n=== KẾT THÚC THUẬT TOÁN ===");
  return result;
}

// ================= HỆ THỐNG UNIT TEST HỌC THUẬT CAO =================

function runTests() {
  console.log("\n🧪 BẮT ĐẦU CHẠY UNIT TEST: FENWICK TREE (BINARY INDEXED TREE)\n");

  const isMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testCases = [
    {
      description: "1. Ví dụ kinh điển",
      nums: [5, 2, 6, 1],
      expected: [2, 1, 1, 0],
      reason: "Đủ các trường hợp lớn/nhỏ đảo lộn."
    },
    {
      description: "2. Mảng chứa số âm và số rất lớn (Spike Data)",
      nums: [1000000, -1000000, 5, 5, -2],
      expected: [4, 0, 1, 1, 0],
      reason: "Kiểm tra kỹ thuật Nén tọa độ (Coordinate Compression) xem có hoạt động chính xác với gap cực lớn không."
    },
    {
      description: "3. Mảng đã được sắp xếp GIẢM DẦN (Worst Case cho Bruteforce)",
      nums: [5, 4, 3, 2, 1],
      expected: [4, 3, 2, 1, 0],
      reason: "Mọi phần tử bên phải đều nhỏ hơn nó. Mọi truy vấn BIT đều phải cộng dồn tối đa."
    },
    {
      description: "4. Mảng đã được sắp xếp TĂNG DẦN",
      nums: [1, 2, 3, 4, 5],
      expected: [0, 0, 0, 0, 0],
      reason: "Không có phần tử nào nhỏ hơn ở bên phải. BIT query phải luôn trả về 0."
    },
    {
      description: "5. Mảng chứa các giá trị TRÙNG LẶP liên tục",
      nums: [3, 3, 3, 3],
      expected: [0, 0, 0, 0],
      reason: "Bài toán yêu cầu 'nhỏ hơn' chứ không phải 'nhỏ hơn hoặc bằng'. Các rank bằng nhau không được đếm."
    },
    {
      description: "6. Mảng rỗng hoặc 1 phần tử",
      nums: [99],
      expected: [0],
      reason: "Kiểm tra giới hạn thấp nhất. Code không được văng lỗi undefined."
    }
  ];

  let passedCount = 0;

  testCases.forEach((tc, index) => {
    // Tắt log khi chạy hàng loạt
    const originalLog = console.log;
    console.log = () => {}; 
    
    const actual = countSmaller(tc.nums);
    
    console.log = originalLog; 

    if (isMatch(actual, tc.expected)) {
      console.log(`✅ TEST ${index + 1} PASSED: ${tc.description}`);
      passedCount++;
    } else {
      console.error(`❌ TEST ${index + 1} FAILED: ${tc.description}`);
      console.error(`   👉 Input:    [${tc.nums}]`);
      console.error(`   🎯 Expected: [${tc.expected}]`);
      console.error(`   🚨 Actual:   [${actual}]`);
    }
  });

  console.log("==================================================");
  if (passedCount === testCases.length) {
    console.log(`🎉 TẤT CẢ ${passedCount}/${testCases.length} TEST PASSED! Cấu trúc Binary Indexed Tree vận hành hoàn hảo với độ phức tạp Bitwise.`);
  } else {
    console.log(`⚠️ Có lỗi trong khâu xử lý Bit. Cần xem lại!`);
  }
}

runTests();
