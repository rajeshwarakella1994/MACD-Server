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
                    <td>Company with ADP</td>
                    <td>${body.Company_with_ADP}</td>
                </tr>
                <tr>
                    <td>Client Processing Setup</td>
                    <td>${body.prog_type}</td>
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
    })
    res.send("Success");
})

app.listen(PORT, ()=>{
    console.log("Server started on port : ", PORT)
});