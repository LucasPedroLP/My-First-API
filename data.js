var DB = [];
// var utterance = {
//   greetings: ["HI, OI, HOLA"],
//   commands: ["HELP", "TALK", "AGENT", "AJUDA", "AYUDA", "AGENTE"],
// };

var utterance = ["HI", "OI", "HOLA", "HELLO"];

const setDB = (value) => {
  DB.push(value);
};

const clearDB = () => {
  DB = [];
};

const getDB = () => {
  return DB;
};

const cleanData = (json) => {
  const removeEmpty = (key, value) => {
    var temp;
    if (Array.isArray(value)) {
      temp = value.length > 0 ? value : undefined;
    } else if (value == null) {
      temp = undefined;
    } else if (value === "") {
      temp = undefined;
    } else if (typeof value == "object") {
      temp = Object.values(value).length > 0 ? value : undefined;
    } else {
      return value;
    }
    return temp;
  };

  return JSON.parse(JSON.stringify(json), removeEmpty);
};

exports.setDB = setDB;
exports.getDB = getDB;
exports.clearDB = clearDB;
exports.cleanData = cleanData;

exports.utterance = utterance;
// exports.DB = DB;
