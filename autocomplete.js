/////////////////////////////
// Written by: Ilan Patao //
// ilan@dangerstudio.com //
//////////////////////////

// Request function to fire on textbox input change
jQuery('#wikisearch').on('input', function() {
// Clear the search results for a new search
$("#searchresults").empty();
// Store search term in variable
var wikiterm = $("#wikisearch").val();
// Build the request
var proxifyer = "https://proxifyer.herokuapp.com/";
var url = proxifyer + "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cpageterms&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=80&pilimit=10&wbptterms=description&gpssearch=" + wikiterm + "&gpsnamespace=0&gpslimit=10";
		// Request the data
		$.get(url, function (wikidata) {
		// Store the data in a new variable
		var data = wikidata;
		// Go through the data and return results back to the searchdata div
		$.each(data.query.pages, function(i, obj) {
		// Store the data in seperate variables
		var pageid = data.query.pages[i].pageid;
		var title = data.query.pages[i].title;
		// Store an image if it exists
		if (typeof(data.query.pages[i].thumbnail) != "undefined")
		{
			var image = data.query.pages[i].thumbnail.source;
			var img = "<img src='" + image + "'>";
		} else {
		// You can add a thumb placeholder for no photos here
			var img = "";
		}
		var description = data.query.pages[i].terms.description;
		// Append results to the list
		$("#searchresults").append('<li style="margin: 10px 0;">' + img + '<h4 style="display:inline;margin-left:10px;"><a href="#" data-toggle="popover" data-placement="top" data-trigger="hover" title="' + title + '" data-content="Data returned for: ' + title + ' pageID: ' + pageid + ': ' + description +'">' + title + '</a></h4><br><li><small>' + description + '</small></li><hr></li>');
		});
		// Initialize popoever
		$('[data-toggle="popover"]').popover(); 
		// Output Json Preview
    	var json = JSON.stringify(data);
		$("#jsonresults").val(json);
	});
});