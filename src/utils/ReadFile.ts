import fs from 'fs';
import path from 'path';

export const readFile = (companyName:string) =>
{
    const filePath = path.join(__dirname, '../views/requestEmail.html');
    const source = fs.readFileSync(filePath, 'utf-8');

    const htmltoSend = source.replace(/{{companyname}}/g,companyName);
    return htmltoSend;
}