import { useEffect, useState } from 'react';

function useLoadMore({ element }) {
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        const ref = element.current;
        function handleScroll({ target: { scrollTop, scrollHeight, clientHeight } }) {
            setLoadMore((clientHeight + scrollTop + 200) >= scrollHeight);
        }
        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, [element]);

    return [loadMore];
}

export default useLoadMore;
