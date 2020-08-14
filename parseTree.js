function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

export async function bfs(treeData, fn) {
  let queue = [treeData];
  while (queue.length) {
    await sleep(1000);
    fn(queue);
    let current = queue.shift();
    if (current.children && current.children.length > 0) {
      queue = queue.concat(current.children);
    }
  }
}

export async function dfs(treeData, fn) {
  let stack = [JSON.parse(JSON.stringify(treeData))];
  let set = new Set();
  let n = 0;
  while (stack.length) {
    await sleep(1000);
    fn(stack);
    let current = stack[stack.length - 1];
    set.add(current);
    if (current.children && current.children.length > 0) {
      if (!set.has(current.children[0])) {
        stack.push(current.children[0]);
      } else {
        current.children.shift();
        if (current.children[0]) {
          stack.push(current.children[0]);
        } else {
          stack.pop();
        }
      }
    } else {
      stack.pop();
    }
  }
}
