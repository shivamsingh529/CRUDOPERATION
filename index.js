const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const { v4 : uuidv4 } = require('uuid');
uuidv4();


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
// server ke pass koi naya data aayega toh usshe parse nhi kar payega usshe parse karne ke liye urlencoded:true
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));


let posts = [
    {
        id : uuidv4(),
        username : "Singh",
        content : "code and chill"
    },
    {
        id : uuidv4(),
        username : "prakash",
        content : "Chitkara University"
    },
    {
        id : uuidv4(),
        username : "Shivam",
        content : "Chitkara University"
    }
];

app.get("/",(req,res)=>{
    res.send("http://localhost:8000/posts");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", { post });
})

app.post("/posts",(req,res)=>{
    let { username , content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.send("Post is working...");
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs" , { post });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.listen(8000,()=>{
    console.log(`Server is running on 8000`);
});