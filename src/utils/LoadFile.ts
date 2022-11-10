import fs from 'fs';
import path from 'path';

export const LoadFile = (file:any,context:any )=> {
    const filePath = path.join(__dirname, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    
    const replaced = source.replace(/{{.+?}}/g, (match:any)=>context[match.slice(2,-2)]);
    return replaced;
};
