import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const jsonFilePath = path.resolve('./public/yourJsonFileName.json');
        try {
            const data = req.body;
            fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
            res.status(200).json({ message: 'JSON updated successfully' });
        } catch (error) {
            console.error('Error writing JSON:', error);
            res.status(500).json({ error: 'Failed to write JSON file' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
