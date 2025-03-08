import userService from "../services/userService"
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: 'Email and password are required'
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        message: userData.errMsg,
        errCode: userData.errCode,
        user: userData.user ? userData.user : {},
    })
}
module.exports = {
    handleLogin: handleLogin
}