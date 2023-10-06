const express = require("express");
const router = express.Router();
const data = require("../data");

router.post("/", (req, res, next) => {
  //   var msgTxt = req.body.replymessages.text;
  var msgTxt = req.body.inputMessage.text;
  response.botState = "MOREDATA";
  response.intent = "none";
  response.replymessages[0].text =
    "This is a test. To Talk to an agent, please say 'Human'";
  if (data.utterance.includes(msgTxt.toUpperCase())) {
    response.replymessages[0].text = "How can I help You??";
  } else if (msgTxt.toUpperCase().includes("HUMAN")) {
    response.replymessages[0].text = "In no time an agent will talk to you!!";
    response.intent = "transferToAgent";
    response.botState = "COMPLETE";
  }
  res.status(200).json(response);
});

var request = {
  botId: "Simple ChatBot",
  botVersion: "First",
  botSessionId: "f5ff3e62-31c7-4e46-b1c1-b404914fd9d7",
  inputMessage: {
    type: "Text",
    text: "Hi",
  },
  languageCode: "en-us",
  botSessionTimeout: 4320,
  genesysConversationId: "c2689121-9fde-4ea9-9c71-a5a624cead29",
};

var response = {
  replymessages: [
    {
      type: "Text",
      text: "",
    },
  ],
  botState: "MOREDATA",
  intent: "<<CAMBIAR>>",
};

module.exports = router;
