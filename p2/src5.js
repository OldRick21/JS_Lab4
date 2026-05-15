"use strict";
class TreeNode {
    value;
    left = null;
    right = null;
    constructor(value) {
        this.value = value;
    }
}
class BinarySearchTree {
    root = null;
    insert(value) {
        this.root = this._insert(this.root, value);
    }
    _insert(node, value) {
        if (node === null)
            return new TreeNode(value);
        if (value < node.value)
            node.left = this._insert(node.left, value);
        else if (value > node.value)
            node.right = this._insert(node.right, value);
        return node;
    }
    search(value) {
        return this._search(this.root, value);
    }
    _search(node, value) {
        if (node === null)
            return false;
        if (value === node.value)
            return true;
        if (value < node.value)
            return this._search(node.left, value);
        return this._search(node.right, value);
    }
    delete(value) {
        this.root = this._delete(this.root, value);
    }
    _delete(node, value) {
        if (node === null)
            return null;
        if (value < node.value) {
            node.left = this._delete(node.left, value);
        }
        else if (value > node.value) {
            node.right = this._delete(node.right, value);
        }
        else {
            if (node.left === null)
                return node.right;
            if (node.right === null)
                return node.left;
            const min = this._findMin(node.right);
            node.value = min;
            node.right = this._delete(node.right, min);
        }
        return node;
    }
    _findMin(node) {
        let current = node;
        while (current.left !== null)
            current = current.left;
        return current.value;
    }
    update(oldValue, newValue) {
        if (!this.search(oldValue))
            return false;
        this.delete(oldValue);
        this.insert(newValue);
        return true;
    }
    height() {
        return this._height(this.root);
    }
    _height(node) {
        if (node === null)
            return 0;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }
    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }
    _inorder(node, result) {
        if (node === null)
            return;
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
