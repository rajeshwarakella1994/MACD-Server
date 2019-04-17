const PORT = 8888;

const {mailOptions, sendMail} = require("./mail");
var express = require('express');
var bodyParser = require('body-parser')

var cors = require('cors');
var app = express();

app.use(cors());

app.use(bodyParser.json())

app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get("/kishore", (req, res)=>res.send({greet: "Hello Kishore"}));
app.post("/apirequest", (req, res)=>{
    console.log(req.body);
    const body = req.body;
    sendMail({
        ...mailOptions,
        html: `Existing Company ? <b>${body.option}</b>`
    })
    res.send("Success");
})

app.listen(PORT, ()=>{
    console.log("Server started on port : ", PORT)
});