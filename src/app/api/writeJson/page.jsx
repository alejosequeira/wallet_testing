import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.resolve('../../../components_second/sign_typedData/msgParams.json');
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    res.status(200).json({ message: 'JSON updated successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
  return (
    <div>
        <h1>Get msgParams</h1>
        <p>aaaaaaaaaaaaaaa</p>
    </div>
  )
}
