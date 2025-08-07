// 📁 src/AntiCheat.js
import { useEffect } from 'react';

const AntiCheat = () => {
  useEffect(() => {
    const blockShortcuts = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
        (e.ctrlKey && ['u', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    const blockContext = (e) => e.preventDefault();

    window.addEventListener('keydown', blockShortcuts);
    window.addEventListener('contextmenu', blockContext);

    return () => {
      window.removeEventListener('keydown', blockShortcuts);
      window.removeEventListener('contextmenu', blockContext);
    };
  }, []);

  return null;
};

export default AntiCheat;
