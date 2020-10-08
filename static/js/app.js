d3.json('/static/js/samples.json').then(function(sample) {
    
    var dropdown = d3.select('#dropdown-container')
    .append('select')

    var selections = dropdown.selectAll('option')
        .data(sample.names)
        .join('option')
        .attr('value', d => d)
        .text(d => d)


})
