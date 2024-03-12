const chatWeb = {
  chatPage: function(chat) {
    debugger
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Save the World Team</title>
          <link rel="stylesheet" href="/public/css/chat.css"/>
        </head>
        <body>
        <header class="head">
          <img style='width:50px;height:50px' class="logo" src="/public/images/chacha2.jpg" alt="logo"/>
          <h1>Talk About Some World Secrets!</h1>
        <header>    
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    console.log("---"+JSON.stringify(chat))
    return `<ol class="messages">` + 
    Object.values(chat.messages).map( messages => `
    <li>
      <div class="messages"> 
        <span class="message">(From:${messages.sender}) ${messages.text}</span>
      </div>
    </li>    
    `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') + 
    `</ul>`;
  },
  getOutgoing: function() {
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <label>
              Input your Message:
              <input name="text" placeholder="Input your message">
          </label>
          <input type="hidden" name="sender" value="1"/>
          <button type="submit">Send</button>
        </form>
      </div>
    `
  }
};
module.exports = chatWeb;
