// 1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246.
//
// Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681.
//
// The sum of these squares is 84100 which is 290 * 290.
//
// Task
// Find all integers between m and n (m and n are integers with 1 <= m <= n) such that the sum of their squared divisors is itself a square.
//
//   We will return an array of subarrays or of tuples (in C an array of Pair) or a string.
//
//   The subarrays (or tuples or Pairs) will have two elements: first the number the squared divisors of which is a square and then the sum of the squared divisors.
//
//   Example:
// m =  1, n = 250 --> [[1, 1], [42, 2500], [246, 84100]]
// m = 42, n = 250 --> [[42, 2500], [246, 84100]]
// The form of the examples may change according to the language, see "Sample Tests".
//
//   Note
// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

// Main solution
function isPerfectSquare(num) {
  const sqrt = Math.floor(Math.sqrt(num));
  return sqrt * sqrt === num;
}

function getDivisors(num) {
  const divisors = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i !== num / i) { // Avoid duplicates for perfect squares
        divisors.push(num / i);
      }
    }
  }
  return divisors;
}

function solve(m, n) {
  const result = [];

  for (let num = m; num <= n; num++) {
    const divisors = getDivisors(num);
    const sumOfSquares = divisors.reduce((sum, x) => sum + x * x, 0);

    if (isPerfectSquare(sumOfSquares)) {
      result.push([num, sumOfSquares]);
    }
  }

  return result;
}

// Test functions
function runTests() {
  console.log("Running tests...");

  // Test case 1: Range 1 to 250
  const test1 = solve(1, 250);
  const expected1 = [[1, 1], [42, 2500], [246, 84100]];
  console.assert(JSON.stringify(test1) === JSON.stringify(expected1),
    "Test 1 failed: Expected", expected1, "but got", test1);

  // Test case 2: Range 42 to 250
  const test2 = solve(42, 250);
  const expected2 = [[42, 2500], [246, 84100]];
  console.assert(JSON.stringify(test2) === JSON.stringify(expected2),
    "Test 2 failed: Expected", expected2, "but got", test2);

  // Test case 3: Single number range
  const test3 = solve(1, 1);
  const expected3 = [[1, 1]];
  console.assert(JSON.stringify(test3) === JSON.stringify(expected3),
    "Test 3 failed: Expected", expected3, "but got", test3);

  // Test case 4: Empty result range
  const test4 = solve(2, 5);
  const expected4 = [];
  console.assert(JSON.stringify(test4) === JSON.stringify(expected4),
    "Test 4 failed: Expected", expected4, "but got", test4);

  // Test case 5: Verify specific number (42)
  const test5 = solve(42, 42);
  const expected5 = [[42, 2500]];
  console.assert(JSON.stringify(test5) === JSON.stringify(expected5),
    "Test 5 failed: Expected", expected5, "but got", test5);

  console.log("All tests completed!");
}

// Run the tests
runTests();

// Example usage
console.log(solve(1, 250));  // [[1, 1], [42, 2500], [246, 84100]]
console.log(solve(42, 250)); // [[42, 2500], [246, 84100]]
