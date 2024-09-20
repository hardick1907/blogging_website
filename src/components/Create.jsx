import { useState } from 'react';
import './Create.css'
import TipTap from './TipTap';

export function Create (){
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');

    async function createNewPost(ev){

        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);

        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:3000/post',{
            method: 'POST',
            body: data,
        });
        
        console.log(await response.json())
    }

    return(

        <form className='create' onSubmit={createNewPost}>
            <input className="form-input" type="title" placeholder={'Title'} 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}/>
            <input className="form-input" type="summary" placeholder={'Summary'}
            value={summary}
            onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
            onChange={ev => setFiles(ev.target.files)}/>
            <TipTap 
            value={content}
            onChange={ev => setContent(ev.target.value)}/>
            <div  className='post-done'><button>Post</button></div>
            
        </form>
    );

}