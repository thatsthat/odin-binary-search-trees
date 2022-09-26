const Node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (rootNode) => {
  const insert = (inpVal) => {
    function insVal(inVal, inNode) {}
  };

  return {
    rootNode,
    insert,
  };
};

function buildTree(inpArr) {
  // Remove any duplicates
  const noDups = [...new Set(inpArr)];
  // Sort the array
  const sortArr = noDups.sort((a, b) => a - b);

  if (sortArr.length == 1) {
    return Node(sortArr);
  }

  if (sortArr.length == 2) {
    return Node(sortArr[0], null, Node(sortArr[1]));
  }

  const mid = (sortArr.length - (sortArr.length % 2)) / 2;
  const top = sortArr[mid];
  const left = sortArr.slice(0, mid);
  const right = sortArr.slice(mid + 1);

  return Node(top, buildTree(left), buildTree(right));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const nArr = [1, 5, 4, 3, 8, 34, 5, 3, 18, 31, 13, 2];
const tree = buildTree(nArr);
const myTree = Tree(tree);
console.log(JSON.stringify(myTree.rootNode));
//console.log(prettyPrint(myTree.rootNode));
//console.log([...new Set(nArr.sort((a, b) => a - b))]);

/* const uArr = [...new Set(nArr)];
const iArr = uArr.sort((a, b) => a - b);
const mid = (iArr.length - (iArr.length % 2)) / 2;
const top = iArr[mid];
const left = iArr.slice(0, mid);
const right = iArr.slice(mid + 1);
console.log(left, top, right); */
