import React, { useState } from 'react';
import { data } from '../Data/dummyData';
import ProductCard from './ProductCard';

const Home = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className=' flex flex-col justify-center items-center'>
    <div className="m-auto lg:w-8/12 flex flex-wrap justify-center">
      {currentItems.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    
    </div>
    <div className="flex mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-3 py-1 rounded-md ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
