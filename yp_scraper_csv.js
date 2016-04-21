var Xray = require('x-ray');
var x = Xray();
var fs = require('fs');

var searchTerms = ["caterer", "cafe", "depanneur"];
var streamArray = [];

searchTerms.forEach(function(term){
	var outfile_name = term + "_montreal_results.csv";
	var baseURL = 'http://www.yellowpages.ca/search/si/1/';
	var URLsuffix = '/Montreal%2C%20QC';

	// url to scrape
	var theURL = baseURL + term + URLsuffix;

	// open a file for writing with the search term as an identifier
	streamArray[term] = fs.createWriteStream(outfile_name);

	// start scraping
	console.log("scraping: " + term + " \tfrom: " + theURL);

	x(theURL, {
		stats: '.contentControls-msg',
		items: x('.listing',
			[{
				name: 'h3.listing__name a',
				address: '.listing__address--full',
				phone: '.mlr__submenu__item'
			}]
		)
		.paginate('.next a@href')
	})
	(function(err, json){
		if (err) {
			console.log("error scraping " + term + ": " + err);
		} else {
			var i = 0;
			json.items.forEach(function(entry){
				i = i + 1;
				if (entry.address){
					var address = entry.address.replace(/\n\t\W*/gi,'');
				}
				var output = entry.name + "|" + address + "|" + entry.phone + "\n";
				streamArray[term].write(output, function(err) {
					if(err){
						return console.log(err);
					}
				});
			});
			streamArray[term].end();
			console.log("finished scraping: " + term + ". \tTotal Items: \t" + i );
		}
	});
});