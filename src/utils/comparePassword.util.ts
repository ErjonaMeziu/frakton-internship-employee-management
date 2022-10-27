const bcrypt = require('bcrypt');

export const ComparePassword = async (password: string, hashedPassword: string) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(bcrypt.compare(password, hashedPassword));
        } catch (e) {
            reject(e);
        }
    });
};
