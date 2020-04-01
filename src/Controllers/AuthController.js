const bcrypt = require('bcryptjs');

//MODELS
const User = require('../Models/User');

//EMAILS
const {email} = require('../Mail/mail');


//SIGN UP
exports.signup = async (req, res) => { 

    //form data is received
    let body = req.body;

    //The password is required, before encrypting, verify!
    if(!req.body.password){
        return res.status(401).json({ 
            ok: false,
            error: 'Password is required',
        });
    }

    //a new user instance is created, the password is encrypted
    let user = new User({
        full_name: body.full_name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10)
    });

    //the user is saved in DB
    await user.save({runValidators: true}, async (err, userDB) => {
        var error;
        
        //return errors from user model
        if(err){
            if(err.errors.hasOwnProperty('full_name')){
                error = err.errors.full_name.properties.message
            } else if (err.errors.hasOwnProperty('email')){
                error = err.errors.email.properties.message
            } else if (err.errors.hasOwnProperty('password')){
                error = err.errors.password.properties.message
            } 
            return res.status(401).json({
                ok: false,
                error,
            });
        }

        //the email is sent
        //email: to, subject
        email(userDB, 'Your Account Has Been Created');

        //if all goes well, return the data
        return res.status(201).json({
            ok: true,
            user: userDB
        });
    });
}

//SIGN IN
exports.signin = async (req, res) => {

    //form data is received
    let body = req.body;

    //user is searched in the database
    await User.findOne({email: body.email}, async (err, userDB) => {

        //if an error occurred with the DB
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                error: 'Error searching in DB',
            });
        }

        //if user is not found
        if(!userDB){
            return res.status(401).json({
                ok: false,
                error: 'User not found',
            });
        }

        //if user is found

        //encrypt the password and compare it with the one in the DB
        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(401).json({
                ok: false,
                error: 'Incorrect user or password',
            });
        }
        
        //create the session 
        req.session.id = userDB._id;
        req.session.user = userDB;

        //if all goes well, return the data
        return res.json({
            ok: true,
            user: userDB,
        });

    });
}

//SESSION
exports.session = async (req, res) => {
    console.log("llegue aqui");
    console.log(req.session);
    //if there is anything in the session
    if(req.session && req.session.id){
        let user = req.session.user;
        //the user is logged in
        return res.json({
            ok: true,
            user
        });
    } else {
        //the user is not logged in
        return res.status(401).json({
            ok: false,
            error: 'Not logged in'
        });
    }
}

//LOGOUT
exports.logout = async (req, res) => {
    //delete the session
    req.session = null;

    //return
    return res.json({
        ok:true
    });
}