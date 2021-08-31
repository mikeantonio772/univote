const express = require("express");
require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("./model/user");
const Voting = require("./model/voting");
const auth = require("./middleware/auth");
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}));

function checkDup(arr) {
    var dup = [];
    var strArray = [];
    var isDup = false;
    arr.forEach(element =>{
        strArray.push(element.id);
    });
    strArray.forEach(str => dup[str] ? isDup = true : dup[str] = true);
    return isDup;
};

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
            expiration = moment(currDate.tocanding());
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

app.post("/my_votings", auth, (req, res) => {
    var username_hash = crypto.createHash('md5').update(req.body.username).digest('hex');
    Voting.find({'users_able_to_vote.id':username_hash},(err,result)=>{
        if(err){
            console.log(`[ERR] FINDING VOTES FOR USER: ${err}`);
        }else{
            res.status(200).json(result);
        }
    });
});

app.post("/vote",auth,(req, res) => {
    voting_id = req.body._id;
    const username_hash = crypto.createHash('md5').update(req.body.username).digest('hex');
    Voting.findOne({'_id':voting_id, 'users_able_to_vote.id': username_hash},(err,result)=>{
        if(err){
            console.log(`[ERR] FINDING VOTING ID: ${err}`);
        }else{
            user = result.users_able_to_vote.find(item =>{
                return item.id == username_hash;
            });
            if (user.has_vote == false){
                user.has_vote = true;
                const candidate_id = req.body.candidate.id;
                const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 2048,
                });
                const encryptedData = crypto.publicEncrypt(
                    {
                      key: publicKey,
                      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                      oaepHash: "sha256",
                    },
                    Buffer.from(req.body.username)
                );
                console.log(encryptedData.toString("base64"));
                const vote = {
                    selected_candidate: candidate_id,
                    encrypted_vote_data: encryptedData.toString("base64"),
                }
                result.users_able_to_vote.find(item =>{
                    if (item.id == username_hash){
                        item = user;
                    }
                });
                result.votes.push(vote);
                result.public_key = publicKey.export({type: 'pkcs1', format: 'pem'});
                result.save();
                const decryptedData = crypto.privateDecrypt({
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },encryptedData
                );
                console.log("decrypted data: ", decryptedData.toString());
                res.status(200).json(privateKey.export({type: 'pkcs1', format: 'pem'}));
            }else{
                res.status(400).send("User already voted");
            }
        }
    });
});

app.post("/create_voting",(req,res)=>{
    try{
        const {
            candidates,
            title,
            users_able_to_vote,
            requested_by,
            date_start,
            description,
            date_finish
        } = req.body;
        if(!(candidates && title && requested_by && date_start && date_finish)){
           res.status(400).send("Missing required data"); 
        }
        if(checkDup(candidates)){
            res.status(400).send("Duplicated candidates");
        }
        if(checkDup(users_able_to_vote)){
            res.status(400).send("Duplicated voters");
        }
        var voting = new Voting;
        voting.title = title;
        voting.requested_by = requested_by;
        voting.date_start = date_start;
        voting.description = description;
        voting.date_finish = date_finish;
        candidates.forEach(element=>{
            voting.candidates.push(element);
        });
        users_able_to_vote.forEach(element =>{
            var hash = crypto.createHash('md5').update(element.id).digest('hex');
            element.id = hash;
            voting.users_able_to_vote.push(element);
        })
        voting.save();
        console.log(voting);
        res.status(201).json(voting);
    }catch (err) {
        console.log(`[ERR] VOTING CREATION: ${err}`);
    }
});



module.exports = app;