import { useEffect } from 'react';

function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback('outside');
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        callback('escape');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, callback]);
}

export default useClickOutside;
