const fs = require('fs');

try {
    const html = fs.readFileSync('temp_form_browser.html', 'utf8');

    // Simple regex to find form action
    const actionMatch = html.match(/action=["']([^"']+)["']/);
    if (actionMatch) {
        console.log('Form Action:', actionMatch[1]);
    } else {
        console.log('Form Action not found');
    }

    // Regex to find inputs with names
    const inputMatches = html.matchAll(/<input[^>]*name=["']([^"']+)["'][^>]*>/g);
    console.log('Inputs:');
    for (const match of inputMatches) {
        console.log(match[0]);
    }

    // Regex for selects
    const selectMatches = html.matchAll(/<select[^>]*name=["']([^"']+)["'][^>]*>/g);
    console.log('Selects:');
    for (const match of selectMatches) {
        console.log(match[0]);
    }

} catch (e) {
    console.error(e);
}
