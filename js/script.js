var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";

function getQuote() {
	fetch(prefix + quoteUrl, { cache: "no-store" })
		.then(function(resp) {
			return resp.json();
		})
	.then(createTweet);
}

function createTweet(input) {
    if (!Array.isArray(input)) {
        return alert('I\'m sorry, please try again');
    }
    var data = input[0];
    var arrayData = new Array([data]);
    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    	getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    document.querySelector('.quote').innerText = quoteText;
	    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
	    document.querySelector('.tweet').setAttribute('href', tweet);
	}

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});
