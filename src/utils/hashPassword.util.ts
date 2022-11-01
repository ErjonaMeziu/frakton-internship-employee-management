 const bcrypt = require('bcrypt');

export const HashPassword = async (password: string) =>
{
    return  bcrypt.hash(password, 10);
}
