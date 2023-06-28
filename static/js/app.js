d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // The 'data' variable contains the JSON data from samples.json
    console.log(data);
    // You can perform further operations with the data here
  })
  .catch(function(error) {
    // If an error occurs while loading the JSON file, handle it here
    console.log(error);
  });

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Retrieve the samples array from the data object
    var samples = data.samples;

    // Get a reference to the dropdown menu
    var dropdown = d3.select("#selDataset");

    // Populate the dropdown menu with options
    samples.forEach(function(sample) {
      dropdown.append("option")
        .text(sample.id)
        .property("value", sample.id);
    });

function updateChart(selectedSample) {
    // Find the selected sample object
    var selectedData = samples.find(function(sample) {
    return sample.id === selectedSample;
    });

    // Get the top 10 OTUs
    var top10Values = selectedData.sample_values.slice(0, 10).reverse();
    var top10IDs = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var top10Labels = selectedData.otu_labels.slice(0, 10).reverse();

    // Create the trace for the horizontal bar chart
    var trace = {
    x: top10Values,
    y: top10IDs,
    text: top10Labels,
    type: "bar",
    orientation: "h"
    };

    // Create the data array
    var data = [trace];

    // Define the layout for the chart
    var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
    };

    // Plot the chart
    Plotly.newPlot("bar", data, layout);
}

// Initialize the chart with the first sample
updateChart(samples[0].id);

 // Event listener for the dropdown menu
dropdown.on("change", function() {
    var selectedSample = dropdown.property("value");
    updateChart(selectedSample);
});
})
.catch(function(error) {
// Handle any error that occurs during the loading process
console.log(error);
});


  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Retrieve the samples array from the data object
    var samples = data.samples;

    // Get a reference to the dropdown menu
    var dropdown = d3.select("#selDataset");

    // Populate the dropdown menu with options
    samples.forEach(function(sample) {
      dropdown.append("option")
        .text(sample.id)
        .property("value", sample.id);
    });

    // Define a function to update the chart based on the selected sample
    function updateChart(selectedSample) {
      // Find the selected sample object
      var selectedData = samples.find(function(sample) {
        return sample.id === selectedSample;
      });

      // Get the data for the bubble chart
      var xValues = selectedData.otu_ids;
      var yValues = selectedData.sample_values;
      var markerSizes = selectedData.sample_values;
      var markerColors = selectedData.otu_ids;
      var textValues = selectedData.otu_labels;

      // Create the trace for the bubble chart
      var trace = {
        x: xValues,
        y: yValues,
        text: textValues,
        mode: "markers",
        marker: {
          size: markerSizes,
          color: markerColors,
          colorscale: "Earth"
        }
      };

      // Create the data array
      var data = [trace];

      // Define the layout for the chart
      var layout = {
        title: "Sample Values vs. OTU IDs",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" },
        showlegend: false
      };

      // Plot the chart
      Plotly.newPlot("bubble", data, layout);
    }

    // Initialize the chart with the first sample
    updateChart(samples[0].id);

    // Event listener for the dropdown menu
    dropdown.on("change", function() {
      var selectedSample = dropdown.property("value");
      updateChart(selectedSample);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

  function updateChart(selectedSample) {
    // Find the selected sample object
    var selectedData = samples.find(function(sample) {
      return sample.id === selectedSample;
    });
  
    // Get the data for the bubble chart
    var xValues = selectedData.otu_ids;
    var yValues = selectedData.sample_values;
    var markerSizes = selectedData.sample_values;
    var markerColors = selectedData.otu_ids;
    var textValues = selectedData.otu_labels;
  
    // Create the trace for the bubble chart
    var trace = {
      x: xValues,
      y: yValues,
      text: textValues,
      mode: "markers",
      marker: {
        size: markerSizes,
        color: markerColors,
        colorscale: "Earth"
      }
    };
  
    // Create the data array
    var data = [trace];
  
    // Define the layout for the chart
    var layout = {
      title: "Sample Values vs. OTU IDs",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" },
      showlegend: false
    };
  
    // Plot the chart
    Plotly.newPlot("bubble", data, layout);
  
    // Display the sample metadata
    var metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html(""); // Clear previous metadata
  
    var metadata = data.metadata;
    var selectedMetadata = metadata.find(function(sample) {
      return sample.id === selectedSample;
    });
  
    Object.entries(selectedMetadata).forEach(function([key, value]) {
      metadataDiv.append("p").text(`${key}: ${value}`);
    });
  }
