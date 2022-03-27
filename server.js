
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const json = require("json");
const bcrypt = require("bcryptjs");

const app = express();

require("./database/connection");
const UserCollection = require("./models/userSchema");

const PORT = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "./public");
const partialsPath = path.join(__dirname, "./templates/partials");
console.log(staticPath);

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("views", "./templates/views");
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
    res.render("index", {
        link1: "/signup",
        value1: "Sign Up"
    });
});

app.get("/index", (req, res) => {
    res.render("index", {
        link1: "/signup",
        value1: "Sign Up"
    });
});
app.get("/signup", (req, res) => {
    res.render("signup", {
        link1: "/",
        value1: "Sign In"
    });
});
app.post("/index", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await UserCollection.findOne({email: email});
        const passwordMatch = await bcrypt.compare(password, userEmail.password);
        if(passwordMatch)
        {
            res.render("user" ,{
                value1: userEmail.fname + " " + userEmail.lname, 
                value2: "Logout",
                link2: "/"
            });
        }
        else
            res.send("<h1 style='text-align:center; color: red;'>Wrong Password</h1>");
    }catch(err){
        console.log(err);
    }

});

app.post("/signup", async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword)
        {   
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new UserCollection({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hashPassword,
                mobileno: req.body.mobileno,
                dob: req.body.dob,
                state: req.body.state,
                district: req.body.district,
                city: req.body.city,
                gender: req.body.male
            });
            res.render("index", {
                link1: "/signup",
                value1: "Sign Up"
            });
            const data = await user.save();
            
        }
        else{
            res.send("Password is not matching");
        }
    }catch(err){
        res.status(200).send(err);
    }
});


app.listen(PORT, (err) => {
    if(err)
        document.write(err);
    else
        console.log(`App is running at port ${PORT}`);
});