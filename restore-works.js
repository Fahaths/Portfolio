import fs from 'fs';

const temp = fs.readFileSync('temp.txt', 'utf8');
const page = fs.readFileSync('app/page.jsx', 'utf8');

const startMatch = temp.match(/<section id="works"/);
if (startMatch) {
    const startIndex = startMatch.index;
    const endMatchStr = 'MODULE 4: ROADMAP INDEX';
    const endIndexRel = temp.substring(startIndex).indexOf(endMatchStr);
    
    if (endIndexRel !== -1) {
        let worksContent = temp.substring(startIndex, startIndex + endIndexRel);
        
        // Add reveal-section class to worksContent
        worksContent = worksContent.replace(/<section id="works" className="/, '<section id="works" className="reveal-section ');
        
        // Remove trailing comment dashes that might overlap
        worksContent = worksContent.replace(/\s*\{\/\* -+\s*$/, '');
        
        // Replace <CinematicWorks3D /> in page.jsx with worksContent
        const newPage = page.replace(/<CinematicWorks3D \/>/, worksContent);
        
        fs.writeFileSync('app/page.jsx', newPage, 'utf8');
        console.log('Restored Works section successfully.');
    } else {
        console.log('End of works section not found.');
    }
} else {
    console.log('Start of works section not found.');
}
