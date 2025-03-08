import db from "../models/index"
let handleLogin = (useremail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(useremail);
            if(isExist) {

            }
            else {
                userData.errCode = 1;
                userData.errMsg = "Your's email isn't exits";
                resolve(userData)
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (useremail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: useremail
                }
            })
            if(user) {
                resolve(true)
            } else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleLogin: handleLogin
}