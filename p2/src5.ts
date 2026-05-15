class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  private root: TreeNode | null = null;

  insert(value: number): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: TreeNode | null, value: number): TreeNode {
    if (node === null) return new TreeNode(value);
    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);
    return node;
  }

  search(value: number): boolean {
    return this._search(this.root, value);
  }

  private _search(node: TreeNode | null, value: number): boolean {
    if (node === null) return false;
    if (value === node.value) return true;
    if (value < node.value) return this._search(node.left, value);
    return this._search(node.right, value);
  }

  delete(value: number): void {
    this.root = this._delete(this.root, value);
  }

  private _delete(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null;
    if (value < node.value) {
      node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      node.right = this._delete(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      const min = this._findMin(node.right);
      node.value = min;
      node.right = this._delete(node.right, min);
    }
    return node;
  }

  private _findMin(node: TreeNode): number {
    let current: TreeNode = node;
    while (current.left !== null) current = current.left;
    return current.value;
  }

  update(oldValue: number, newValue: number): boolean {
    if (!this.search(oldValue)) return false;
    this.delete(oldValue);
    this.insert(newValue);
    return true;
  }

  height(): number {
    return this._height(this.root);
  }

  private _height(node: TreeNode | null): number {
    if (node === null) return 0;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  inorder(): number[] {
    const result: number[] = [];
    this._inorder(this.root, result);
    return result;
  }

  private _inorder(node: TreeNode | null, result: number[]): void {
    if (node === null) return;
    this._inorder(node.left, result);
    result.push(node.value);
    this._inorder(node.right, result);
  }
}

const bst = new BinarySearchTree();
[5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));

console.log("Дерево:", bst.inorder());        
console.log("Высота:", bst.height());          
console.log("Поиск 4:", bst.search(4));        
console.log("Поиск 9:", bst.search(9));       

bst.delete(3);
console.log("После удаления 3:", bst.inorder()); 

bst.update(7, 10);
console.log("После замены 7→10:", bst.inorder()); 