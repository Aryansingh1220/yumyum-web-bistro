import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageDir = path.join('public', 'images', 'menu');

// Create directory if it doesn't exist
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const images = {
    'truffle-risotto.jpg': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    'beef-carpaccio.jpg': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
    'chocolate-souffle.jpg': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    'signature-martini.jpg': 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=800&q=80',
    'seared-scallops.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    'artisan-cheese-plate.jpg': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    'pan-seared-salmon.jpg': 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80',
    'caprese-salad.jpg': 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80',
    'tiramisu.jpg': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    'craft-old-fashioned.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    'grilled-octopus.jpg': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    'classic-mojito.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    'new-york-cheesecake.jpg': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
};

const downloadImage = (filename, url) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(imageDir, filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Successfully downloaded ${filename}`);
                resolve();
            });
        }).on('error', err => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
};

async function downloadAllImages() {
    console.log('Starting image downloads...');
    
    for (const [filename, url] of Object.entries(images)) {
        try {
            await downloadImage(filename, url);
        } catch (error) {
            console.error(`Error downloading ${filename}:`, error.message);
        }
    }
    
    console.log('All downloads completed!');
}

downloadAllImages(); 