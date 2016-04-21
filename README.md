# yp.ca-scrape
Scrapes the [Yellowpages Canada web site](yp.ca) for specific business types in a city and output as CSV.

This node.js based scraper uses [x-ray](https://www.npmjs.com/package/x-ray) to extract specific attributes from the yp.ca results page.

The yp.ca result page has an infinite scrolling feature for pagination - the scraper uses x-ray's built-in paginate directive to extract all the results in one shot.

The business types are setup in the searchTerms array, and the city and province are setup in the URLsuffix variable.
