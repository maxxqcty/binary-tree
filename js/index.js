const output = document.getElementById("tree");

function getInput() {
    const value = document.getElementById("inp").value;
    let arr = value.split(" ");
    let num = [];

    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) && arr[i] != "\n") {
            num.push(arr[i]);
        }
    }
    return num;
}

function action() {
    getRoot();
    const el = document.querySelector("#tree")
}

function getRoot() {
    let result = getInput();

    let root = createNodes(result);
    return root;
}

function clear(el) {
    let allContainers = document.querySelectorAll(".numContainer");
    let inp = document.getElementById("inp");

    inp.value += "";

    allContainers.forEach((item) => {
        if (item != el) {
            item.style.transform = "scale(0.9)";
            item.style.opacity = 0.7;
        } else {
            item.style.transform = "scale(1.1)";
            item.style.opacity = 1;
        }
    });
}

function toggleLock() {
    let btn = document.querySelector(".btn");
    let inp = document.getElementById("inp");
    let btn_click = document.querySelector(".btn-clear");
    let cont = document.querySelector(".findContainer");

    if (btn.innerHTML == "FIND NODE") {
        btn.innerHTML = "BACK";
        clearAndCreate();
    } else {
        cont.innerHTML = "";
        inp.style.display = "block";
        btn_click.style.display = "none";
        btn.innerHTML = "FIND NODE";

        let circles = document.querySelectorAll(".node");
        let links = document.querySelectorAll(".link");
        links.forEach((link) => {
            link.style.stroke = "";
        });
        circles.forEach((circle, i) => {
            setTimeout(() => {
                circle.firstChild.classList.remove("green");
                circle.firstChild.classList.remove("gold");
                circle.firstChild.classList.remove("red");
            }, i * 100);
        });
        hidePathDisplay();
    }
}

function clearAndCreate() {
    let inp = document.getElementById("inp");
    let btn_click = document.querySelector(".btn-clear");
    let cont = document.querySelector(".findContainer");
    document.querySelector(".findContainer").innerHTML = "";

    let result = getInput();
    result = result.filter((item) => item !== "");

    result = [...new Set(result)];

    if (result.length > 0) {
        inp.style.display = "none";
        btn_click.style.display = "block";
    }

    result.forEach((circle) => {
        let root = getRoot()[0];
        let el = document.createElement("button");
        el.classList.add("numContainer");
        el.innerHTML = circle;
        el.style.transition = "1s";
        el.onclick = function () {
            clear(el);
            findTheNode(root, el);
        };
        cont.appendChild(el);
    });

    hidePathDisplay();
}
function findTheNode(root, node, path = "", direction = "") {
    let value = parseFloat(node.innerHTML);
    console.log(root);
    let links = document.querySelectorAll(".link");
    links.forEach((link) => {
        link.style.stroke = "";
    });
    // Highlight the current node
    fillToColor(root.value, root.value == value ? "green" : "gold");
console.log(root.value);
    // Append current node to the path
    if (path === "") {
        path = "Root [" + root.value + "]";
    } else {
        path += " >> " + direction + " [" + root.value + "]";
    }

    if (root.value == value) {
        // If the root matches the search value, display the path
        displayPath(path, root);
        return;
    }

    // Traverse the tree based on the search value
    if (root.value > value) {
        findTheNode(
            root.left,
            node,
            path, // Pass the updated path
            "Left"
        );
    } else {
        findTheNode(
            root.right,
            node,
            path, // Pass the updated path
            "Right"
        );
    }
}

function displayPath(path, node) {
    // Display the path in the pathDisplay element
    let pathDisplay = document.getElementById("pathDisplay");
    pathDisplay.textContent = "Node Path: " + path;

    // Highlight the links (paths) in the displayed path
    let pathNodes = path.split(" >> ");
    pathNodes.forEach((pathNode) => {
        let nodeValue = pathNode.split("[")[1].split("]")[0].trim();
        let links = document.querySelectorAll(".link");
        // Reset stroke color for all links
        links.forEach((link) => {
            if (
                link.getAttribute("data-target") == nodeValue &&
                link.style.stroke !== "green"
            ) {
                link.style.stroke = "magenta"; // Change the color to your desired color
            }
        });
    });
}

function hidePathDisplay() {
    document.getElementById("pathDisplay").textContent = "";
}

function fillToColor(value, color) {
    let circles = document.querySelectorAll(".node");

    // Reset coloring for nodes
    circles.forEach((circle, i) => {
        circle.firstChild.classList.remove("green");
        circle.firstChild.classList.remove("gold");
        circle.firstChild.classList.remove("red");

        if (circle.lastChild.innerHTML === value) {
            setTimeout(() => {
                circle.firstChild.classList.add(color);
            }, i * 80);
        }
    });

    // Apply color to the specific path links
    let links = document.querySelectorAll(".link");

    links.forEach((link) => {
        const sourceNode = link.getAttribute("data-source");
        const targetNode = link.getAttribute("data-target");

        // Check if the link corresponds to the current value
        if (sourceNode === value || targetNode === value) {
            link.style.stroke = "";
            link.style.stroke = "magenta"; // Apply limegreen color
        }
    });
}