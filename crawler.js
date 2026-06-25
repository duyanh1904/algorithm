const fs = require('fs').promises;
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    GRAPHQL_URL: 'https://leetcode.com/graphql',
    OUTPUT_DIR: 'js',
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    TIMEOUT: 30000,
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000
};

// Enhanced HTTP request with retry logic and timeout
const postRequest = (url, data, retries = CONFIG.MAX_RETRIES) => {
    return new Promise((resolve, reject) => {
        const makeRequest = (attempt) => {
            const urlObj = new URL(url);
            const jsonData = JSON.stringify(data);
            
            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname + urlObj.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(jsonData),
                    'User-Agent': CONFIG.USER_AGENT,
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate, br'
                },
                timeout: CONFIG.TIMEOUT
            };

            const req = https.request(options, (res) => {
                let responseData = '';
                
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(responseData);
                        if (parsed.errors) {
                            reject(new Error(`GraphQL Error: ${JSON.stringify(parsed.errors)}`));
                        } else {
                            resolve(parsed);
                        }
                    } catch (e) {
                        reject(new Error(`Failed to parse response: ${e.message}`));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.on('error', (err) => {
                if (attempt < retries) {
                    console.log(`Retry ${attempt + 1}/${retries} after error: ${err.message}`);
                    setTimeout(() => makeRequest(attempt + 1), CONFIG.RETRY_DELAY);
                } else {
                    reject(new Error(`Request failed after ${retries} attempts: ${err.message}`));
                }
            });

            req.write(jsonData);
            req.end();
        };

        makeRequest(0);
    });
};

// Improved test case extraction with better regex patterns
const parseTestCasesFromContent = (htmlContent) => {
    const testCases = [];
    
    // Clean HTML and extract pre content
    const cleanHtml = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    
    // Pattern for example blocks
    const examplePattern = /Example\s*\d+:.*?Input:\s*([\s\S]*?)(?=Output:)/gi;
    const outputPattern = /Output:\s*([\s\S]*?)(?=(Example\s*\d+:|Explanation:|$))/gi;
    
    let exampleMatch;
    let index = 1;
    
    // Try to find examples with Input/Output pattern
    const inputMatches = [...cleanHtml.matchAll(/Input:\s*([\s\S]*?)(?=Output:|$)/gi)];
    const outputMatches = [...cleanHtml.matchAll(/Output:\s*([\s\S]*?)(?=Example\s*\d+:|Explanation:|$)/gi)];
    
    // Process matches in pairs
    const minLength = Math.min(inputMatches.length, outputMatches.length);
    for (let i = 0; i < minLength; i++) {
        const inputStr = inputMatches[i][1].trim();
        const outputStr = outputMatches[i][1].trim();
        
        if (inputStr && outputStr) {
            testCases.push({
                name: `Example ${index++}`,
                rawInput: inputStr,
                rawOutput: outputStr
            });
        }
    }
    
    // If no examples found, try alternative extraction
    if (testCases.length === 0) {
        const codeBlocks = htmlContent.match(/<pre>([\s\S]*?)<\/pre>/g) || [];
        let tempInput = null;
        let tempOutput = null;
        
        for (const block of codeBlocks) {
            const cleanBlock = block.replace(/<[^>]*>/g, '').trim();
            
            if (cleanBlock.includes('Input:')) {
                const inputPart = cleanBlock.match(/Input:\s*([\s\S]*?)(?=Output:|$)/);
                if (inputPart) tempInput = inputPart[1].trim();
            }
            
            if (cleanBlock.includes('Output:')) {
                const outputPart = cleanBlock.match(/Output:\s*([\s\S]*?)(?=Explanation:|$)/);
                if (outputPart) tempOutput = outputPart[1].trim();
            }
            
            if (tempInput && tempOutput) {
                testCases.push({
                    name: `Example ${index++}`,
                    rawInput: tempInput,
                    rawOutput: tempOutput
                });
                tempInput = null;
                tempOutput = null;
            }
        }
    }
    
    return testCases;
};

