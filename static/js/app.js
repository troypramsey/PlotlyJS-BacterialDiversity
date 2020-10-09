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
        var cardData = sample.metadata

        // Defining INIT() function
        function init() {
            
            // Bar graph data declaration
            let data = [{
                x: graph_data[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse(),
                y: graph_data[0].otu_ids.map(d => `OTU ${d}`),
                text: graph_data[0].otu_labels,
                type: 'bar',
                orientation: 'h'
            }]

            // Bubble plot data declaration
            let bubbleData = [{
                x: graph_data[0].otu_ids.map(d => `OTU ${d}`),
                y: graph_data[0].sample_values,
                marker: {
                    size: graph_data[0].sample_values
                },
                mode: 'markers'
            }]
            
            // Initial plots
            Plotly.newPlot('plot', data)
            Plotly.newPlot('bubble-plot', bubbleData)

            // Initial card
            let card = d3.select('#card-body')
                .selectAll('li')
                .data(Object.entries(cardData[0]))
                .join('li')
                .text(d => d[0] + ': ' + d[1])


        }

        // HORIZONTAL BAR CHART   
        // Event listener on change in select object value
        dropdown.on('change', updatePlotly)

        // Event handler to update charts
        function updatePlotly() {
            let id = dropdown.node().value
            let newId = graph_data.filter(d => d.id === id)
            let cardId = cardData.filter(d => d.id.toString() === id)

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

            // Card update
            card = d3.select('#card-body')
                .selectAll('li')
                .data(Object.entries(cardId[0]))
                .join('li')
                .text(d => d[0] + ': ' + d[1])
            }



    
    // CALLING INITIALIZER
    init()
    }
)
