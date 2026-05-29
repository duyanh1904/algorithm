/**
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    // Structural check: both are null
    if (p === null && q === null) return true;
    
    // Structural check: one is null, or values misaligned
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    
    // Recursively check left and right subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// --- TEST HARNESS ---
function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASSED: ${testName}`);
    } else {
        console.error(`❌ FAILED: ${testName} | Expected: ${expected}, Got: ${actual}`);
    }
}

// --- RUN TESTS ---
console.log("Running Same Tree Tests...\n");

// Example 1: Structurally identical and same values
//     1         1
//    / \       / \
//   2   3     2   3
const tree1_p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree1_q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
assertEqual(isSameTree(tree1_p, tree1_q), true, "Example 1: Structurally identical trees");


// Example 2: Structurally different
//     1         1
//    /           \
//   2             2
const tree2_p = new TreeNode(1, new TreeNode(2));
const tree2_q = new TreeNode(1, null, new TreeNode(2));
assertEqual(isSameTree(tree2_p, tree2_q), false, "Example 2: Structurally different trees");


// Example 3: Same structure, different values
//     1         1
//    / \       / \
//   2   1     1   2
const tree3_p = new TreeNode(1, new TreeNode(2), new TreeNode(1));
const tree3_q = new TreeNode(1, new TreeNode(1), new TreeNode(2));
assertEqual(isSameTree(tree3_p, tree3_q), false, "Example 3: Same structure, different values");


// Edge Case 1: Both trees are completely empty
assertEqual(isSameTree(null, null), true, "Edge Case: Both trees are empty");


// Edge Case 2: One tree is empty, one is not
const singleNodeTree = new TreeNode(1);
assertEqual(isSameTree(singleNodeTree, null), false, "Edge Case: One tree empty, one active");
