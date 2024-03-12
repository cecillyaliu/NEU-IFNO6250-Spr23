// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { username } ),
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

export function getLogin(username) {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    }
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
};

export function deleteSession() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json();
  });
};


export function putWord(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); 
  });
};

export function getWord() {
  return fetch('/api/word/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); 
  });
};

export function getWordByWordFor() {
  const word = wordFor[loggedInUser];
  const storedWord = word ? word : "None";
  return Promise.resolve({ storedWord });
}


export function loginStatusCheck() {
  return getLogin()
    .then((data) => {
      // user is logged in if data.username exists
      if (data.username) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      // handle network error or any other error
      return false;
    });
}
