export function fetchLogin(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', 
      },
      body: JSON.stringify( { username } ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
    });
  }
  
  export function getLogin(username) {
    return fetch('/api/session/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json', 
      }
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
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
  
  
  export function sendMessage(message) {
    return fetch('/api/message/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    })
    .catch(function (err) {
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
  
  export function getMessage() {
    return fetch('/api/message/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .catch(function (err) {
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
  