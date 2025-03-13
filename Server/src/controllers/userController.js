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
let handleGetAllUsers = async (req, res) => {
    let Id = req.query.id; //ALL ID
    let allusers = await userService.getAllUser(Id);
    console.log(allusers);
    if(!Id) {
        return res.status(200).json({
            message: 'Missing requires parameter',
            errCode: 1,
            alluser: {},
        })
    }
    return res.status(200).json({
        message: 'OK',
        errCode: 0,
        allusers,
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}