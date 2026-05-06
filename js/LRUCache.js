/**
 * Bài toán: LRU Cache (LeetCode 146)
 * Pattern: Hash Map + Doubly Linked List
 */

// Định nghĩa một Node của Danh sách liên kết kép
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // Lưu trữ: { key: Node }

    // Dummy Head và Dummy Tail (Lính gác cổng)
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // ==== CÁC HÀM TIỆN ÍCH CHO LINKED LIST (O(1)) ====
  
  // Nhét một Node vào SÁT SAU DUMMY HEAD (Trở thành thằng Mới Nhất)
  _addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  // Rút một Node ra khỏi danh sách (Nối thằng đằng trước với thằng đằng sau nó)
  _removeNode(node) {
    let prevNode = node.prev;
    let nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  // Đẩy một Node lên làm thằng Mới Nhất
  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  // Chém bay màu thằng Cũ Nhất (Nằm sát trước DUMMY TAIL)
  _popTail() {
    let res = this.tail.prev;
    this._removeNode(res);
    return res;
  }

  // ==== CÁC HÀM NGHIỆP VỤ CHÍNH TƯƠNG TÁC VỚI NGƯỜI DÙNG ====

  get(key) {
    let node = this.map.get(key);
    if (!node) return -1; // Không tồn tại

    // Nếu tồn tại, nó vừa được DÙNG -> Phải đẩy nó lên HEAD
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    let node = this.map.get(key);

    if (node) {
      // Đã tồn tại -> Cập nhật giá trị và đẩy lên HEAD
      node.value = value;
      this._moveToHead(node);
    } else {
      // Chưa tồn tại -> Tạo Node mới
      let newNode = new Node(key, value);
      this.map.set(key, newNode);
      this._addNode(newNode); // Cắm vào HEAD

      // Check dung lượng bộ nhớ
      if (this.map.size > this.capacity) {
        // Tràn RAM -> Xóa thằng nằm sát Tail
        let tailNode = this._popTail();
        this.map.delete(tailNode.key); // Xóa khỏi Map
      }
    }
  }
}

// ================= HỆ THỐNG TEST CASES CỰC CHI TIẾT =================
function runTests() {
  console.log("=== KIỂM THỬ HỆ THỐNG: LRU CACHE ===\n");

  let cache = new LRUCache(2); // Sức chứa = 2
  let allPassed = true;

  const runCommand = (command, args, expected, stepDesc) => {
    let result = null;
    if (command === "put") {
      cache.put(args[0], args[1]);
      result = "null";
    } else if (command === "get") {
      result = cache.get(args[0]);
    }

    if (String(result) !== String(expected)) {
      console.error(`❌ FAILED: ${stepDesc}`);
      console.error(`   Kỳ vọng: ${expected} | Thực tế: ${result}`);
      allPassed = false;
    } else {
      console.log(`✓ PASSED: ${stepDesc}`);
    }
  };

  runCommand("put", [1, 1], "null", "Nhét [1, 1] vào cache (Cache: [1])");
  runCommand("put", [2, 2], "null", "Nhét [2, 2] vào cache (Cache: [2, 1])");
  runCommand("get", [1], 1, "Gọi get(1). Số 1 được đưa lên đầu (Cache: [1, 2])");
  
  // BƯỚC NGOẶT: Nhét thêm số 3, sức chứa = 2 -> Số 2 bị đá ra ngoài vì ít dùng nhất!
  runCommand("put", [3, 3], "null", "Nhét [3, 3]. Cache đầy! Xóa số 2. (Cache: [3, 1])");
  
  runCommand("get", [2], -1, "Gọi get(2). Chắc chắn không còn -> Trả về -1");
  
  // Nhét thêm số 4 -> Số 1 bị đá ra ngoài vì số 3 mới được nhét vào
  runCommand("put", [4, 4], "null", "Nhét [4, 4]. Cache đầy! Xóa số 1. (Cache: [4, 3])");
  
  runCommand("get", [1], -1, "Gọi get(1). Chắc chắn không còn -> Trả về -1");
  runCommand("get", [3], 3, "Gọi get(3) -> Trả về 3. Số 3 lên đầu. (Cache: [3, 4])");
  runCommand("get", [4], 4, "Gọi get(4) -> Trả về 4. Số 4 lên đầu. (Cache: [4, 3])");

  if (allPassed) {
    console.log("\n🚀 PERFECT! Cache hoạt động trơn tru. Bộ não Hash Map và cơ bắp Linked List đã phối hợp hoàn hảo ở tốc độ O(1).");
  }
}

runTests();
