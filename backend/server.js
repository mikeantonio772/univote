const express = require('express');
var mongoose = require('mongoose');
const app = express();

var dbUrl  = "mongodb+srv://root:tGg3kjJ1Qhcgpl55@cluster0.l7fx4.mongodb.net/univote";
mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true}, (err) => { 
    console.log('mongodb connected',err);
})

const Usuario = mongoose.model('Usuario', { matricula: String , nome: String, email: String});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
    console.log('listening on 3000');
})

//login endpoint
app.get('/sso',function(req,res){
    res.sendFile(__dirname + '/login.html');
})

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/login',function(req,res){
    Usuario.findOne({ matricula:req.body.j_username}, (err,user)=>{
        if( err ){
            console.log(err);
        }else if(!user){
            const usuario = new Usuario({matricula:req.body.j_username})
            usuario.save().then(() => console.log("User created"));
            res.send("Usuario conectado");
        }else{
            res.send("Usuario logado, bem vindo");
        }
    })
    console.log(req.body);
})
