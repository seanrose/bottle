// Format: after:2014/5/3 before:2014/5/4
function historicalSearchURL(date, yearsInThePast) {
	// creating a copy because idk how to javascript tbh
	var dateCopy = new Date(date);
	var year = dateCopy.getFullYear() - yearsInThePast;

	var afterComponent = 'after:' + historicalDate(dateCopy, yearsInThePast);

	dateCopy.setDate(dateCopy.getDate() + 1);
	var beforeComponent = 'before:' + historicalDate(dateCopy, yearsInThePast);

	var baseURL = 'https://mail.google.com/mail/u/1/#search/';
	var combinedURL = baseURL + encodeURIComponent(afterComponent) + '+' + encodeURIComponent(beforeComponent);

	return combinedURL;
}

function historicalDate(date, yearsInThePast) {
	var year = date.getFullYear() - yearsInThePast;
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + '/' + month + '/' + day;
}

Template.bottle.helpers({
    historicalURLs: function() {
        var histories = [];
        // TODO(seanrose): un-hardcode numYears
        var numYears = 4;
        var currentDate = new Date();

        for (var i = numYears; i > 0; i--) {
        	histories.push({
        		text: i + ' ' + (i == 1 ? 'year' : 'years') + ' ago',
        		url: historicalSearchURL(currentDate, i)
        	});
        }

        return histories;
    }
});
