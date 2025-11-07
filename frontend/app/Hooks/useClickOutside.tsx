import { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
  onClickOutside: (event?: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;

      if (elementRef.current && !elementRef.current.contains(clickedElement)) {
        // console.log('click outside!');
        // console.log('close elementRef id:', elementRef.current?.id);
        onClickOutside(event);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
