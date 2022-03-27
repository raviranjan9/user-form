const mongoose = require("mongoose");

const db = "mongodb+srv://Project1:prj123@cluster0.ncbxm.mongodb.net/userManagement?retryWrites=true&w=majority";
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
});