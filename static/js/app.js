// READING IN JSON DATA
d3.json('/static/js/samples.json').then((sample) => {

        // BUILDING DROPDOWN USING D3
        // Appending select object
        var dropdown = d3.select('#dropdown-container')
            .append('select')

        // Appending select options
        var selections = dropdown.selectAll('option')
            .data(sample.names)
            .join('option')
            .attr('value', d => d)
            .text(d => d)
            .attr('class', 'id-no')

        // INITIAL PAGE LOAD
        // Get value from select input
        var graph_data = sample.samples

        // Defining INIT() function
        function init() {
            let data = [{
                x: graph_data[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse(),
                y: graph_data[0].otu_ids.map(d => `OTU ${d}`),
                text: graph_data[0].otu_labels,
                type: 'bar',
                orientation: 'h'
            }]

            let bubbleData = [{
                x: graph_data[0].otu_ids.map(d => `OTU ${d}`),
                y: graph_data[0].sample_values,
                marker: {
                    size: graph_data[0].sample_values
                },
                mode: 'markers'
            }]

            Plotly.newPlot('plot', data)
            Plotly.newPlot('bubble-plot', bubbleData)
        }

        // HORIZONTAL BAR CHART   
        // Event listener on change in select object value
        dropdown.on('change', updatePlotly)

        // Event handler to update charts
        function updatePlotly() {
            let id = dropdown.node().value
            let newId = graph_data.filter(d => d.id === id)

            // H-Bar update
            let x = [], y = []

            x = newId[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse()
            y = newId[0].otu_ids.map(d => `OTU ${d}`)

            Plotly.restyle('plot', 'x', [x])
            Plotly.restyle('plot', 'y', [y])

            // Bubble chart update
            x = newId[0].otu_ids.map(d => `OTU ${d}`)
            y = newId[0].sample_values

            Plotly.restyle('bubble-plot', 'x', [x])
            Plotly.restyle('bubble-plot', 'y', [y])
            }

    
    // CALLING INITIALIZER
    init()
    }
)
