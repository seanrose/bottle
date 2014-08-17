// after:2014/5/3 before:2014/5/4
function historicalURL(date, yearsInThePast) {
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
        return [
        	{
        		year: 1,
        		url: 'https://mail.google.com/mail/u/1/#search/after%3A2013%2F8%2F17+before%3A2013%2F8%2F18'
        	},
        	{
        		year: 2,
        		url: 'https://mail.google.com/mail/u/1/#search/after%3A2012%2F8%2F17+before%3A2012%2F8%2F18'
        	},
        	{
        		year: 3,
        		url: 'https://mail.google.com/mail/u/1/#search/after%3A2011%2F8%2F17+before%3A2011%2F8%2F18'
        	},
        ];
    }
});


var d = new Date();
console.log(historicalURL(d, 1));
