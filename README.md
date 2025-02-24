# Google Sheets API Data Importer
<div style="display: flex; width: 100%; max-height: 5vw; align-items: center;">
  <img src="https://github.com/user-attachments/assets/efb16c60-6b0c-4882-a415-bd392bb04116" alt="Google App Scripts Logo" style="max-width: 50%; height: 100%;">
  <img src="https://github.com/user-attachments/assets/cf2aea76-ef26-4908-af80-84c4584fd0bb" alt="Google Sheets Logo" style="max-width: 50%; height: 100%;">
</div>

This Google Apps Script project automatically imports data from an API into a specified Google Sheet, handling header discrepancies and ensuring data integrity.

## Features

- **Automatic Data Import:** Fetches data from an external API and appends it to a Google Sheet.
- **Header Management:**
    - Checks for missing or incorrect headers.
    - Inserts a new header row if necessary.
    - Replaces incorrect headers with the correct ones.
- **Data Appending:** Appends new data to the next available row in the sheet.
- **Automated Triggers:** Supports various triggers to run the script automatically, even without user interaction.

## How to Use

1. **Copy the Code:** Copy the `callNumbers()` function from the `Code.gs` file.
2. **Open Google Sheets:** Open the Google Sheet where you want to import the data.
3. **Open Script Editor:** Go to "Tools" > "Script editor".
4. **Paste the Code:** Paste the copied code into the script editor.
5. **Modify API Endpoint:** Replace the placeholder `YOURAPIENDPOINT` with the actual URL of your API.
6. **Customize Data Fields:**
    - Identify the data fields you want to import from the API response.
    - Modify the `expectedHeaders` array to include the desired field names (e.g., `["Date", "FieldName1", "FieldName2"]`).
    - Update the data appending logic to extract the corresponding values from the `prices` array.
7. 6. **Specify Sheet Name:** Update the sheet name in the following line to match your desired sheet:
   ```javascript
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("YourSheetName");
   ```

## Header Tolerance and Fixing

- **Missing Headers:** If the sheet is empty or the first row doesn't contain the expected headers, the script will add a new header row.
- **Incorrect Headers:** If the first row contains some but not all of the expected headers, the script will replace the entire row with the correct headers.
- **Case-Insensitive Comparison:** The header comparison is case-insensitive.

## Google Apps Script and Triggers

- **Google Apps Script:** This project uses Google Apps Script, a JavaScript-based scripting platform for automating tasks within Google Workspace applications.
- **Triggers:** Triggers allow you to automate script execution based on various events or schedules.
    - **Time-driven Triggers:** Run the script at specific intervals (e.g., hourly, daily, weekly).
    - **From Spreadsheet Triggers:** Run the script when certain events occur in the spreadsheet (e.g., on form submit, on open, on edit).
- **Running Without User Interaction:** Triggers enable the script to run automatically, even when no user is actively viewing the sheet.

## Example API Output

```json
{
  "prices": [
    {
      "fuelGroupName": "VLSFO",
      "changeFromPrev": 3,
      "changeFromPrevPercent": 0.5111,
      "chartScales": [Object],
      "portId": 2615,
      "fuelGroupId": 2,
      "currentPrice": 590,
      "port": [Object]
    },
    {
      "fuelGroupName": "LSMGO",
      "changeFromPrev": 4,
      "changeFromPrevPercent": 0.5848,
      "chartScales": [Object],
      "portId": 2615,
      "fuelGroupId": 5,
      "currentPrice": 688,
      "port": [Object]
    },
    {
      "fuelGroupName": "HSFO",
      "changeFromPrev": 3,
      "changeFromPrevPercent": 0.6316,
      "chartScales": [Object],
      "portId": 2615,
      "fuelGroupId": 7,
      "currentPrice": 478,
      "port": [Object]
    }
  ]
}
```
