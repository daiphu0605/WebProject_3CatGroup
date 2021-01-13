let account = require('../models/account');
const nodemailer = require("nodemailer");

exports.forgetPage = (req, res, next) =>{
    res.render('forget_pass', {layout: 'layout_sign'});
}

exports.forgetHandler = (req, res, next) => {
    var email = req.body.email;
    account.isEmailActive(email, (result) => {
        if (!result) { 
            return res.render('forget_pass', {layout: 'layout_sign', ErrorMessage: "Email is not existed"});
        }
        changePass(email, (result) =>{
            if (result) {
                return res.render('forget_pass_con', {layout: 'layout_sign'});
            }
            else {
                return res.render('forget_pass', {layout: 'layout_sign', ErrorMessage: "Can not sent email."});
            }
        });
    });
}

function randString(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=-*';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


changePass = (email, response) => {
   var newPass = randString(8);
   account.changePass(email, newPass, (result) => {
      if (result) {
         sendEmail(email, newPass);
      }
      return response(result);
   });
}

sendEmail = (email, newPass) => {
   let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
            user: process.env.SHOP_GMAIL,
            pass: process.env.SHOP_PASS
      }
   });
   var html = "Hello,<br>";
   html += "Your password has been reset!.<br>";
   html += "Your new password is <span>" + newPass + "<span>.<br>";
   html += "Please sign in and change your password!<br>"
   html += "Thank you for using our service."
   var mailOptions={
      from : process.env.SHOP_GMAIL,
      to : email,
      subject : "Reset password of your account at 3CatsProject",
      html : html
  }
  transporter.sendMail(mailOptions, function(error, response){
   if(error){
           console.log(error);
       res.end("error");
   }else{
           console.log("Message sent: " + response.message);
       res.end("sent");
       }
   });
}


