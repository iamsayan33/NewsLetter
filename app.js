const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const firstname=req.body.fn;
const lastname=req.body.ln;
const email=req.body.eid;
const data = {
    members:[
        {
            email_address: email,
            status : "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
}
const jsonData = JSON.stringify(data);
var url="your url"
var options={
    method:"POST",
    auth: " your api key"
}

const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }
    else
    {
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data)
    {
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server started");
})
