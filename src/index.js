//require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//config
require('./Config');

//database
require('./database');

//initializations
const app = express();
const cookie = { //COOKIE SESSION
    name: 'session',
    keys: [
        'dehfmsFcejefihw378ew38hSc4grh9mjec783cuaWDXAi3nf54d8a3ocrmaw3rh78c3hmc3mhar8h3mj3a78h38jxd8ewjscrtodmsj37mxdh38whd8ym84hraxwweui',
        'fkhwecJmkfcsimtiwnxd,eugfir4nhwo,sXDWADjdxepoje.euxhf,euzshmuijh,wudhmwyd#XRieur7duiwnhcuidhsecfrwisycfmuw4bfywdycgemt7fecfiemcyihesmchfemf'
    ]
}; 

//redirect http to https
// app.use (function (req, res, next) {
//     if (req.secure) {
//         next();
//     } else {
//         res.redirect('https://' + req.headers.host + req.url);
//     }
// });

//middlewares
app.use(cors()); //ACCESS CONTROL HTTP
app.options("*", cors()); //ACCESS CONTROL HTTP
app.use(bodyParser.urlencoded({extended: false})) //REQUEST IN BODY
app.use(bodyParser.json()) //JSON
app.use(methodOverride('_method')); //FORMS PUT AND DELETE
app.use(cookieSession(cookie)); //COOKIE SESSION
//app.use(express.static(__dirname, { dotfiles: 'allow' } )); //CERTIFICATE

//routes
app.use(require('./Routes/index'));

// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/.../privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/.../cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/.../chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
//     cert: certificate,
//     ca: ca
// };

//front
// app.use(express.static(path.join(__dirname,"Public")));
// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname,'/Public/index.html'));
// });

//documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Starting both http & https servers
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

//Server http
httpServer.listen(process.env.HTTP, () => {
    console.log('HTTP Server listen on port', process.env.HTTP);
});

//Server https
// httpsServer.listen(process.env.HTTPS, () => {
// 	console.log('HTTPS Server listen on port', process.env.HTTPS);
// });