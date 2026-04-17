const fs = require('fs');
let c = fs.readFileSync('css/style.css', 'utf8');

c = c.replace(/minmax\(280px, 1fr\)/g, 'minmax(240px, 1fr)');
c = c.replace(/\.project-header \{\s*display: flex;\s*justify-content: space-between;\s*align-items: center;/m, 
    '.project-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    flex-wrap: wrap;\n    gap: 10px;');

// Also, ensure slider-container width is fine on mobile. We already did that in the media query (width: 90vw).
// Let's make sure the project-card description is nicely sized.
c = c.replace(/\.project-desc \{\s*font-size: 14px;\s*line-height: 1\.5;/m,
    '.project-desc {\n    font-size: 15px;\n    line-height: 1.6;\n    text-align: justify;');

fs.writeFileSync('css/style.css', c);
