function callNumbers() {
var response = UrlFetchApp.fetch("YOURAPIENDPOINT");
var data = JSON.parse(response.getContentText());

console.log(data.data);

var date = new Date();
var prices = data.data.prices;

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SinkSheetName");

  var expectedHeaders = ["Date"];
  prices.forEach(price => expectedHeaders.push(price.fuelGroupName));

  var lowercaseExpectedHeaders = expectedHeaders.map(header => header.toLowerCase());

  if (sheet.getLastColumn() > 0) {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var lowercaseHeaders = headers.map(header => header.toString().toLowerCase());

    var firstRowIsEmpty = headers.every(header => header === "");

    var headersMissing = lowercaseExpectedHeaders.some(expectedHeader => 
      !lowercaseHeaders.includes(expectedHeader)
    );

    var atLeastOneHeaderMatches = lowercaseExpectedHeaders.some(expectedHeader =>
      lowercaseHeaders.includes(expectedHeader)
    );

    if (!firstRowIsEmpty && headersMissing && !atLeastOneHeaderMatches) {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    } 

    else if (firstRowIsEmpty || (headersMissing && atLeastOneHeaderMatches)) {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    }

  } else {
    // Set headers if the sheet is empty
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
  }


var lastRow = sheet.getLastRow();

sheet.getRange(lastRow + 1, 1).setValue(date);
prices.forEach((price, index) => {
sheet.getRange(lastRow + 1, index + 2).setValue(price.currentPrice);
});
}
