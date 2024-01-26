// import React, { useState } from 'react';
// import fs from 'fs';

// function page() {
//   const [json, setJson] = useState(JSON.parse(fs.readFileSync('../../components_second/sign_typedData/msgParams.json')));

//   const handleJsonChange = (event) => {
//     setJson(JSON.parse(event.target.value));
//     fs.writeFileSync('../../components_second/sign_typedData/msgParams.json', JSON.stringify(json));
//   };

//   return (
//     <div>
//       <textarea value={JSON.stringify(json)} onChange={handleJsonChange} />
//     </div>
//   );
// }

// export default page;
