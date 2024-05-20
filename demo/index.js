const expiryDateParser = require("../index.js");

expiryDateParser("2050").then((dateString) => {
  console.log(dateString); // "2050-01-01"
});
