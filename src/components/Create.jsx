import { useState } from 'react';
import './Create.css';
import TipTap from './TipTap';
import { useNavigate } from 'react-router-dom';

export function Create() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();

  const handleContentChange = (html) => {
    setContent(html);
  };

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files && files[0]) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
        window.location.reload();
      } else {
        // Handle server errors
        const errorData = await response.json();
        console.error('Error creating post:', errorData);
      }
    } 
    catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div className='form-container-content'> {/* New container for the white box */}
      <form className='create' onSubmit={createNewPost}>
        <input
          className="form-input"
          type="text" // Changed type to 'text'
          placeholder='Title'
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          required
        />
        <input
          className="form-input"
          type="text" // Changed type to 'text'
          placeholder='Summary'
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          required
        />
        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
        />
        <TipTap onContentChange={handleContentChange} />
        <div className='post-done'>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
