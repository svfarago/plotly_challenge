// Initialize program; this is not built in to javascript

function init() {
    // Populates drop-down list with data of all test subject IDs from samples.json file
    // This process binds data to DOM elements using D3.js
    d3.json("samples.json").then(function(data) {
        d3.select("#selDataset").selectAll("option") // select id="selDataset" in html
            .data(data.names)  // select names data from samples.json dataset
            .enter()
            .append("option")
            .html((sid) =>`<option>${sid}</option>`) // See "option" in HTML. Note use of tick mark, not apostrophe for a template literal to contain placeholder for Subject ID No.
            
        // Builds default charts based on variable subjectID
        // Include [0] to show data and default charts. If left out, no default charts display.
        subjectID = data.names[0];
        buildPlot(subjectID);
    });
};

//------------- DROP DOWN --------------  
// Function to run dropdown list when Test Subject ID is changed
function optionChanged(subjectID){
    buildPlot (subjectID)
};

// Set up plotting function for each subject ID
function buildPlot(subjectID){
    d3.json("samples.json").then(function(data) {
        // Get the index from the selected subject and use it to call the metadata and sample data from the JSON object
        var names = data.names.indexOf(subjectID);
        var metaData = data.metadata[names];
        var sample = data.samples[names];

        //Pull data from samples.json based on Test Subject ID No. selected
        var sampleValues = sample.sample_values;
        var otuIds = sample.otu_ids;
        var otuLabels = sample.otu_labels;


        // Save to an array the data from samples.json based on Test Subject ID No. selected
        var entries = Object.entries(metaData);
        
        // Console to check data
        console.log(entries);

 //------------- BAR CHART --------------        
        // x = top 10 descending OTU samples for selected test subject
        // y = top 10 decending OTU ID
        // otu_ids as labels | otu_labels as tooltip

        var barTrace = {
            x: sampleValues.slice(0,10).reverse(),
            y: otuIds.slice(0,10).reverse().map(otuId => "OTU" + otuId),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        // Console to check data
        console.log(barTrace);

         // Chart layout
                var barLayout = {
                    xaxis: {
                        title:{
                        text: "Sample Values"
                        }
                    },
                    yaxis: {
                        title:{
                        text: "OTU ID"
                        }
                    }
                };

        // Plot traces in the DOM 
        var barData = [barTrace];

        Plotly.newPlot("bar", barData, barLayout);

        // Console to check data
        console.log(barData);





//------------- CLEAR OUT DATA --------------        
        // Empty Demographic Info box held in metadata html tag
        d3.select("#sample-metadata").html("");
        
        // Unpopulate demographic info box with selected Test Subject ID (sid) metadata
        d3.select("#sample-metadata").selectAll("p")
            .data(entries
                )
            .enter()
            .append("p")
            .html((sid) => 
                `<p>${sid[0]}: ${sid[1]}</p>`) // Note use of tick mark, not apostrophe for a template literal to contain placeholder for Subject ID No. (sid)
    });
};

// Initialize program
init();

