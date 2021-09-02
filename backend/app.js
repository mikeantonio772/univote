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

app.post("/votings/my", auth, (req, res) => {
    var username_hash = crypto.createHash('sha256').update(req.body.username).digest('hex');
    Voting.find({'users_able_to_vote.id':username_hash},(err,result)=>{
        if(err){
            console.log(`[ERR] FINDING VOTES FOR USER: ${err}`);
        }else{
            res.status(200).json(result);
        }
    });
});

app.post("/votings/end", auth, (req, res) => {
    voting_id = req.body.id;
    Voting.findOne({'_id':voting_id},(err,result)=>{
        if(err){
            console.log(`[ERR] QUERYING VOTE ID ${voting_id}: ${err}`);
        }else{
            if ( result.is_active == false){
                res.status(400).send("Voting is already finished");
            }else{
                result.is_active = false;
                console.log(result);
                result.save();
                res.status(200).send();
            }
        }
    });
});

app.get("/votings/all", auth, (req, res) => {
    Voting.find({},(err,result)=>{
        if(err){
            console.log(`[ERR] QUERYING ALL VOTES: ${err}`);
        }else{
            result.forEach(element=>{
                format_date_finish = new Date(element.date_finish);
                if (format_date_finish < Date.now() && element.is_active == true){
                    element.is_active = false;
                    console.log(element);
                }
                element.save();
            });
            res.status(200).json(result);
        }
    });
});

app.get("/votings/:id", auth, (req, res) => {
    voting_id = req.params.id;
    Voting.findOne({'_id':voting_id},(err,result)=>{
        if(err){
            console.log(`[ERR] QUERYING VOTE ID ${voting_id}: ${err}`);
        }else{
            var format_date_finish = new Date(result.date_finish);
            if (format_date_finish < Date.now() && result.is_active == true){
                result.is_active = false;
                result.save();
            }
            res.status(200).json(result);
        }
    });
});

app.post("/votings/vote",auth,(req, res) => {
    voting_id = req.body._id;
    const username_hash = crypto.createHash('sha256').update(req.body.username).digest('hex');
    Voting.findOne({'_id':voting_id, 'users_able_to_vote.id': username_hash},(err,result)=>{
        if(err){
            console.log(`[ERR] FINDING VOTING ID: ${err}`);
        }else{
            if (result.is_active == false){
                console.log(`[ERR] VOTING HAS FINISHED`);
            }else{  
                user = result.users_able_to_vote.find(item =>{
                    return item.id == username_hash;
                });
                if (user.has_voted == false){
                    user.has_voted = true;
                    const candidate_id = req.body.candidate.id;
                    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                        modulusLength: 1024,
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
                    if (result.users_able_to_vote.length == result.votes.length){
                        result.is_active = false;
                    }
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
        }
    });
});

app.post("/votings/create",auth,(req,res)=>{
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
        var format_date_start = new Date(date_start);
        var format_date_finish = new Date(date_finish);
        if (format_date_finish <= format_date_start){
            res.status(400).send("Finish date cannot come first than date start");
        }
        if (format_date_start < Date.now()){
            res.status(400).send("Date start needs to be current date + 1");
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
            var hash = crypto.createHash('sha256').update(element.id).digest('hex');
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