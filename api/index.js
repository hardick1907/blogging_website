import express from 'express'
import multer from 'multer';
import cors from 'cors'
import fs from 'fs';
import Post from './models/Post.js'
import mongoose from 'mongoose';



mongoose.connect('mongodb+srv://bhadauriahardick:Papadoc.2@cluster0.f9fin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


const app = express()
const port = 3000;
const uploadMiddleware = multer({ dest: 'uploads/' })

app.use(cors()); 



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



app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})