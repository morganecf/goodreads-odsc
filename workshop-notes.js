// appended an svg container 
svg = d3.select(".chart-container").append("svg").attr('width', 800).attr('height', 500)

// add a circle to the svg
circle = svg.append('circle')

// place it in the middle of the container and set radius of 50, fill of red
circle.attr('r', 50).attr('cx', 400).attr("cy", 250).attr('fill', 'red')

// modify its other attributes
circle.attr('stroke', 'purple')
circle.attr('stroke-width', 5)
circle.attr("opacity", 0.5)

// animate it to full opacity and radius of 100 for 2s with a delay of 1s
circle.transition().duration(2000).delay(1000).attr('opacity', 1).attr('r', 100)
circle.transition().duration(2000).delay(1000).attr('opacity', 1).attr('r', 500)

// remove the circle from the DOM
circle.remove()