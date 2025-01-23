import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useBackDetection = () => {
    const currentPathRef = useRef(window.location.pathname);
 const [searchParams] = useSearchParams();
 const navigate = useNavigate();
    const lobby = searchParams.get('lobby');

    useEffect(() => {
        const handlePopState = () => {
            const previousPath = currentPathRef.current;
            const currentPath = window.location.pathname;
        console.log('currentPath', currentPath, lobby);

            if (currentPath !== previousPath && lobby) {
                console.log('Back button pressed');
                navigate(`/lobby/${lobby}`);
            }

            currentPathRef.current = currentPath;
          
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);
};

export default useBackDetection;