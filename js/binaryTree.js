function Node(
    value,
    left = null,
    right = null,
    parent = "",
    children = [],
    height = 1,
) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;
    this.height = height;
}

function createTree(arr) {
    if (arr.length === 0) {
        document.getElementById("inp").value = "";

    };

    let root = arr[0];
    for (let i = 1; i < arr.length; i++) {
        root = nodeDirection(root, arr[i]);
    }

    createData(root);
    remove();
    try {
        drawGraph([root]); // Pass the root to the drawGraph function
    } catch {
        console.log("No Input");
    }
}
function remove() {
    let graph = document.querySelector("svg");
    if (graph) {
        graph.parentElement.removeChild(graph);
    }
}
function nodeDirection(root, node) {
    let a = Number(node.value);
    let b = Number(root.value);

    console.log(`Inserting node ${a} into tree with root ${b}`);

    if (a < b) {
        if (root.left == null) {
            root.left = node;
            node.isLeft = true;
        } else {
            root.left = nodeDirection(root.left, node);
        }
    } else if (a > b) {
        if (root.right == null) {
            root.right = node;
            node.isRight = true;
        } else {
            root.right = nodeDirection(root.right, node);
        }
    }

    root = balance(root);

    console.log(`root: ${root}`)
    return root;
}

function createData(node) {
    if (node == null) {
        return;
    }

    if (node.left) {
        node.children.push(node.left);
        node.left.parent = node;
        if (!node.right) {
            let newNode = new Node("Empty", null, null);
            newNode.isRight = true;
            node.children.push(newNode);
            newNode.parent = node;
        }
    }

    if (node.right) {
        node.children.push(node.right);
        node.right.parent = node;
        if (!node.left) {
            let newNode = new Node("Empty", null, null);
            newNode.isLeft = true;
            node.children.unshift(newNode);
            newNode.parent = node;
        }
    }

    createData(node.left);
    createData(node.right);
}

function createNodes(list) {
    let new_list = [];

    for (let i = 0; i < list.length; i++) {
        if (list[i] == "") {
            continue;
        }
        new_list.push(new Node(list[i], null, null));
    }

    createTree(new_list);
    return new_list;
}
