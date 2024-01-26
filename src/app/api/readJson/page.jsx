import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
  const filePath = path.resolve('../../../components_second/sign_typedData/msgParams.json');
  const json = fs.readFileSync(filePath, 'utf8');
  res.status(200).json(JSON.parse(json));
  return (
    <div>
        <h1>Get msgParams</h1>
        <p>aaaaaaaaaaaaaaa</p>
    </div>
  )
}
