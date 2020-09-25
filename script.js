"use strict"

// GET QUOTE
async function getQuote() {
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

    } catch(error) {
        console.log("The quote failed", error)
    }
}


//ON LOAD
getQuote();