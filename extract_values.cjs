const fs = require('fs');

try {
    const html = fs.readFileSync('temp_form_browser.html', 'utf8');

    // Find inputs with name AND value
    const matches = html.matchAll(/<input[^>]*name=["']([^"']+)["'][^>]*value=["']([^"']*)["'][^>]*>/g);

    let output = 'HIDDEN/VALUES:\n';
    for (const match of matches) {
        output += `Name: ${match[1]}, Value: ${match[2]}\n`;
    }

    fs.writeFileSync('zoho_values.txt', output);

} catch (e) {
    console.error(e);
}
