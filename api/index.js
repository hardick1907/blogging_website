import express from 'express'
import multer from 'multer';
import cors from 'cors'
import fs from 'fs';
import Post from './models/Post.js'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';



mongoose.connect('mongodb+srv://bhadauriahardick:Papadoc.2@cluster0.f9fin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


const app = express()
const port = 3000;
const uploadMiddleware = multer({ dest: 'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.post('/post',uploadMiddleware.single('file'), async (req,res) =>{
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext;
    
    fs.renameSync(path,newPath);

    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,

    })
    res.json(postDoc);
})

app.get('/post',async (req,res)=>{
    res.json(await Post.find());
})

app.get('/post/:id',async (req,res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id); //add .populate.author to show username also
    res.json(postDoc);
})



app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})