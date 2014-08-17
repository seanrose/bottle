/**
 * Returns a historical Gmail URL
 * based on the date passed in
 * yearsInThePast years back from the current date
 *
 * @param <Date> date
 * @param <Integer> yearsInThePast
 * @return <String> combinedURL
 */
function historicalSearchURL(date, yearsInThePast, accountIndex) {
	// creating a copy because idk how to javascript tbh
	var dateCopy = new Date(date);
	var year = dateCopy.getFullYear() - yearsInThePast;

	var afterComponent = 'after:' + historicalDate(dateCopy, yearsInThePast);

	dateCopy.setDate(dateCopy.getDate() + 1);
	var beforeComponent = 'before:' + historicalDate(dateCopy, yearsInThePast);

	var baseURL = 'https://mail.google.com/mail/u/'+ accountIndex + '/#search/';
	var combinedURL = baseURL + encodeURIComponent(afterComponent) + '+' + encodeURIComponent(beforeComponent);

	return combinedURL;
}

/**
 * Creates a formatted date string
 * YYYY/MM/DD
 * given a Date object and years in the past
 *
 * @param <Date> date
 * @param <Integer> yearsInThePast
 * @return <String>
 */
function historicalDate(date, yearsInThePast) {
	var year = date.getFullYear() - yearsInThePast;
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + '/' + month + '/' + day;
}

/**
 * Returns a shade of blue that
 * is lighter based on
 * number of years in the past
 * returns an rgba string
 *
 * @param <Integer> yearsInThePast
 * @return <String>
 */
function historicalColor(yearsInThePast) {
	var baseBlue = 149;
	var increment = 15;

	var blue = baseBlue + increment * yearsInThePast;

	return 'rgba(34, 110, ' + blue +', 1)';
}

/**
 * tbh i copied this from stackoverflow
 * and have no idea what it does
 *
 * @param <String> name
 * @returns <String>
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Turns an object to a query string
 * and appends it to the current path
 *
 * @param <Object> params
 */
function updateURL(params) {
	var str = [];
  	for(var p in params) {
    	if (params.hasOwnProperty(p)) {
    		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
    	}
  	}
  	var queryString = str.join('&');
	window.history.pushState('', '', '/?' + queryString);
}

Template.bottle.helpers({

	/**
	 * Generates an array of historical URLs
	 * based on the provided number of years back
	 *
	 * @returns <Array>
	 */
 	historicalURLs: function() {
        var histories = [];
        // TODO(seanrose): un-hardcode numYears
        var numYears = getParameterByName('years') || 4;
        var accountIndex = getParameterByName('u') || 0;
        updateURL({
        	u: accountIndex,
        	years: numYears
        });

        var currentDate = new Date();

        for (var i = numYears; i > 0; i--) {
        	histories.push({
        		text: i + ' ' + (i == 1 ? 'year' : 'years') + ' ago',
        		url: historicalSearchURL(currentDate, i, accountIndex),
        		color: historicalColor(i)
        	});
        }

        return histories.reverse();
    }
});

Template.bottle.rendered = function () {
	$('a').delay('fast').each( function(index, value) {
		$(value).delay(300 * index).fadeIn('slow');
	});
	GAnalytics.pageview();
};
