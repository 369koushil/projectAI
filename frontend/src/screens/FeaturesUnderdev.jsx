import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturesUnderdev = () => {
  const [time, setTime] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          
          navigate('/');
          clearInterval(intervalId); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

  
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className='flex h-screen justify-center gap-4 p-6 flex-col bg-primary'>
      <h1 className='font-mono text-3xl text-white flex items-center bg-primary'>
        Still developing this feature......
      </h1>
      <h2 className='font-mono text-white text-lg'>{`You will be redirected to home in ${time} seconds`}</h2>
    </div>
  );
};

export default FeaturesUnderdev;
