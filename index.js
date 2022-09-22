const Node = (value = null, left = null, right = null) => {
  return { value, left, right };
};

const iArr = [1, 2, 3, 4, 5, 6];
let mid = (iArr.length - (iArr.length % 2)) / 2;
const top = iArr[mid - 1];
const left = iArr.slice(0, mid - 1);
const right = iArr.slice(mid);
console.log(iArr, top, left, right);
