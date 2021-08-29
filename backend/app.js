const express = require("express");
require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}));

app.post("/register", async (req,res)=>{
    try{
        const {username,password,access_level,email,first_name,last_name} = req.body;
        if(!(username && password)){
           res.status(400).send("username and password are required"); 
        }
        const userExists = await User.findOne({username});
        if (userExists){
            return res.status(409).send("This username is currently being used");
        }
        const emailExists = await User.findOne({email});
        if (emailExists){
            return res.status(409).send("This email is currently being used");
        }

        var expiration = null;
        if (access_level == "special"){
            var currDate = moment().add(30,'days');
            expiration = moment(currDate.toString());
        }
        encryptedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username: username.toLowerCase(),
            password: encryptedPassword,
            access_level: access_level,
            access_level_expiration: expiration,
            email: email.toLowerCase(),
            first_name: first_name,
            last_name: last_name
        });

        const token = jwt.sign(
            {user_id: user._id, username},
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
        );
        user.token = token;
        res.status(201).json(user);
    }catch (err) {
        console.log(`[ERR] USER CREATION: ${err}`);
    }
});

app.get('/login',function(req,res){
    res.sendFile(__dirname + '/public/login.html');
})

app.post("/login", async (req,res)=>{
    console.log(req.body);
    try{
        const username = req.body.j_username;
        const password = req.body.j_password;
        if(!(username && password)){
            res.status(400).send("username and password are required");
        }
        const user = await User.findOne({username});
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {user_id: user._id, username},
                process.env.TOKEN_KEY,
                {expiresIn: "2h",}
            );
            user.token = token;
            const url = '/login?username=' + user.username + '&token=' + user.token;
            res.redirect(url);
        }else{
            res.status(400).send("Invalid Credentials");
        }
    } catch (err){
        console.log(`[ERR] USER LOGIN: ${err}`);
    }
});

app.get("/welcome", auth, (req, res) => { 
    res.status(200).send("Welcome 🙌 ");
});

module.exports = app;