// Enhanced value formatting with better type detection
const formatJsValue = (valStr) => {
    if (!valStr || valStr === 'null') return 'null';
    if (valStr === 'true' || valStr === 'false') return valStr;
    if (!isNaN(valStr) && valStr.trim() !== '') return valStr;
    
    // Handle multiple parameters with assignment
    if (valStr.includes('=') && !valStr.includes('==')) {
        const objResult = {};
        const pairs = valStr.split(/,\s*(?=[a-zA-Z0-9_]+\s*=)/);
        pairs.forEach(p => {
            const parts = p.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const val = parts.slice(1).join('=').trim();
                try {
                    objResult[key] = JSON.parse(val.replace(/'/g, '"'));
                } catch {
                    objResult[key] = val;
                }
            }
        });
        return JSON.stringify(objResult);
    }
    
    // Handle arrays and objects
    try {
        return JSON.stringify(JSON.parse(valStr.replace(/'/g, '"')));
    } catch {
        // Handle strings
        return `"${valStr.replace(/"/g, '\\"')}"`;
    }
};

// Generate test runner with better error handling
const generateTestRunner = (functionCode, mainFunctionName, testCases, title) => {
    let testCasesCodeStr = testCases.map((t, i) => {
        return `    {\n        name: "${t.name}",\n        input: ${formatJsValue(t.rawInput)},\n        expected: ${formatJsValue(t.rawOutput)}\n    }`;
    }).join(',\n');

    return `/**
 * LeetCode Daily Challenge
 * Title: ${title}
 * Generated: ${new Date().toISOString().split('T')[0]}
 * URL: https://leetcode.com/problems/${title.toLowerCase().replace(/ /g, '-')}/
 */

${functionCode}

// ==========================================
// TEST RUNNER
// ==========================================
const runTests = () => {
    const testCases = [
${testCasesCodeStr}
    ];

    console.log(\`\\n🧪 Running tests for: ${title}\\n\`);
    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        try {
            let result;
            if (test.input && typeof test.input === 'object' && !Array.isArray(test.input)) {
                result = ${mainFunctionName}(...Object.values(test.input));
            } else {
                result = ${mainFunctionName}(test.input);
            }

            const passed_ = JSON.stringify(result) === JSON.stringify(test.expected);
            
            if (passed_) {
                console.log(\`✅ Test \${index + 1}: \${test.name}\`);
                passed++;
            } else {
                console.log(\`❌ Test \${index + 1}: \${test.name}\`);
                console.log(\`   Expected: \${JSON.stringify(test.expected)}\`);
                console.log(\`   Got:      \${JSON.stringify(result)}\`);
                failed++;
            }
        } catch (error) {
            console.log(\`💥 Test \${index + 1}: \${test.name} - Error\`);
            console.log(\`   \${error.message}\`);
            failed++;
        }
    });

    console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
    return failed === 0;
};

// Run tests if this file is executed directly
if (require.main === module) {
    const success = runTests();
    process.exit(success ? 0 : 1);
}

module.exports = { ${mainFunctionName} };
`;
};

// Main function with better error handling and GitHub integration
const runBot = async () => {
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
        console.log('🔄 Fetching LeetCode daily challenge...');
        const response = await postRequest(CONFIG.GRAPHQL_URL, query);
        
        if (!response.data?.activeDailyCodingChallengeQuestion?.question) {
            throw new Error('Invalid response structure from LeetCode');
        }

        const question = response.data.activeDailyCodingChallengeQuestion.question;
        const { questionFrontendId: id, title, titleSlug: slug, difficulty, content, codeSnippets } = question;

        // Get JavaScript snippet
        const jsSnippet = codeSnippets.find(snip => snip.lang === 'JavaScript') || 
                         codeSnippets.find(snip => snip.lang === 'Javascript');
        
        let functionCode = jsSnippet?.code || 'function solve() { return null; }';
        
        // Extract function name
        const functionNameMatch = functionCode.match(/(?:var|const|let|function)\s+([a-zA-Z0-9_]+)\s*[=\(]/);
        const mainFunctionName = functionNameMatch ? functionNameMatch[1] : 'solve';

        // Parse test cases
        const testCases = parseTestCasesFromContent(content);
        
        if (testCases.length === 0) {
            console.warn('⚠️ No test cases found in problem description');
        } else {
            console.log(`✅ Found ${testCases.length} test cases`);
        }

        // Generate file content
        const fileContent = generateTestRunner(functionCode, mainFunctionName, testCases, title);
        
        // Create output directory
        const outputDir = path.join(__dirname, CONFIG.OUTPUT_DIR);
        await fs.mkdir(outputDir, { recursive: true });

        // Generate filename
        const paddedId = id.padStart(4, '0');
        const slugifiedTitle = slug.replace(/-/g, '_');
        const fileName = `${paddedId}_${slugifiedTitle}.js`;
        const filePath = path.join(outputDir, fileName);

        // Check if file exists
        try {
            await fs.access(filePath);
            console.log(`⚠️ File already exists: ${fileName}`);
        } catch {
            await fs.writeFile(filePath, fileContent, 'utf-8');
            console.log(`✅ Created: ${fileName}`);
            
            // Optional: Git operations if in a git repo
            try {
                execSync(`git add "${filePath}"`, { stdio: 'pipe' });
                console.log(`📝 Added to git staging`);
            } catch (gitError) {
                // Not in git repo, skip
            }
        }

        console.log(`\n📋 Problem: ${id}. ${title} (${difficulty})`);
        console.log(`🔗 https://leetcode.com/problems/${slug}/`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (process.env.GITHUB_ACTIONS) {
            console.error('💥 GitHub Actions: Failing build due to error');
            process.exit(1);
        }
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    runBot().catch(() => process.exit(1));
}

module.exports = { runBot, postRequest, parseTestCasesFromContent };
