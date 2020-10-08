d3.json('/static/js/samples.json').then(function(sample) {
    
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

    var graph_data = sample.samples[0]

    function init() {
        let data = [{
            x: graph_data.otu_ids.map(d => `OTU ${d}`),
            y: graph_data.sample_values.sort((a, b) => (b - a)).slice(0, 10),
            type: 'bar',
        }]

        Plotly.newPlot('h-bar-container', data)
        console.log(data[0].y)
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

        Plotly.restyle('h-bar-container', 'x', [x])
        Plotly.restyle('h-bar-container', 'y', [y])

        }

    }

    init()
})
