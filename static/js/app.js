// READING IN JSON DATA
d3.json('./static/js/samples.json').then((sample) => {

        // BUILDING DROPDOWN USING D3
        // Appending select object
        var dropdown = d3.select('#dropdown-container')
            .append('select')
            .classed('form-control form-control-lg', true)
            .attr('id', 'dropdown')

        // Appending select options
        var selections = dropdown.selectAll('option')
            .data(sample.names)
            .join('option')
            .attr('value', d => d)
            .text(d => d)
            .attr('class', 'id-no')

        // INITIAL PAGE LOAD
        // Get value from select input
        var graphData = sample.samples
        var cardData = sample.metadata

        // Defining INIT() function
        function init() {
            
            // Bar graph data declaration
            let sortedData = graphData[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse()

            let barData = [{
                x: sortedData,
                y: graphData[0].otu_ids.map(d => `OTU ${d}`).slice(0, 10).reverse(),
                text: graphData[0].otu_labels,
                type: 'bar',
                orientation: 'h'
            }]

            // Bubble plot data declaration
            let bubbleData = [{
                x: graphData[0].otu_ids.map(d => d),
                y: graphData[0].sample_values,
                marker: {
                    size: graphData[0].sample_values,
                    color: graphData[0].otu_ids,
                    sizeref: 1.25
                },
                mode: 'markers',
                text: graphData[0].otu_labels
            }]

            let bubbleLayout = {
                height: 600,
            }
            
            // Initial plots
            Plotly.newPlot('plot', barData)
            Plotly.newPlot('bubble-plot', bubbleData, bubbleLayout)

            // Initial card
            let card = d3.select('#card-body')
                .selectAll('li')
                .data(Object.entries(cardData[0]))
                .join('li')
                .text(d => d[0] + ': ' + d[1])
                .classed('list-group-item', true)


        }

        // HORIZONTAL BAR CHART   
        // Event listener on change in select object value
        dropdown.on('change', updatePlotly)

        // Event handler to update charts
        function updatePlotly() {
            
            let id = dropdown.node().value
            let chartId = graphData.filter(d => d.id === id)
            let cardId = cardData.filter(d => d.id.toString() === id)

            // H-Bar update
            let x = [], y = []
            let sortedData = chartId[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse()

            x = sortedData
            y = chartId[0].otu_ids.map(d => `OTU ${d}`).slice(0, 10).reverse()

            Plotly.restyle('plot', 'x', [x])
            Plotly.restyle('plot', 'y', [y])

            // Bubble chart update
            x = chartId[0].otu_ids.map(d => d)
            y = chartId[0].sample_values
            let markerSize = chartId[0].sample_values
            let markerColor = chartId[0].otu_ids
            let text = chartId[0].otu_labels

            Plotly.restyle('bubble-plot', 'x', [x])
            Plotly.restyle('bubble-plot', 'y', [y])
            Plotly.restyle('bubble-plot', 'marker.size', [markerSize])
            Plotly.restyle('bubble-plot', 'marker.color', [markerColor])
            Plotly.restyle('bubble-plot', 'text', [text])

            // Card update
            card = d3.select('#card-body')
                .selectAll('li')
                .data(Object.entries(cardId[0]))
                .join('li')
                .text(d => d[0] + ': ' + d[1])
                .classed('list-group-item', true)
            }



    
    // CALLING INITIALIZER
    init()
    }
)
