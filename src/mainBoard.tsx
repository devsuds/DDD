import { useEditor } from 'tldraw';
import { useEffect } from 'react';

/*
By default the editor will "steal" focus from the sandbox's text editor
whenever it reloads. We've turned that off with autoFocus={false}... but have 
also included this little extra component to focus the editor again when  
the user clicks on it. 
*/

export function MainBoard() {
  const editor = useEditor();

  useEffect(() => {
    const container = editor.getContainer();
    const focusOnPointerDown = () => editor.focus();
    container.addEventListener('pointerdown', focusOnPointerDown);
    return () => {
      container.removeEventListener('pointerdown', focusOnPointerDown);
    };
  }, [editor]);

  return null;
}
