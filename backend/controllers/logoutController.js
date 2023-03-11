import User from "../model/User.js";

export const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // isRefreshToken in DB?

    const foundUser =  await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    // delete the refresh token in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true }) //secure: true - only serves on https
    res.sendStatus(204);
}

export default handleLogout;