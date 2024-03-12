"use strict";
module.exports = compare;

function compare(word, guess) {
    let matchingChars = 0;
    word = word.toLowerCase();
    guess = guess.toLowerCase();
    for (let index = 0; index < word.length; index++) {
        if (guess.indexOf(word.charAt(index)) !== -1) {
            matchingChars++;
            guess = guess.replace(word.charAt(index), '');
        }
    }
    return matchingChars;
}