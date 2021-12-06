const dotenv=require('dotenv').config();
const express=require("express");
const app=express();
app.use(express.json());
app.use(express.text());
// app.get("/",function(req,res){res.send("Hello World");});
const{MongoClient}=require("mongodb");
const client=new MongoClient(`${process.env.API_URL}`);

app.post("/",function(req,res){
    client.connect().then((nClient)=>{
        const db1=nClient.db();
        db1.collection("Contact Details").insertOne({name :req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        portfolio: req.body.portfolio});
        }).then(()=>{
            console.log("Contact Added");
        });
        res.send("Received data");
});

app.get("/",function(req,res){
client.connect().then((mClient)=>{
const db=mClient.db();
db.collection("Contact Details").findOne({},
    function(err, result) {
        if (err) throw err;
        res.json(result);
    }
    );
});
});

app.listen(7000,function(){
    console.log("Server started on port 7000");
});