const Node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (rootNode) => {
  const insert = (inpVal) => {
    if (rootNode.data == null) {
      rootNode = Node(inpVal);
      return;
    }
    if (inpVal > rootNode.data) {
      if (rootNode.right == null) {
        rootNode.right = Node(inpVal);
      } else {
        insVal(inpVal, rootNode.right);
      }
    }
    if (inpVal < rootNode.data) {
      if (rootNode.left == null) {
        rootNode.left = Node(inpVal);
      } else {
        insVal(inpVal, rootNode.left);
      }
    }
    function insVal(inVal, inNode) {
      if (inVal > inNode.data) {
        if (inNode.right == null) {
          inNode.right = Node(inVal);
        } else {
          insVal(inVal, inNode.right);
        }
      }
      if (inVal < inNode.data) {
        if (inNode.left == null) {
          inNode.left = Node(inVal);
        } else {
          insVal(inVal, inNode.left);
        }
      }
    }
  };

  const find = (inpVal) => {
    if (rootNode.data == null) {
      rootNode = Node(inpVal);
      return "the tree is empty";
    }
    if (rootNode.data == inpVal) {
      return rootNode;
    }
    if (inpVal > rootNode.data) {
      if (rootNode.right == null) {
        return "value not found in the tree";
      } else {
        return findVal(inpVal, rootNode.right);
      }
    }
    if (inpVal < rootNode.data) {
      if (rootNode.left == null) {
        return "value not found in the tree";
      } else {
        return findVal(inpVal, rootNode.left);
      }
    }
    function findVal(inVal, inNode) {
      if (inNode.data == inVal) {
        return inNode;
      }
      if (inVal > inNode.data) {
        if (inNode.right == null) {
          return "value not found in the tree";
        } else {
          return findVal(inVal, inNode.right);
        }
      }
      if (inVal < inNode.data) {
        if (inNode.left == null) {
          return "value not found in the tree";
        } else {
          return findVal(inVal, inNode.left);
        }
      }
    }
  };

  const getParent = (inpNode, parentNode = rootNode) => {
    const inpVal = inpNode.data;
    if (parentNode.data == null) {
      return null;
    }
    if (inpVal == rootNode.data) {
      return null;
    }
    if (inpVal > parentNode.data) {
      if (parentNode.right == null) {
        return null;
      } else if (inpVal == parentNode.right.data) {
        return parentNode;
      } else {
        return getParent(inpNode, parentNode.right);
      }
    }
    if (inpVal < parentNode.data) {
      if (parentNode.left == null) {
        return null;
      } else if (inpVal == parentNode.left.data) {
        return parentNode;
      } else {
        return getParent(inpNode, parentNode.left);
      }
    }
  };

  const getNextBigger = (inpNode, first = true) => {
    if (inpNode.right == null) {
      return null;
    }
    if (first) {
      const rightBranch = inpNode.right;
      if (rightBranch.left == null) {
        return rightBranch.data;
      } else {
        return getNextBigger(rightBranch.left, false);
      }
    } else {
      if (inpNode.left == null) {
        return inpNode.data;
      } else {
        return getNextBigger(inpNode.left, false);
      }
    }
  };

  const delNode = (inpVal) => {
    const nodeToDel = find(inpVal);
    const parentNode = getParent(nodeToDel);
    // If no children, simply remove the node from parent
    if (nodeToDel.right == null && nodeToDel.left == null) {
      if (inpVal < parentNode.data) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    // If node has only one child branch, connect that branch to parent
    else if (
      (nodeToDel.right == null && nodeToDel.left !== null) ||
      (nodeToDel.left == null && nodeToDel.right !== null)
    ) {
      if (inpVal < parentNode.data) {
        if (nodeToDel.left == null) {
          parentNode.left = nodeToDel.right;
        } else {
          parentNode.left = nodeToDel.left;
        }
      } else {
        if (nodeToDel.left == null) {
          parentNode.right = nodeToDel.right;
        } else {
          parentNode.right = nodeToDel.left;
        }
      }
    }
    // If node has both left and right
    else {
      const nextBiggerVal = getNextBigger(nodeToDel);
      delNode(nextBiggerVal);
      nodeToDel.data = nextBiggerVal;
    }
  };

  const levelOrder = (inpFunct) => {
    let treeBuffer = [];
    let outArr = [];
    treeBuffer.push(rootNode);
    lOrder();
    function lOrder() {
      if (treeBuffer.length == 0) {
        return;
      }
      const currNode = treeBuffer.shift();
      if (currNode.left !== null) {
        treeBuffer.push(currNode.left);
      }
      if (currNode.right !== null) {
        treeBuffer.push(currNode.right);
      }
      outArr.push(currNode.data);
      lOrder();
    }
    return outArr.map(inpFunct);
  };

  const inOrder = (inpFunct) => {
    let treeBuffer = [];
    let outArr = [];
    // Always start with root node
    treeBuffer.push(rootNode);
    iOrder();
    function iOrder() {
      if (treeBuffer.length == 0) {
        return;
      }
      // In this case it's a stack (FIFO)
      const currNode = treeBuffer.pop();
      // 1. Try to go deeper into left
      if (currNode.left !== null) {
        treeBuffer.push(currNode.left);
        iOrder();
      }
      // 2. Process 'data'
      outArr.push(currNode.data);
      // 3. Try to go deeper into right
      if (currNode.right !== null) {
        treeBuffer.push(currNode.right);
        iOrder();
      }
    }
    return outArr.map(inpFunct);
  };

  const preOrder = (inpFunct) => {
    let treeBuffer = [];
    let outArr = [];
    // Always start with root node
    treeBuffer.push(rootNode);
    prOrder();
    function prOrder() {
      if (treeBuffer.length == 0) {
        return;
      }
      // In this case it's a stack (FIFO)
      const currNode = treeBuffer.pop();
      // 1. Process 'data'
      outArr.push(currNode.data);
      // 2. Try to go deeper into left
      if (currNode.left !== null) {
        treeBuffer.push(currNode.left);
        prOrder();
      }
      // 3. Try to go deeper into right
      if (currNode.right !== null) {
        treeBuffer.push(currNode.right);
        prOrder();
      }
    }
    return outArr.map(inpFunct);
  };

  const postOrder = (inpFunct) => {
    let treeBuffer = [];
    let outArr = [];
    // Always start with root node
    treeBuffer.push(rootNode);
    pOrder();
    function pOrder() {
      if (treeBuffer.length == 0) {
        return;
      }
      // In this case it's a stack (FIFO)
      const currNode = treeBuffer.pop();
      // 1. Try to go deeper into left
      if (currNode.left !== null) {
        treeBuffer.push(currNode.left);
        pOrder();
      }
      // 2. Try to go deeper into right
      if (currNode.right !== null) {
        treeBuffer.push(currNode.right);
        pOrder();
      }
      // 3. Process 'data'
      outArr.push(currNode.data);
    }
    return outArr.map(inpFunct);
  };

  const height = (inpVal) => {
    let pathHeight = [];
    const inpNode = find(inpVal);
    let counter = 0;
    nHeight(inpNode, counter);
    return Math.max(...pathHeight);
    function nHeight(iNode, counter) {
      if (iNode.left !== null) {
        nHeight(iNode.left, counter + 1);
      }
      if (iNode.right !== null) {
        nHeight(iNode.right, counter + 1);
      }
      if (iNode.left == null && iNode.right == null) {
        pathHeight.push(counter);
      }
    }
  };

  const depth = (inpVal) => {
    let counter = 0;
    const inpNode = find(inpVal);
    return nDepth(inpNode, counter);
    function nDepth(iNode, counter) {
      if (iNode == rootNode) {
        return counter;
      } else {
        return nDepth(getParent(iNode), counter + 1);
      }
    }
  };

  const isBalanced = () => {
    const nodesBalanced = levelOrder(nBalanced);
    return nodesBalanced.every((v) => v === true);

    function nBalanced(inpVal) {
      const iNode = find(inpVal);
      let rHeight = 0;
      let lHeight = 0;
      if (iNode.right !== null) {
        rHeight = 1 + height(iNode.right.data);
      }
      if (iNode.left !== null) {
        lHeight = 1 + height(iNode.left.data);
      }
      console.log(inpVal, lHeight, rHeight);
      if (Math.abs(rHeight - lHeight) > 1) {
        return false;
      } else {
        return true;
      }
    }
  };

  const rebalance = () => {
    const treeValues = inOrder((a) => a);
    //console.log(prettyPrint(rootNode));
    const bTree = buildTree(treeValues);
    rootNode.data = bTree.data;
    rootNode.left = bTree.left;
    rootNode.right = bTree.right;
    //console.log(prettyPrint(rootNode));
  };

  return {
    rootNode,
    insert,
    find,
    delNode,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

function buildTree(inpArr) {
  // Remove any duplicates
  const noDups = [...new Set(inpArr)];
  // Sort the array
  const sortArr = noDups.sort((a, b) => a - b);

  if (sortArr.length == 1) {
    return Node(sortArr[0]);
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
    prettyPrint(node.right, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

const nArr = [1, 5, 4, 3, 8, 34, 5, 3, 18, 31, 13, 2];
//console.log([...new Set(nArr.sort((a, b) => a - b))]);
const tree = buildTree(nArr);
const myTree = Tree(tree);

//console.log(JSON.stringify(myTree.rootNode));
//console.log(prettyPrint(myTree.rootNode));
/* console.log(
  myTree.postOrder((a) => {
    return a;
  })
); */
//console.log(myTree.depth(13));
//console.log(myTree.isBalanced());
//console.log(prettyPrint(myTree.rootNode));
//console.log(myTree.isBalanced());
myTree.insert(19);
myTree.insert(20);
myTree.insert(21);
myTree.insert(22);
//console.log(prettyPrint(myTree.rootNode));
//console.log(myTree.isBalanced());
//console.log(myTree.isBalanced());
//console.log(myTree.height(8));
myTree.rebalance();
//console.log(prettyPrint(myTree.rootNode));
//console.log(myTree.isBalanced());
myTree.insert(35);
console.log(prettyPrint(myTree.rootNode));
console.log(myTree.isBalanced());
//console.log(prettyPrint(myTree.rootNode));
//console.log(myTree.isBalanced());
