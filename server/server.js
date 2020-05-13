const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dataBase = require(__dirname + "/Data/dataBase.js")

const app = express();

// app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json({limit:"1mb"}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.listen(5000, () => {
    console.log("server is running on port 5000");
});

app.get("/:companyName", (req, res) => {

    console.log("CompanyName = " + req.params.companyName);

    dataBase.getInvoiceByName(req.params.companyName, (client) =>{
        // const datediff = dateDiffInDays(new Date(client.data[0].contractInit), new Date());
        // console.log("difference between two dates " + datediff);
        
        res.send(JSON.stringify(client));
    });
    
    
    // dataBase.getInvoice("5eafc82c806f842aecebaf62", (client) =>{
    //     const datediff = dateDiffInDays(new Date(client.data[0].contractInit), new Date());
    //     console.log("difference between two dates " + datediff);
        
    //     res.send(JSON.stringify(client));
    // });
});

app.get("/part", (req, res) => {
    dataBase
})

app.post("/data/:companyName", (req,res) => {
    const entry = req.body;

    dataBase.addInvoiceByName(req.params.companyName, entry);

    res.send("All ok");
    
});

app.post("/newUser", (req, res) => {
    const user = req.body;
    dataBase.addUser(user, (id) => {
        res.send(JSON.stringify({newId: id}));
    });
    // console.log(user);
    // res.send("Good");
})

app.post("/update", (req, res) => {
    console.log(req.body);
    
})

app.delete("/deleteInvoice/:companyName/:id", (req, res) => {
    dataBase.deleteInvoice(req.params.companyName, req.params.id, (err) => {
        if (!err){
            res.send("Successfuly deleted")
        } else {
            res.send("error while deleting")
        }
    });
});

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}