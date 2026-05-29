/**
 * Kiểm tra xem chuỗi s3 có phải là sự đan xen của s1 và s2 hay không. Leetcode 97
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
function isInterleave(s1, s2, s3) {
    const m = s1.length;
    const n = s2.length;

    // Điều kiện tiên quyết: Tổng chiều dài s1 và s2 phải bằng s3
    if (m + n !== s3.length) {
        return false;
    }

    // Khởi tạo bảng DP với giá trị mặc định là false
    // dp[i][j] đại diện cho s1[0...i-1] và s2[0...j-1] có đan xen thành s3[0...i+j-1]
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

    // Điểm xuất phát: 2 chuỗi rỗng đan xen thành chuỗi rỗng
    dp[0][0] = true;

    // Khởi tạo hàng đầu tiên (khi s1 là chuỗi rỗng, chỉ xét s2 và s3)
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }

    // Khởi tạo cột đầu tiên (khi s2 là chuỗi rỗng, chỉ xét s1 và s3)
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }

    // Điền giá trị cho toàn bộ bảng DP
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const currentS3Char = s3[i + j - 1];
            
            // Ô hiện tại hợp lệ nếu:
            // 1. Ký tự cuối đến từ s1 VÀ trạng thái trước đó (i-1, j) cũng hợp lệ.
            // OẶC
            // 2. Ký tự cuối đến từ s2 VÀ trạng thái trước đó (i, j-1) cũng hợp lệ.
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === currentS3Char) || 
                       (dp[i][j - 1] && s2[j - 1] === currentS3Char);
        }
    }

    return dp[m][n];
}

// Hệ thống kiểm thử mini bằng JS thuần
let passedTests = 0;
let failedTests = 0;

function assert(description, actual, expected) {
    if (actual === expected) {
        console.log(`✅ [PASS] ${description}`);
        passedTests++;
    } else {
        console.error(`❌ [FAIL] ${description}`);
        console.error(`   Mong đợi: ${expected}, Thực tế nhận được: ${actual}`);
        failedTests++;
    }
}

function runTests() {
    console.log("=== BẮT ĐẦU CHẠY UNIT TEST ===");

    // Test case 1: Ví dụ 1 từ đề bài (Hợp lệ phức tạp)
    assert(
        "Ví dụ 1: s1='aabcc', s2='dbbca', s3='aadbbcbcac' -> mong đợi true",
        isInterleave("aabcc", "dbbca", "aadbbcbcac"),
        true
    );

    // Test case 2: Ví dụ 2 từ đề bài (Không hợp lệ)
    assert(
        "Ví dụ 2: s1='aabcc', s2='dbbca', s3='aadbbbaccc' -> mong đợi false",
        isInterleave("aabcc", "dbbca", "aadbbbaccc"),
        false
    );

    // Test case 3: Ví dụ 3 từ đề bài (Tất cả chuỗi rỗng)
    assert(
        "Ví dụ 3: Tất cả chuỗi đều rỗng -> mong đợi true",
        isInterleave("", "", ""),
        true
    );

    // Test case 4: Sai lệch tổng chiều dài
    assert(
        "Sai lệch chiều dài: s3 có độ dài không bằng s1 + s2 -> mong đợi false",
        isInterleave("abc", "def", "abcdefg"),
        false
    );

    // Test case 5: Một trong hai chuỗi rỗng (Hợp lệ)
    assert(
        "Một chuỗi rỗng: s1 rỗng, s3 trùng khớp s2 -> mong đợi true",
        isInterleave("", "apple", "apple"),
        true
    );

    // Test case 6: Một trong hai chuỗi rỗng (Không hợp lệ)
    assert(
        "Một chuỗi rỗng: s2 rỗng nhưng s3 lệch ký tự với s1 -> mong đợi false",
        isInterleave("banana", "", "bananx"),
        false
    );

    // Test case 7: Đan xen liên tục từng ký tự một
    assert(
        "Đan xen xen kẽ: s1='abc', s2='xyz', s3='axbycz' -> mong đợi true",
        isInterleave("abc", "xyz", "axbycz"),
        true
    );

    console.log("\n=== KẾT QUẢ KIỂM THỬ ===");
    console.log(`Tổng số test vượt qua: ${passedTests}`);
    console.log(`Tổng số test thất bại: ${failedTests}`);

    // Thoát chương trình với mã lỗi nếu có test fail (hữu ích cho CI/CD)
    if (failedTests > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

// Thực thi bộ test
runTests();
