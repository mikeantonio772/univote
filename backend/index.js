const https = require("http");
const app = require("./app");
var fs = require('fs');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
const server = https.createServer(options,app);

const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () =>{
    console.log(`[LOG] SERVER RUNNING ON PORT ${port}`);
});