/**
 * Author: Siqi Zhao
 * Data: 2018-05-19
 * */

var width = 1000,
    height = 800;

// Define the div for the tooltip...
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//  Define the size of the canvas...
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

//  Using force to make sure that all the nodes will be fixed inside the canvas...
var force = d3.layout.force()
    .distance(400)
    .size([width, height]);

d3.json("data/data.json", function(error, json) {  // Read data... Parameter [json] is the return object...
    var edges = [];

    // Transforming (set the source nodes and the target nodes in terms of the data sets and reform into a new array)...
    json.links.forEach(function(e) {
        var sourceNode = json.nodes.filter(function(n) { return n.id === e.node01; })[0],
            targetNode = json.nodes.filter(function(n) { return n.id === e.node02; })[0];

        edges.push({source: sourceNode, target: targetNode, value: e.amount});
    });

    //console.log(edges);

    var min_domain = d3.min(json.links, function(d) {return d.amount;});  //  Find the min value in the array to determine the lower limit for scale methods...
    var max_domain = d3.max(json.links, function(d) {return d.amount;});  //  Find the max value in the array to determine the upper limit for scale methods...

    // Start the force...
    force
        .nodes(json.nodes)
        .links(edges)
        .start();

    // Set the scaleLinear in order to define the thickness of the links...
    var strokeScaleForLinks = d3.scale.linear()
        .domain([min_domain, max_domain])
        .range([1, 10]);

    // Set the scaleLog in order to define the radius of the circles(nodes)...
    var strokeScaleForNodes = d3.scale.log()
        .domain([min_domain, max_domain])
        .range([10, 40]);

    // Set the properties of the links...
    var link = svg.selectAll(".link")
        .data(edges)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke-width", function (d) {
            return strokeScaleForLinks(d.value)
        });

    //  Draw the nodes now...
    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node");

    // Set the attributes of the nodes and the interactions with the mouse...
    node.append("circle")
        .data(edges)
        .attr("class", "node")
        .style("fill", "grey")
        .attr("r", function (d) {
            return strokeScaleForNodes(d.value)
        })
        .on("mouseover", function(d) {
            svg.selectAll("circle")
                .attr("opacity", 0.5);
            d3.select(this) // Highlight the selected node...
                .attr("opacity", 1);
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html('<b>' + d.value + '<b>')
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            svg.selectAll("circle")
                .attr("opacity", 1);
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    //  Set the title for every node in order to make a clearer visualisation...
    node.append("svg:a")
        .append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.id});

    //  Draw the links and transform nodes' position...
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
});

