import express from 'express'
import multer from 'multer';
import cors from 'cors'
import fs from 'fs';
import Post from './models/Post.js'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { UserModel } from './models/User.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'

mongoose.connect('mongodb+srv://bhadauriahardick:Papadoc.2@cluster0.f9fin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const app = express()
const port = 3000;
const uploadMiddleware = multer({ dest: 'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const salt = bcrypt.genSaltSync(10);
const secret = 'q[];4v5q34][v6q3[4v643]509q34895h404vh9rch0][prcu93'


app.use(express.json());
app.use(cors({credentials:true, origin:'http://localhost:5173'})); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());


app.post('/register', async(req, res) => {
    const {username, password,confirmPassword,email,firstName,lastName} = req.body;
    try{
        await UserModel.create({
            username, 
            password:bcrypt.hashSync(password, salt),
            confirmPassword: bcrypt.hashSync(confirmPassword, salt),
            email,
            firstName,
            lastName
        });
    }
    
    catch(e){
        res.status(422).json(e);
    }
})

app.post('/login',async (req,res)=>{
    const{username, password} = req.body
    const userDoc = await UserModel.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password)

    if(passOk){
        jwt.sign({username,id:userDoc._id},secret,{} ,(err,token)=>{
            if(err) throw (err)      
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            })    
        })
    }

    else{
        res.status(400).json('Wrong Credentials')
    }
})

app.get('/profile',(req,res)=>{
    
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info) 
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;

    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
            const { title, summary, content,} = req.body;

            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id
            });
    
        res.json(postDoc) 
    })    

});

app.get('/post',async (req,res)=>{
    res.json(await Post.find()
        .populate('author',['username'])
        .sort({createdAt:-1})
        .limit(20)
    );
})

app.get('/post/:id',async (req,res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author')  //add .populate.author to show username also
    res.json(postDoc);
})









app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})