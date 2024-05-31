import React , {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SectionNavigator from '../components/SectionNavigator';
import Filters from '../components/Filters';
import Products from '../components/Products';


const VibePage = () => {

  const [category, setCategory] = useState('All');
  const [filter, setFilter] = useState([]);
  const [productCount, setProductCount] = useState(0);

  const handleCategoryChange = (contentType, name, uniqueId) => {
    if(category === name) return;
    setCategory(name);
    name !== 'All' ? setFilter([{ id: uniqueId, type: contentType }]) : setFilter([]);
  };

  return (
    <>
    <Navbar/>
    <div className='mb-2'>
      <Hero/>
    </div>

    <div className='mx-2'>
      <SectionNavigator/>
    </div>

    <div className='mx-2 my-4'>
      <Filters cat={category} handleCategoryChange={handleCategoryChange} productCount={productCount}/>
    </div>

    <div className='mx-1'>
      <Products filter={filter} setProductCount={setProductCount}/>
    </div>
    </>
  )
}

export default VibePage