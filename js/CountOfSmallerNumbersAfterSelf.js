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
