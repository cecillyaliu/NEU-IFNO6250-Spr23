"use strict";
function compare( word, guess ) { 
  const saveChars = {};
  let num = 0;
  word = word.toLowerCase();
  guess = guess.toLowerCase(); 
  for (let i = 0; i < word.length; i++) {      
    for (let j = 0; j < guess.length; j++) {
      if (word.charAt(i) == guess.charAt(j)) {
        if (!saveChars.hasOwnProperty(word.charAt(i))) {
          saveChars[word.charAt(i)] = 1;
          guess = guess.slice(0,j) + guess.slice(j+1);
        } else {
          saveChars[word.charAt(i)]++;
          guess = guess.slice(0,j) + guess.slice(j+1);
        }
      }
    }
  }
  for (let k in saveChars) {
    num+=saveChars[k];
  }
  return num;

}

module.exports = compare;
