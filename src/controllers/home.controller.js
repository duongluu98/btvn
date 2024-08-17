module.exports = {
    index: (req, res, next) => {
        const title = "<i>F8 - Lập trình</i>"
        const subTitle = "Duong Luu"
        const users = [
            "User 1",
            "User 2",
            "User 3",
            "User 4"
        ]
        const status = false
        // something()
        // try {
        //     const a = 0
        //     if(!a) {
        //         const error = new Error("a khong phai")
        //         error.status = 400
        //         throw error
        //     }

        // } catch(e) {
        //     return next(e)
        // }
        // return next(new Error("a khong phai la so duong"))
        //doc cookies
        // console.log(req.cookies);
        //set cookies
        // res.cookie("email", "duongluu@gmail.com",{
        //     path: "/",
        //     maxAge: 86400,
        //     httpOnly: true,
        // })
        // // res.clearCookie() //xoa tat ca cookie
        // res.cookie("email", "", {
        //     expires: new Date()
        // }) // xoa 1 cookie
        req.session.message = "hoc js"
        res.render("home/index", {title, subTitle, users})
    }
}