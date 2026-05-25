const fs = require('fs');
const https = require('https');
const path = require('path');

// Hàm thực hiện gọi API (HTTPS POST) bằng JS thuần, trả về một Promise
const postRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                'User-Agent': 'Mozilla/5.0'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => resolve(JSON.parse(responseData)));
        });

        req.on('error', (err) => reject(err));
        req.write(JSON.stringify(data));
        req.end();
    });
};

// Hàm chính chạy Bot cào bài
const runBot = async () => {
    const graphqlUrl = 'https://leetcode.com/graphql';
    
    // Query GraphQL của LeetCode để lấy bài Daily hôm nay
    const queryDaily = {
        query: `
            query questionOfToday {
                activeDailyCodingChallengeQuestion {
                    date
                    question {
                        questionFrontendId
                        title
                        titleSlug
                        difficulty
                        content
                    }
                }
            }
        `
    };

    try {
        console.log("Đang lấy thông tin bài LeetCode Daily...");
        const response = await postRequest(graphqlUrl, queryDaily);
        const challenge = response.data.activeDailyCodingChallengeQuestion.question;
        
        const id = challenge.questionFrontendId;
        const title = challenge.title;
        const slug = challenge.titleSlug;
        const difficulty = challenge.difficulty;

        console.log(`Đã tìm thấy bài: [${id}] ${title} (${difficulty})`);

        // Tạo cấu trúc template mã nguồn JS kèm Unit Test thuần
        const fileContent = `/**
 * LeetCode Daily Challenge
 * ID: ${id}
 * Title: ${title}
 * Difficulty: ${difficulty}
 * URL: https://leetcode.com/problems/${slug}/
 */

/**
 * TODO: Thay thế hàm này bằng logic giải bài tương ứng
 * @param {any} input
 * @return {any}
 */
const solveLeetCodeQuestion = (input) => {
    // Viết logic giải thuật tại đây
    return input; 
};

// ==========================================
// TRÌNH CHẠY UNIT TEST BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
        {
            name: "Test Case Mẫu 1",
            input: "test",
            expected: "test"
        }
    ];

    let passedCount = 0;
    console.log(\`=== RUNNING TESTS FOR: ${title} ===\`);

    testCases.forEach((test, index) => {
        const actual = solveLeetCodeQuestion(test.input);
        const isPassed = actual === test.expected;

        if (isPassed) {
            console.log(\`✅ Test #\${index + 1} PASSED: \${test.name}\`);
            passedCount++;
        } else {
            console.error(\`❌ Test #\${index + 1} FAILED: \${test.name}\`);
            console.error(\`   - Expected: \${test.expected}\`);
            console.error(\`   - Actual:   \${actual}\`);
        }
    });

    console.log("-----------------------------------------");
    // Nếu có bài test thất bại, văng lỗi để GitHub Actions CI nhận diện và báo đỏ
    if (passedCount !== testCases.length) {
        console.error(\`Kết quả: Thất bại \${testCases.length - passedCount}/\${testCases.length} bài test.\`);
        process.exit(1); 
    } else {
        console.log(\`Kết quả: Tuyệt vời! Vượt qua tất cả \${passedCount}/\${testCases.length} bài test.\`);
    }
};

// Chạy test tự động khi file được thực thi bằng Node
runTests();
`;

        // Định nghĩa thư mục lưu trữ (Thư mục 'js' như trong file CI cấu hình)
        const outputDir = path.join(__dirname, 'js');
        if (!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir);
        }

        // Đặt tên file theo định dạng chuẩn: bài_số_slug.js
        const fileName = `${id.padStart(4, '0')}_${slug.replace(/-/g, '_')}.js`;
        const filePath = path.join(outputDir, fileName);

        // Nếu file chưa tồn tại thì mới ghi (tránh ghi đè nếu chạy lại trong ngày)
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, fileContent, 'utf-8');
            console.log(`🎯 Đã tạo thành công file test: ${filePath}`);
        } else {
            console.log(`⚠️ File ${fileName} đã tồn tại từ trước.`);
        }

    } catch (error) {
        console.error("Lỗi trong quá trình cào dữ liệu:", error);
        process.exit(1);
    }
};

runBot();
