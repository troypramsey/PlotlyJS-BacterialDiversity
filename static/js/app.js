d3.json('/static/js/samples.json').then((sample) => {

        // Building dropdown with D3
        var dropdown = d3.select('#dropdown-container')
            .append('select')

        var selections = dropdown.selectAll('option')
            .data(sample.names)
            .join('option')
            .attr('value', d => d)
            .text(d => d)
            .attr('class', 'id-no')

        // Initial h-bar chart
        var graph_data = sample.samples

        function init() {
            let data = [{
                x: graph_data[0].sample_values.sort((a, b) => (b - a)).slice(0, 10).reverse(),
                y: graph_data[0].otu_ids.map(d => `OTU ${d}`),
                type: 'bar',
                orientation: 'h'
            }]

            Plotly.newPlot('plot', data)
        }

        // Isolating data to build H-Bar chart    
        
        dropdown.on('change', updatePlotly)
        function updatePlotly() {
            let id = dropdown.node().value
            let x = [], y = []
            
            function findID(x) {
                let filter = graph_data.id === x
                return filter
            }
            x = graph_data.otu_ids.filter(findID(id))
            y = graph_data.sample_values.filter(findID(id))
            Plotly.restyle('plot', 'x', [x])
            Plotly.restyle('plot', 'y', [y])
            }
    
    init()
    }
)
