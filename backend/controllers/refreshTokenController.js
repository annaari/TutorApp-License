import User from '../model/User.js';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    console.log(foundUser);
    if(!foundUser) return res.sendStatus(403);

    //evaluate jwt
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            const roles = Object.values(foundUser.roles);
            //console.log('access')
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )

            res.json({ accessToken });
        }
    )

}

export default handleRefreshToken;