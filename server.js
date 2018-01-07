const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "CArCukndBUfHkolNgVjoY0BAsiTWux80zqFM3MJCKxkf8QKzh+Pw8lS5kffCmwIPAO/OFSSD3g9Sk9NqJ8JbdnmkzUH9Khq9IAY+bASjrtNguUtIzVWL9z5fd+bqYUmdqjyO8nXfMkuRV9y1uivYkQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "2b8ac70d810a18a7d081388573116956",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
  
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});