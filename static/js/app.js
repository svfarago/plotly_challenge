
function init() {
    // Populates drop-down list with data of all test subject IDs from samples.json file
    d3.json("samples.json").then(function(data) {
        d3.select("#selDataset").selectAll("option") // select id="selDataset" in html
            .data(data.names)
            .enter()
            .append("option")
            .html((d) =>`<option>${d}</option>`) // Note use of tick mark, not apostrophe
            
        // Create initial plot using the first study subject's ID.
        //POTATO renamed var id to subjectID
        subjectID = data.names[0];
        buildPlot(subjectID);
    });
};



// Run initial function when the program starts
init();