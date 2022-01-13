//const APIKey = "f961225285bffe599719bdc5bd6357f0-us20";
//const audience = "us20-f121839519-abea3407d0@inbound.mailchimp.com";
//jshint esversion:6
const express  = require("express");
const bodyParser  = require("body-parser");
const request  = require("request");
const https  = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
res.sendFile(__dirname +  "/signup.html");
})

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName ,
                    LNAME : lastName
            }

        }
    ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/413fda8e42";

    // const mailchimp = require("@mailchimp/mailchimp_marketing");

    // mailchimp.setConfig({
    // apiKey: "f961225285bffe599719bdc5bd6357f0-us20",
    // server: "https://us20.admin.mailchimp.com",
    // });

    //     function run() {
    //     const response = mailchimp.ping.get();
    //     console.log(response);
    //     }

      
    //     run();


    const options = {
        method :"POST",
        auth : "shaimuli:f961225285bffe599719bdc5bd6357f0-us20"
    }

     const request  = https.request(url, options , function(response){
         if (response.statusCode === 200){
             res.send("success!!!");
         }
         else{
             res.send("please tryu again");
         }

        
        response.on("data", function(data){
        console.log(JSON.parse(data));
        })
     })

    request.write(jsonData);
    request.end();
    
     });

app.listen(process.env.PORT || 3000,function(){

    console.log("start listenming port 3000");
})

//Audience ID
//413fda8e42

//APIKey
//f961225285bffe599719bdc5bd6357f0-us20

// const app = express();
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.get("/" , function(req,res){
// res.sendFile(__dirname + "/signupy.html");
// });

// app.post("/",function(req,res){
//     console.log(req.body);
//     res.send("Thanks for posting that!");
// });

// app.listen(3000 , function(){
//     console.log("server is running on port 3000");
// });