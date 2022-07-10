const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config();


const encoder = bodyParser.urlencoded()
const app = express()
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.MAILSENDER,
        pass:process.env.MAILPASSWORD
    }
})


//app.set("views","./views") //use this line in case when your
//views folder have another name

app.set("view engine","hbs")
app.use(express.static(path.join(__dirname,"./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/products",(req,res)=>{
    res.render("products")
})
app.get("/gallery",(req,res)=>{
    res.render("gallery")
})
app.get("/faq",(req,res)=>{
    res.render("faq")
})
app.get("/contact",(req,res)=>{
    res.render("contact",{"show":false})
})
app.post("/contact",encoder,(req,res)=>{
    let mailOption = {
        from:process.env.MAILSENDER,
        to:req.body.email,
        subject:"Your Query Received!!! : Team Shelter",
        text : "Thanks to Share Your Query with Us!!!\nOur team Will Contact Your Soon\n"
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    mailOption = {
        from:process.env.MAILSENDER,
        to:process.env.MAILSENDER,
        subject:"Query Received!!! : Team Decor",
        text : `
            Name :  ${req.body.name}
            Email :  ${req.body.email}
            Phone :  ${req.body.phone}
            Subject :  ${req.body.subject}
            Message :  ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    res.render("contact",{"show":true})
})


app.listen(process.env.PORT||8000,()=>{
    console.log("Server is Running at PORT 8000...");
})