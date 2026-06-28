const fs = require('fs');
const path = require('path');

const filesToUpdate = ['index.html', 'generate.js', 'script.js'];

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Replace .png and .jpg extensions with .webp
        content = content.replace(/\.png/g, '.webp');
        content = content.replace(/\.jpg/g, '.webp');
        content = content.replace(/\.jpeg/g, '.webp');
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated references in ${file}`);
    }
});
