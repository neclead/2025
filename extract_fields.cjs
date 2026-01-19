const fs = require('fs');

try {
    const html = fs.readFileSync('temp_form_browser.html', 'utf8');

    // Find any https://forms.zoho URL or relative action
    const urlMatches = html.match(/https:\/\/forms\.zohopublic\.in\/[^"'\s]+/g);
    let output = '';
    if (urlMatches) {
        output += 'URL:\n' + urlMatches[0] + '\n\n';
    } else {
        output += 'URL: Not found\n\n';
    }

    output += 'FIELDS:\n';
    const inputMatches = html.matchAll(/name=["']([^"']+)["']/g);
    for (const match of inputMatches) {
        output += match[1] + '\n';
    }

    fs.writeFileSync('zoho_details.txt', output);

} catch (e) {
    console.error(e);
}
