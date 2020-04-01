const nodemailer = require('nodemailer');


//EMAIL
let email = async (to, subject) => {

    //from
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password 
        }
    });

     //to
    var mailOptions = {
        from: 'PROJECT NAME <'+process.env.email+'>',
        to: to.email,
        subject,
        text: "Congratulations "+to.full_name+", you have registered in our system"
    };

    console.log("aqui");
    //sending the email
    transporter.sendMail(mailOptions, function(error, info){
        //if an error occurred with the email
        if (error) {
            console.log("error email");
            console.log(error);
        }
    });


}


module.exports = {
    email
}
