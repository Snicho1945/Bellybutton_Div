function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample);
      });
    });
}
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildGaugeChart(newSample);
};
  
// display data values for selected object
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(key.toUpperCase() + ": " + value);
        });
});
}
// create a bar chart of the top ten bacteria
function buildBarChart(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data);
        var resultArray = data.samples.filter((sampleObj) => {
        return sampleObj.id === sample;
        });
        var result = resultArray[0];

        // create bar chart
        var top_ten_OTU = result.otu_ids
        .slice(0, 10)
        .map((idnum) => {
            return "OTU " + idnum;
        })
        .reverse();

        var top_ten_sample = result.sample_values.slice(0, 10).reverse();
        var top_ten_labels = result.otu_labels.slice(0, 10).reverse();

        var bar_trace = [
        {
            x: top_ten_sample,
            y: top_ten_OTU,
            text: top_ten_labels,
            name: "Top 10 OTU",
            type: "bar",
            orientation: "h",
            marker: { color: "rgb(96, 96, 235)" },
        },
        ];

        var bubble_layout = {
            title: "Top Ten OTUs",
            paper_bgcolor: "rgb(255, 225, 225);",
        };
        // format plot area
        Plotly.newPlot("bar", bar_trace, bubble_layout);
});
}
// create a bubble chart to visualize
function buildBubbleChart(sample) {
d3.json("samples.json").then((data) => {
    console.log(data);
    var resultArray = data.samples.filter((sampleObj) => {
    return sampleObj.id === sample;
    });
    var result = resultArray[0];

    // create bubble chart
    var otu_ids = result.otu_ids
    .map((idnum) => {
        return idnum;
    })
    .reverse();

    var sample_values = result.sample_values.reverse();
    var otu_labels = result.otu_labels.reverse();

    // load data for plotting
    var bubble_trace = [
    {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: { color: otu_ids, size: sample_values, colorscale: "Blues" },
    },
    ];

    // format plot area
    var bubble_layout = {
    title: "OTU ID",
    showlegend: false,
    paper_bgcolor: "rgb(0, 0, 0);",
    plot_bgcolor: "rgb(255, 255, 255);",
    };
    Plotly.newPlot("bubble", bubble_trace, bubble_layout);
});
}

function buildGaugeChart(Sample) {
d3.json("samples.json").then((data) => {
    var samples = data.metadata;
    var resultArray = samples.filter((sampleObj) => sampleObj.id == Sample);
    var result = resultArray[0];

    var gauge_chart = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: "Belly Button Scrubs per Week",
        type: "indicator",
        mode: "gauge+number",
        gauge: {
        bar: { color: "black" },
        axis: { range: [null, 9] },
        steps: [
            { range: [0, 1], color: "rgb(255, 255, 255)" },
            { range: [1, 2], color: "rgb(190, 190, 255)" },
            { range: [2, 3], color: "rgb(160, 160, 255)" },
            { range: [3, 4], color: "rgb(140, 140, 255)" },
            { range: [4, 5], color: "rgb(110, 110, 255)" },
            { range: [5, 6], color: "rgb(80, 80, 255)" },
            { range: [6, 7], color: "rgb(60, 60, 255)" },
            { range: [7, 8], color: "rgb(40, 40, 255)" },
            { range: [8, 9], color: "rgb(20, 20, 255)" },
        ],
        },
    },
    ];
    var layout = {
    width: 500,
    height: 450,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "rgb(137, 151, 145);",
    plot_bgcolor: "rgb(137, 151, 145);",
    };
    // format plot area
    Plotly.newPlot("gauge", gauge_chart, layout);
});
}