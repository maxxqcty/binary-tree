function drawGraph(data) {
    let list = [];

    for (let i = 0; i < data.length; i++) {
        let now = data[i];
        let obj = {
            value: now.value,
            children: [].concat(now.children),
            parent: now.parent,
        };
        list.push(obj);
    }

    let unique = [...new Set(data.map((x) => x.value))];

    let margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20,
    };
    let width = 125 * unique.length - margin.right - margin.left;
    let height = 125 * unique.length - margin.top - margin.bottom;

    let i = 0;
    let tree = d3.layout.tree().size([height, width]);
    let diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });

    let svg = d3
        .select(".graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top)
        .append("g")
        .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

    let root = list[0];

    let nodes = tree.nodes(root);
    let links = tree.links(nodes);
// Calculate tree depth
let maxDepth = 0;
nodes.forEach(function (d) {
if (d.depth > maxDepth) {
maxDepth = d.depth;
}
});

// Display tree depth
let treeDepthDisplay = document.getElementById("treeDepthDisplay");
treeDepthDisplay.textContent = "Tree Depth: " + maxDepth;
if (maxDepth > 0) {
treeDepthDisplay.textContent = "Tree Depth: " + maxDepth;
treeDepthDisplay.style.display = "block"; // Show the display
} else {
treeDepthDisplay.textContent = ""; // Clear the content
treeDepthDisplay.style.display = "none"; // Hide the display
}

    nodes.forEach(function (d) {
        d.y = d.depth * 70;
    });

    let gNode = svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    let nodeEnter = gNode
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    let circle = nodeEnter.append("circle").attr("r", 0);

    circle
        .transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .attr("r", 25)
        .style("fill", function (d, i) {
            return d.children || d._children ? "red" : "yellow";
        })
        .style("visibility", function (d) {
            return d.value == "Empty" ? "hidden" : "visible";
        })
        .style("stroke","white")
        .style("stroke-width","4px")
        .duration(1000)
        .ease("elastic");

    let charText = nodeEnter
        .append("text")
        .attr("y", 5)
        .attr("text-anchor", "middle");

    charText
        .transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .text(function (d) {
            return d.value;
        })
        .style("visibility", function (d) {
            return d.value == "Empty" ? "hidden" : "visible";
        });

    let path = svg.selectAll("path.link").data(links, function (d) {
        return d.target.id;
    });

    let pathT = path
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 4)
        .style("visibility", function (d) {
            return d.target.value == "Empty" ? "hidden" : "visible";
        })
        .attr("data-target", function (d) {
            // Add this line
            return d.target.value; // Add this line
        });
    pathT
        .transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .attr("d", diagonal);
}