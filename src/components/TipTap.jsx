
import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'


import './TipTap.css'

const extensions = [
    StarterKit,
    Underline,
]
const content =    ``;

const TipTap = ({onContentChange}) => {
  const editor = useEditor({
    extensions,
    content,
  })

  if (!editor) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (editor) {
      const updateContent = () => {
        const html = editor.getHTML();
        onContentChange(html);
      };

      editor.on('update', updateContent);

      return () => {
        editor.off('update', updateContent);
      };
    }
  }, [editor, onContentChange]);
  
  return (
    <div className="control-group">
      <div className="button-group">
        <button type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}>
          Bold
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={editor.isActive('Underline') ? 'is-active' : ''}
        >
          Underline
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          H5
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          H6
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </button>
      </div>
      <EditorContent className='editor' editor={editor}/>
    </div>
  )
}

export default TipTap;