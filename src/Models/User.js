const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

//Regular expression for email
let email_match = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


let UserSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [email_match, 'Invalid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, {
    versionKey: false
});

//Don't show password when the user information is extracted
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator, { message: '{PATH} alredy exists' });

//exports
module.exports = mongoose.model('User', UserSchema);