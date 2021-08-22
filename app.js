const express = require("express");
const bparser = require("body-parser");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const { METHODS } = require("http");

const app = express();

app.use("/",express.static(__dirname+"/public"));
app.use(bparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const email = req.body.email;
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    // console.log(email,firstname,lastname);

    const data ={
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstname,
                    LNAME : lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/76de193743";
    const options = {
        method : "POST",
        auth :"HARRY:0cf8cd37b26c229940a6c907f9aa7e2a-us5"
    }

    const request =  https.request(url,options,function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});





app.listen(3000,function(){
    console.log("port is created at 3000");
});


// list id 76de193743
// api key 0cf8cd37b26c229940a6c907f9aa7e2a-us5