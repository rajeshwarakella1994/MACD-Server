const PORT = 8899;

const {mailOptions, sendMail} = require("./mail");
var express = require('express');
const serveIndex = require("serve-index");
const multer = require("multer");
const fs = require("fs");
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    // filename: function (req, file, cb) {
    //   cb(null, file.originalname)
    // }
  })
  const upload = multer({storage: storage})

var cors = require('cors');
var app = express();    

app.use(cors());
let config = {
    fsRoot: __dirname,
    rootName: 'Root folder',
    // port: '3020',
    // host: process.env.HOST || 'localhost'
  };
  
//   let filemanager = require('@opuscapita/filemanager-server').middleware;
//   filemanager.server.run(config);
//   app.use("/filemanager", filemanager(config))
// var fileManager = require('express-file-manager');
 
// app.use('/filemanager', fileManager("./uploads", {}));

// app.use(bodyParser.json())
app.use("/documents", express.static("./uploads"), serveIndex("./uploads", {icons: true}))
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
});
app.get("/kishore", (req, res)=>res.send({greet: "Hello Kishore"}));
app.post("/apirequest", upload.array("files"), (req, res)=>{
    console.log(req.body);
    console.log(req.files);
    const body = req.body;
    const files = req.files;
    const fields = [{name: "Company name", key: "company_name"}, 
                    {name: "Processing Region", key: "processing_region"}, 
                    {name: "Company Codes", key: "company_codes"},
                    {name: "Contact Person", key: "contact_name"},
                    {name: "Contact Title", key: "contact_title"},
                    {name: "Contact Phone", key: "contact_phone"},
                    {name: "Contact Email", key: "contact_email"},
                    {name: "Date", key: "date"},
                    {name: "New Program Type", key: "program_type1"},
                    {name: "Program to Modify", key: "program_type2"},
                    {name: "Other", key: "program_type3"},
                    {name: "Company with ADP", key: "Company_with_ADP"},
                    {name: "Client Processing Setup", key: "processing"},
                    {name: "PLD Company", key: "PLD"},
                    {name: "Labour Distribution Reporting", key: "LDR"},
                    {name: "Mobile Company", key: "ADP_Mobile"},
                    {name: "Pay Frequency", key: "pay_frequency"},
                    {name: "Request Frequency", key: "req_frequency"},
                    {name: "Payroll Version", key: "payroll_version"},
                    {name: "No. of Pays", key: "approx_pays"},
                    {name: "No. of Controls", key: "number_controls"},
                    {name: "Annual Revenue", key: "annual_revenue"},
                    {name: "Multiple Regions", key: "Multi_Regions"},
                    {name: "Critical Project", key: "Criticality"},
                    {name: "Scope", key: "scope"},
                    {name: "Functional Requirements", key: "functional_scope"},
                    {name: "Special Calcs", key: "calcs"},
                    {name: "Existing Custom Net Setup", key: "existing_custom_net"},
                    {name: "Custom Reports", key: "custom_report"},
                    ]

    const template = fields.reduce((agg, val)=>`
            ${agg}
            <tr>
                <td>${val.name}</td>
                <td>${body[val.key] || ""}</td>
            </tr>`,"");
    sendMail({
        ...mailOptions,
        cc: `${body.contact_email}`,
        attachments: files.map(file=>({filename: file.originalname, path: file.path})),
        subject: `Custom Majors Request for ${body.company_name}`, // Subject line
        html: ` <head>
                <style>
                    table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                            }
        
                    td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                            }
        
                    th{
                    height: 50px;
                    }
                </style>
                </head>
                <body>
        
                <table>
                <col width="80">
                <col width="600">
  
                ${template}
  
                </table>
                </body>
               `
    }).then(d=>{
        files.forEach(file=>fs.unlinkSync(file.path));
        res.send({msg: "Successfully sent mail"});
        console.log("Successfully sent mail");
    }).catch(e=>{
        files.forEach(file=>fs.unlinkSync(file.path));
        console.error("Error : ", e);
        res.send({error: e})
    })
})

app.listen(PORT, ()=>{
    console.log("Server started on port : ", PORT)
});