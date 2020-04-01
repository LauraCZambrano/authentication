const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
   // "auth": {"authSource": ""},"user": "","pass": "",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is Connected'))
    .catch(err => console.log(err));