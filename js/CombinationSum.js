// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.
// You may return the combinations in any order.
//
// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
//
// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
//
//     Example 1:
//
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
//     2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
//     Example 2:
//
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:
//
// Input: candidates = [2], target = 1
// Output: []
//
// Constraints:
// 1 <= candidates.length <= 30
// 2 <= candidates[i] <= 40
// All elements of candidates are distinct.
// 1 <= target <= 40

function testCombinationSum() {
    let testResults = [];
    let passedCount = 0;
    let totalTests = 4;

    // Helper function to sort combinations for comparison
    const sortCombinations = (combinations) => {
        return combinations.map(combo => combo.sort((a, b) => a - b))
            .sort((a, b) => a.join() > b.join() ? 1 : -1);
    };

    // Helper debug function to print detailed info
    const debugInfo = (testNum, input, target, expected, actual) => {
        console.log(`\nDebug Test ${testNum}:`);
        console.log(`Input: candidates = [${input}], target = ${target}`);
        console.log(`Expected: [${expected.map(arr => `[${arr}]`).join(',')}]`);
        console.log(`Got: [${actual.map(arr => `[${arr}]`).join(',')}]`);
    };

    // Test case 1: candidates = [2,3,6,7], target = 7
    let candidates1 = [2,3,6,7];
    let target1 = 7;
    let expected1 = [[2,2,3],[7]];
    const r1 = combinationSum(candidates1, target1);
    let test1Passed = JSON.stringify(sortCombinations(r1)) === JSON.stringify(sortCombinations(expected1));
    testResults.push({
        test: 1,
        passed: test1Passed,
        expected: expected1,
        got: r1
    });
    if (test1Passed) passedCount++;
    else debugInfo(1, candidates1, target1, expected1, r1);

    // Test case 2: candidates = [2,3,5], target = 8
    let candidates2 = [2,3,5];
    let target2 = 8;
    let expected2 = [[2,2,2,2],[2,3,3],[3,5]];
    const r2 = combinationSum(candidates2, target2);
    let test2Passed = JSON.stringify(sortCombinations(r2)) === JSON.stringify(sortCombinations(expected2));
    testResults.push({
        test: 2,
        passed: test2Passed,
        expected: expected2,
        got: r2
    });
    if (test2Passed) passedCount++;
    else debugInfo(2, candidates2, target2, expected2, r2);

    // Test case 3: candidates = [2], target = 1
    let candidates3 = [2];
    let target3 = 1;
    let expected3 = [];
    const r3 = combinationSum(candidates3, target3);
    let test3Passed = JSON.stringify(sortCombinations(r3)) === JSON.stringify(sortCombinations(expected3));
    testResults.push({
        test: 3,
        passed: test3Passed,
        expected: expected3,
        got: r3
    });
    if (test3Passed) passedCount++;
    else debugInfo(3, candidates3, target3, expected3, r3);

    // Test case 4: candidates = [2,3], target = 5
    let candidates4 = [2,3];
    let target4 = 5;
    let expected4 = [[2,3]];
    const r4 = combinationSum(candidates4, target4);
    let test4Passed = JSON.stringify(sortCombinations(r4)) === JSON.stringify(sortCombinations(expected4));
    testResults.push({
        test: 4,
        passed: test4Passed,
        expected: expected4,
        got: r4
    });
    if (test4Passed) passedCount++;
    else debugInfo(4, candidates4, target4, expected4, r4);

    // Print results
    console.log("\nTest Results:");
    testResults.forEach(result => {
        if (result.passed) {
            console.log(`Test ${result.test}: PASSED`);
        } else {
            console.log(`Test ${result.test}: FAILED`);
        }
    });

    console.log(`\nSummary: ${passedCount} out of ${totalTests} tests passed`);
    console.log(passedCount === totalTests ?
        "All tests passed successfully!" :
        "Some tests failed. Check debug info above for details.");
}

// Placeholder implementation for testing
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, target, current) {
        if (target === 0) {
            result.push([...current]);
            return;
        }
        if (target < 0) return;

        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, target - candidates[i], current);
            current.pop();
        }
    }

    backtrack(0, target, []);
    return result;
}

// Run the tests
testCombinationSum();