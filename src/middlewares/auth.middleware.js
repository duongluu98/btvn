// trong express middleware là 1 func
module.exports = (req, res, next) => {
    const isAuthenticated = true
    if(!isAuthenticated) {
        return res.redirect("/auth/login")
    }
    req.user= "duog luu"
    next() //cho phép request đi tiếp
}