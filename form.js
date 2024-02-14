const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const mongoose= require('mongoose')
//const Library =require('./schema')
 mongoose.connect('mongodb://0.0.0.0:27017')

 const schema1=new mongoose.Schema({
    Name:String,
    Email:String,
    Contact:Number,
    Desire: {
        type: String,
        enum: ['Workshop', 'Private Event', 'Group Event','Take a pottery class'], 
    },
    Query:String,
}) 
const regist=new mongoose.model("regist",schema1);


app.get('/record',async function(req, res) {
    const data= await regist.find({})
    res.json(data);
 })

 app.get('/findname/:Name', async function(req, res) {
    var found = await regist.findOne({"Name": req.params.Name});
    res.send(found);
});


app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("C:/Users/REEVA/OneDrive/Documents/project/contact.html"))
app.get('/',function (req,res){
 res.sendFile("C:/Users/REEVA/OneDrive/Documents/project/contact.html")
    //res.download("main.js")
 
})
app.post('/',function (req,res){
    const record= req.body
    console.log(req.body)
    const doc1=new regist({
        Name:req.body.name,
        Email:req.body.email,
        Contact:req.body.contactNumber,
        Desire:req.body.desire,
        Query:req.body.queries
    })
    doc1.save()
    //const response=Library.create(record)
   // console.log(response)
    res.send(req.body.name+" form filled Successfully")
})
app.listen(8000)