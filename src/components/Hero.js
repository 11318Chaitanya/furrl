import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = 'https://api.furrl.in/api/v2/listing/getVibeByName';
    const payload = {
      name: '#HomeHunts',
    };
  
    try {
      const response = await axios.post(url, payload);
      setData(response.data.data.getVibeByName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mb-2">
      <div>
        {data && (
            <section>
              <div className='relative'>
                  <div className='w-full h-[36vh] overflow-hidden'>
                    <img className='object-fit w-full' src={data.imageUrl} alt="" />
              </div>
                <div className='absolute bottom-0 flex items-center justify-center w-full py-4' style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 16.36%, rgb(38, 38, 30) 242.73%)'
                }}>
                  <p className='w-full text-center text-white text-3xl italic'>{data.name}</p>
                </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Hero;
