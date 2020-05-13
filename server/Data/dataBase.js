const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lombardas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const invoiceSchema = new mongoose.Schema({
    contractNumber: String,
    startDate: Date,
    amount: Number,
    endDate: Date,
    returnDate: Date,
    comments: String
})

const lombardSchema = new mongoose.Schema({
    companyName: String,
    password: String,
    data: []
});

const Lombard = mongoose.model("lombard", lombardSchema);

function getCurrentDate(){
    const currentDate = new Date();
    console.log(currentDate.toLocaleDateString("en-EU"));
    
}

exports.getInvoiceByName = function(name, callback){
    Lombard.findOne({companyName: name}, (err, client) => {
        if (!err){
            callback(client)
        }
    });
}


exports.getInvoice = function (id, callback){
    Lombard.findById(id, (err, client) => {
        if(!err){
            callback(client);
        }
    })
}

exports.addInvoiceByName = function (name, entry){
    Lombard.findOneAndUpdate({companyName:name}, {$push:{data:entry}}, (err, client) => {
        if(err){
            console.log("Error while inserting entry to " + id + " error = " + err);
        } else {
            console.log("inserted entry successfuly");
            
        }
    });
}

exports.addInvoice = function (id, entry){
    Lombard.findOneAndUpdate({_id:id}, {$push:{data:entry}}, (err, client) => {
        if(err){
            console.log("Error while inserting entry to " + id + " error = " + err);
        } else {
            console.log("inserted entry successfuly");
            
        }
    })
} 

exports.deleteInvoice = function (name, contractNo, callback){
    Lombard.findOneAndUpdate({companyName:name}, {$pull:{data:{contractNumber:contractNo}}}, (err) => {
        callback(err);
        if (err){
            console.log("Error while deleting entry from " + id + " error = " + err);
        } else {
            console.log("successfuly deleted");
            
        }
    })
}

exports.addUser = function (company, callback){
    const newUser = new Lombard({
        companyName: company.companyName,
        password: company.password,
        data: []
    });
    newUser.save((err, user) => {
        if(!err){
            callback(user._id);
        }
    });
}