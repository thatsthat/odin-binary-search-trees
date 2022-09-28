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
        return Node(rightBranch.data);
      } else {
        return getNextBigger(rightBranch.left, false);
      }
    } else {
      if (inpNode.left == null) {
        return Node(inpNode.data);
      } else {
        return getNextBigger(inpNode.left, false);
      }
    }
  };

  const delNode = (inpVal) => {
    if (rootNode.data == null) {
      rootNode = Node(inpVal);
      return "the tree is empty";
    }
    if (rootNode.data == inpVal) {
      return rootNode; // Delete this node
    }
    if (inpVal > rootNode.data) {
      if (rootNode.right == null) {
        return "value not found in the tree";
      } else {
        return delVal(inpVal, rootNode.right);
      }
    }
    if (inpVal < rootNode.data) {
      if (rootNode.left == null) {
        return "value not found in the tree";
      } else {
        return delVal(inpVal, rootNode.left);
      }
    }
    function delVal(inVal, inNode) {
      if (inNode.data == inVal) {
        return inNode; // Delete this node
      }
      if (inVal > inNode.data) {
        if (inNode.right == null) {
          return "value not found in the tree";
        } else {
          return delVal(inVal, inNode.right);
        }
      }
      if (inVal < inNode.data) {
        if (inNode.left == null) {
          return "value not found in the tree";
        } else {
          return delVal(inVal, inNode.left);
        }
      }
    }
  };

  return {
    rootNode,
    insert,
    find,
    delNode,
    getNextBigger,
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
//console.log([...new Set(nArr.sort((a, b) => a - b))]);
const tree = buildTree(nArr);
const myTree = Tree(tree);

//console.log(JSON.stringify(myTree.rootNode));
console.log(prettyPrint(myTree.getNextBigger(myTree.find(31))));
