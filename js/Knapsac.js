// Knapsack Problem Implementation
function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Test Cases
function testKnapsack() {
  const testCases = [
    {
      values: [60, 100, 120],
      weights: [10, 20, 30],
      capacity: 50,
      expected: 220, // Take items with weights 20 and 30.
    },
    {
      values: [10, 20, 30],
      weights: [1, 2, 3],
      capacity: 5,
      expected: 50, // Take items with weights 2 and 3.
    },
    {
      values: [15, 25, 50],
      weights: [5, 10, 15],
      capacity: 20,
      expected: 65, // Take items with weights 10 and 15.
    },
    {
      values: [10, 20],
      weights: [1, 3],
      capacity: 2,
      expected: 10, // Only item 1 fits.
    },
  ];

  let passed = 0;

  testCases.forEach(({ values, weights, capacity, expected }, index) => {
    const result = knapsack(values, weights, capacity);
    if (result === expected) {
      console.log(`Test Case ${index + 1}: Passed`);
      passed++;
    } else {
      console.error(
        `Test Case ${index + 1}: Failed. Expected ${expected}, but got ${result}`
      );
    }
  });

  console.log(`\n${passed}/${testCases.length} test cases passed.`);
}

// Run Tests
testKnapsack();
