const jwt = require('jsonwebtoken');

export const generateJWT = async  (userName: string, role: string) =>
{
     const accessToken = jwt.sign(
         {
             UserInfo: {
                 username: userName,
                 role: role,
             },
         },
         process.env.ACCESS_TOKEN_SECRET
    );
    
    return accessToken;
    
}