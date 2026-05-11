const User = require("../models/user.js");//requiring listing model

module.exports.signumForm =(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup = async(req,res,next) => {
    try{
        let {username,email,password} = req.body;
        let newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);//just stores the new user in the database
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to wonderlust!");
            res.redirect("/listings");
            return;
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login = async(req,res) =>{
    req.flash("success","Welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","logout successful!");
        res.redirect("/listings");
    })
}