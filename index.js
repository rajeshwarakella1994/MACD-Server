const PORT = 8888;

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get("/kishore", (req, res)=>res.send({greet: "Hello Kishore"}))

app.listen(PORT, ()=>{
    console.log("Server started on port : ", PORT)
});