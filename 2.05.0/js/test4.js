

// var jsonCirclePositions;
// var jsonCircleLinks;
//
// d3.json("data/data.json").then(function(data) {
//     console.log(data.nodes);
//
//     jsonCirclePositions = data.nodes;  // Extract the positions of the circles...
//     jsonCircleLinks = data.links;  // Extract links between nodes...
//
//     var val_max_x = d3.max(data.nodes, function(d) {return d.x;});  // Find the highest value of axis_x...
//     var val_max_y = d3.max(data.nodes, function(d) {return d.y;});  // Find the highest value of axis_y...
//
//
// }).catch(function (error) {
//     console.log(error)
// });

var jsonNodes;
var jsonLinks;

d3.json("data/data.json", function(data) {

    var nodes = data.nodes;
    jsonLinks = data.links;

    console.log(nodes);
    console.log(jsonLinks);

    var width = 640,
        height = 480;

    // var nodes = [
    //     { x:   100, y: 100 },
    //     { x: 200, y: 200 }
    // ];

    var links = [
        { source: 0, target: 1 }
    ];

    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);


    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links);

    //force.linkDistance(width/2);

    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

    var node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node');

    force.on('end', function() {

        node.attr('r', 5)
            .attr('cx', function(d,i) { return 50 * i + 50; })
            .attr('cy', function(d) { return d.y; });

        link.attr('x1', 100)
            .attr('y1', 100)
            .attr('x2', 200)
            .attr('y2', 200);

    });

    force.start();
});


