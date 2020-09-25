"use strict"

const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// GET QUOTE
async function getQuoteFromApi() {
    showLoadingSpinner();
    const proxyUrl = 'https://sheltered-shelf-27449.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // Ensures either author name or Unknown appears rather than a blank author
        if (data.quoteAuthor === '') {
            authorText.innerText = "-Unknown-"
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //Reduces the font size for quotes longer than 50 characters
         if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
         } else {
             quoteText.classList.remove('long-quote');
         }
        quoteText.innerText = data.quoteText;

        removeLoadingSpinner();

    } catch (error) {
        getQuoteFromApi();
    }
}

// TWEET QUOTE
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
};

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);



//ON LOAD
getQuoteFromApi();
