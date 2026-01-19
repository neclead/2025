// COPY THIS CODE INTO YOUR GOOGLE APPS SCRIPT EDITOR (Extensions > Apps Script)

function doPost(e) {
    // 1. Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // 2. Parse the incoming data
    var data = e.parameter;

    // 3. Append the row to the sheet
    sheet.appendRow([
        new Date(),               // Timestamp
        data['Team Lead'],        // Column B
        data['Lead Email'],       // Column C
        data['Lead Phone'],       // Column D
        data['Teammate'],         // Column E
        data['Extra Members'],    // Column F
        data['Total Amount'],     // Column G
        data['Business Idea'],    // Column H
        data['Extra Details']     // Column I
    ]);

    // 4. Return success response
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

// REMEMBER TO DEPLOY:
// 1. Click "Deploy" > "New deployment"
// 2. Select "Web app"
// 3. Execute as: "Me"
// 4. Who has access: "Anyone"
// 5. Click "Deploy" and copy the URL.
