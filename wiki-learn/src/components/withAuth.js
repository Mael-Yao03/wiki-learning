import { useRouter } from 'next/router';
import { useEffect } from 'react';
 
const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
 
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/signin');
        }
      }
    }, [router]);
 
    // return <WrappedComponent {...props} />;
  };
};
 
export default withAuth;