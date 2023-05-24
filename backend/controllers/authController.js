import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
    const {email, pwd} = req.body;

    if(!email || !pwd) return res.status(400).json({'message': 'Username and password are required'});

    const foundUser = await User.findOne({email: email}).exec();
    if(!foundUser) return res.sendStatus(401);

    //evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        // const roles = Object.values(foundUser.roles);
        // create JWT
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "role":foundUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            {"email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        // Saving refreshToken
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000}) //  secure: true,
        res.json({accessToken})
    } else {
        res.sendStatus(401);
    }

}

export default handleLogin;