const fs = require('fs');
const https = require('https');
const path = require('path');

// Hàm gửi request POST (GraphQL) lên LeetCode
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
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

// Hàm trích xuất tự động các Ví dụ (Examples) từ đề bài để làm Test Cases
const parseTestCasesFromContent = (htmlContent) => {
    const testCases = [];
    // Tìm các đoạn text nằm trong thẻ <pre> (Nơi LeetCode chứa Input/Output mẫu)
    const preRegex = /<pre>([\s\S]*?)<\/pre>/g;
    let match;
    let index = 1;

    while ((match = preRegex.exec(htmlContent)) !== null) {
        const preText = match[1].replace(/<[^>]*>/g, ''); // Xóa bỏ các thẻ HTML thừa
        
        // Dùng Regex bóc tách dòng Input và Output
        const inputMatch = preText.match(/Input:\s*([\s\S]*?)(?=\nOutput:|$)/);
        const outputMatch = preText.match(/Output:\s*([\s\S]*?)(?=\nExplanation:|\n\s*|$)/);

        if (inputMatch && outputMatch) {
            let inputStr = inputMatch[1].trim();
            let outputStr = outputMatch[1].trim();

            testCases.push({
                name: `Ví dụ ${index++}`,
                rawInput: inputStr,
                rawOutput: outputStr
            });
        }
    }
    return testCases;
};

// Hàm xử lý chuỗi đầu vào/đầu ra để chuyển về dạng Object/Mảng/Ký tự trong JS
const formatJsValue = (valStr) => {
    if (!valStr) return "undefined";
    // Nếu có dạng gán biến nhiều tham số kiểu "s = 'abc', minJump = 2"
    if (valStr.includes('=')) {
        const objResult = {};
        const pairs = valStr.split(/,\s*(?=[a-zA-Z0-9_]+\s*=)/);
        pairs.forEach(p => {
            const parts = p.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const val = parts.slice(1).join('=').trim();
                try { objResult[key] = JSON.parse(val.replace(/'/g, '"')); } 
                catch { objResult[key] = val; }
            }
        });
        return JSON.stringify(objResult, null, 4);
    }
    // Trường hợp là một giá trị đơn lẻ (mảng, số, chuỗi)
    try { return JSON.stringify(JSON.parse(valStr.replace(/'/g, '"')), null, 4); } 
    catch { return `"${valStr}"`; }
};

const runBot = async () => {
    const graphqlUrl = 'https://leetcode.com/graphql';
    
    // Query lấy thông tin chi tiết bài Daily bao gồm cả nội dung và code mẫu JavaScript
    const query = {
        query: `
            query questionOfToday {
                activeDailyCodingChallengeQuestion {
                    question {
                        questionFrontendId
                        title
                        titleSlug
                        difficulty
                        content
                        codeSnippets {
                            lang
                            code
                        }
                    }
                }
            }
        `
    };

    try {
        console.log("Đang cào dữ liệu giải thuật từ LeetCode...");
        const response = await postRequest(graphqlUrl, query);
        const question = response.data.activeDailyCodingChallengeQuestion.question;

        const id = question.questionFrontendId;
        const title = question.title;
        const slug = question.titleSlug;
        const difficulty = question.difficulty;
        
        // Lấy đoạn code mẫu JavaScript mà LeetCode cung cấp sẵn
        const jsSnippet = question.codeSnippets.find(snip => snip.lang === 'JavaScript');
        let functionCode = jsSnippet ? jsSnippet.code : `const solveLeetCodeQuestion = (input) => { return input; };`;

        // Đổi tên hàm từ mẫu của LeetCode thành hàm thống nhất hoặc giữ nguyên tùy bạn
        // Ở đây ta trích xuất tên hàm gốc của LeetCode để tí nữa Unit Test gọi chính xác tên đó
        const functionNameMatch = functionCode.match(/(?:var|const|let)\s+([a-zA-Z0-9_]+)\s*=/);
        const mainFunctionName = functionNameMatch ? functionNameMatch[1] : "solveLeetCodeQuestion";

        // Tự động bóc tách sinh Test Cases
        const parsedTests = parseTestCasesFromContent(question.content);
        
        // Xây dựng chuỗi văn bản cho mảng testCases trong file JS
        let testCasesCodeStr = "";
        parsedTests.forEach(t => {
            testCasesCodeStr += `        {\n            name: "${t.name}",\n            input: ${formatJsValue(t.rawInput)},\n            expected: ${formatJsValue(t.rawOutput)}\n        },\n`;
        });

        // Tạo cấu trúc File hoàn chỉnh tự động
        const fileContent = `/**
 * LeetCode Daily Challenge
 * ID: ${id}
 * Title: ${title}
 * Difficulty: ${difficulty}
 * URL: https://leetcode.com/problems/${slug}/
 */

${functionCode}

// ==========================================
// TRÌNH CHẠY UNIT TEST TỰ ĐỘNG BẰNG JS THUẦN
// ==========================================
const runTests = () => {
    const testCases = [
${testCasesCodeStr}
    ];

    let passedCount = 0;
    console.log(\`=== RUNNING TESTS FOR: ${title} ===\`);

    testCases.forEach((test, index) => {
        let actual;
        // Kiểm tra xem input là một Object nhiều tham số hay chỉ là một giá trị đơn lẻ
        if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
            // Truyền các thuộc tính của object làm các đối số tương ứng của hàm
            actual = ${mainFunctionName}(...Object.values(test.input));
        } else {
            actual = ${mainFunctionName}(test.input);
        }

        // Hỗ trợ so sánh cả mảng hoặc object bằng cách chuyển về chuỗi JSON
        const isPassed = JSON.stringify(actual) === JSON.stringify(test.expected);

        if (isPassed) {
            console.log(\`✅ Test #\${index + 1} PASSED: \${test.name}\`);
            passedCount++;
        } else {
            console.error(\`❌ Test #\${index + 1} FAILED: \${test.name}\`);
            console.error(\`   - Expected:\`, test.expected);
            console.error(\`   - Actual:\`, actual);
        }
    });

    console.log("-----------------------------------------");
    if (passedCount !== testCases.length) {
        console.error(\`Kết quả: Thất bại \${testCases.length - passedCount}/\${testCases.length} bài test.\`);
        // Chú ý: Ta không exit(1) ở đây vì file mới cào về chưa có logic giải thuật bên trong (đang rỗng) 
        // nên test mẫu chắc chắn sẽ fail, tránh làm sập luồng GitHub Actions khi cào bài mới.
    } else {
        console.log(\`Kết quả: Tuyệt vời! Vượt qua tất cả \${passedCount}/\${testCases.length} bài test.\`);
    }
};

runTests();
`;

        const outputDir = path.join(__dirname, 'js');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const fileName = `${id.padStart(4, '0')}_${slug.replace(/-/g, '_')}.js`;
        const filePath = path.join(outputDir, fileName);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, fileContent, 'utf-8');
            console.log(`🎯 Đã tự động sinh file hoàn chỉnh: ${fileName}`);
        } else {
            console.log(`⚠️ Bài hôm nay đã được tạo từ trước.`);
        }

    } catch (error) {
        console.error("Lỗi vận hành hệ thống:", error);
        process.exit(1);
    }
};

runBot();
