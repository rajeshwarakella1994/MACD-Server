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
                <tr>
                    <td>Company Name</td>
                    <td>${body.company_name}</td>
                </tr>
                <tr>
                    <td>Processing Region</td>
                    <td>${body.processing_region}</td>
                </tr>
                <tr>
                    <td>Company Codes</td>
                    <td>${body.company_codes}</td>
                </tr>
                <tr>
                    <td>Contact Person</td>
                    <td>${body.contact_name}</td>
                </tr>
                <tr>
                    <td>Contact Title</td>
                    <td>${body.contact_title}</td>
                </tr>
                <tr>
                    <td>Contact Phone</td>
                    <td>${body.contact_phone}</td>
                </tr>
                <tr>
                    <td>Contact Email</td>
                    <td>${body.contact_email}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>${body.date}</td>
                </tr>
                <tr>
                    <td>New Program Type</td>
                    <td>${body.program_type1}</td>
                </tr>
                <tr>
                    <td>Program to Modify</td>
                    <td>${body.program_type2}</td>
                </tr>
                <tr>
                    <td>Other</td>
                    <td>${body.program_type3}</td>
                </tr>
                <tr>
                    <td>Company with ADP</td>
                    <td>${body.Company_with_ADP}</td>
                </tr>
                <tr>
                    <td>Client Processing Setup</td>
                    <td>${body.processing}</td>
                </tr>
                <tr>
                    <td>PLD Company</td>
                    <td>${body.PLD}</td>
                </tr>
                <tr>
                    <td>Labour Distribution Reporting</td>
                    <td>${body.LDR}</td>
                </tr>
                <tr>
                    <td>Mobile Company</td>
                    <td>${body.ADP_Mobile}</td>
                </tr>
                <tr>
                    <td>Pay Frequency</td>
                    <td>${body.pay_frequency}</td>
                </tr>
                <tr>
                    <td>Request Frequency</td>
                    <td>${body.req_frequency}</td>
                </tr>
                <tr>
                    <td>Payroll Version</td>
                    <td>${body.payroll_version}</td>
                </tr>
                <tr>
                    <td>No. of Pays</td>
                    <td>${body.approx_pays}</td>
                </tr>
                <tr>
                    <td>No. of Controls</td>
                    <td>${body.number_controls}</td>
                </tr>
                <tr>
                    <td>Annual Revenue</td>
                    <td>${body.annual_revenue}</td>
                </tr>
                <tr>
                    <td>Multiple Regions</td>
                    <td>${body.Multi_Regions}</td>
                </tr>
                <tr>
                    <td>Critical Project</td>
                    <td>${body.Criticality}</td>
                </tr>
                <tr>
                    <td>Scope</td>
                    <td>${body.scope}</td>
                </tr>
                <tr>
                    <td>Functional Requirements</td>
                    <td>${body.functional_scope}</td>
                </tr>
                <tr>
                    <td>Special Calcs</td>
                    <td>${body.calcs}</td>
                </tr>
                <tr>
                    <td>Existing Cutom Net Setup</td>
                    <td>${body.existing_custom_net}</td>
                </tr>
                <tr>
                    <td>Custom Reports</td>
                    <td>${body.custom_report}</td>
                </tr>

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