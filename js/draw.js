// ***************************************
// CODE PARA DISPLAY SA BINARY TREE GRAPH
// ***************************************

// Define the function named drawGraph that takes a data array as input
function drawGraph(data) {
    // Create an empty array to store processed data
    let list = [];


// ***************************************
// Loop through each element in the data array    
// ***************************************

    for (let i = 0; i < data.length; i++) {
        // Get the current element
        let now = data[i];
        // Create an object with specific properties from the current element
        let obj = {
            "value": now.value, // Store the value property
            "children": [].concat(now.children), // Store the children property as a new array
            "parent": now.parent // Store the parent property
        };
        // Push the created object to the list array
        list.push(obj);
    }

    // Create an array of unique values from the data array
    let unique = [...new Set(data.map(x => x.value))];


// ***************************************
// MAO NI PARAS HITSURA SA CIRCLE
// ***************************************

    let margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    };
    let width = (125 * unique.length) - margin.right - margin.left;
    let height = (125 * unique.length) - margin.top - margin.bottom;

    // Initialize letiables for tree layout and diagonal path generator
    let i = 0;
    let tree = d3.layout.tree().size([height, width]);
    let diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });

    // Select the container with class "graph" and append an SVG element to it
    let svg = d3.select(".graph").append("svg")
        .attr("width", width).attr("height", height + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Select the root node from the list array
    let root = list[0];

    // Generate tree nodes and links using the tree layout
    let nodes = tree.nodes(root);
    let links = tree.links(nodes);

    // Position nodes vertically based on their depth in the tree
    nodes.forEach(function (d) {
        d.y = d.depth * 70;
    });

    // Select all node groups in the SVG
    let gNode = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    // Enter new node groups and set their initial position
    let nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // Append circles to represent nodes and transition their size
    let circle = nodeEnter.append("circle")
        .attr("r", 0);

         
// ***************************************
// TRANSITION PARA SA CIRCLE SA NODE
// ***************************************

circle.transition()
.delay(function (d, i) {
    return i * 80;
})
.attr("r", 25)
.style("fill", function (d, i) {

    return d.children || d._children ? 'red' : 'yellow'; //#FFE066
})
.style("visibility",function(d){
    return d.value == "Empty"? "hidden" : "visible"
})
.duration(1000)
.ease('elastic');

    // Append text to nodes to display their values and transition their appearance
    let charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle");

// ***************************************
// TRANSITION PARA SA TEXT INSIDE SA NODE (VALUE)
// ***************************************

    charText.transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .text(function (d) {
            return d.value;
        })
        .style("visibility", function (d) {
            return d.value == "Empty" ? "hidden" : "visible"; // Hide text for nodes with value "Empty"
        });

    // Select all path elements representing links in the SVG
    let path = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        });

    // Enter new path elements for links and set their initial appearance
    let pathT = path.enter().insert("path", "g")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 4) // Set the stroke width (e.g., 2 pixels)
    .style("visibility", function (d) {
        return d.target.value == "Empty" ? "hidden" : "visible"; 
    });

    // Transition link appearance and visibility based on target node values
    pathT.transition()
        .delay(function (d, i) {
            return i * 100;
        })
        .attr("d", diagonal);
}


