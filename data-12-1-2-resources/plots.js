// line plot
Plotly.newPlot("plotAreas", [{x: [13, 21, 34], y: [10, 20, 30]}]);

Plotly.newPlot("plotapus", [{x:[12, 13, 50, 40, 33 ,56, 32, 27], y:[17, 19, 28, 17, 42, 48, 34, 21]}])

// bar chart
// var trace = {
//     x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: "bar"
// };

// var data = [trace];
// var layout = {
//     title: "'Bar' Chart",
//     xaxis: {title: "Drinks"},
//     yaxis: {title: "% of Drinks Ordered"}
// };

// Plotly.newPlot("plotArea", data, layout);

// pie chart
var trace = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "pie"
};

var data = [trace];
var layout = {
    title: "'Pie' Chart"
};

Plotly.newPlot("plotArea", data, layout);

// .map
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function(num){
    return num * 2;
});
console.log(doubled);

d3.json("samples.json").then(function(data){
    console.log(data);
});