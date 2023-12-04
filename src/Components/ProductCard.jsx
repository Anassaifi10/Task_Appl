import React, { useEffect, useState } from 'react';
import { data } from '../Data/dummyData';
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const ProductCard = ({ product}) => {
  const { id, title, price, description, category, image, rating, Total } = product;

  // State to track whether to show full description
  const [showFullDescription, setShowFullDescription] = useState(false);

  // State for the quantity of added items
  const [quantity, setQuantity] = useState(Total);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const addToCart = () => {
    setQuantity(quantity + 1);
  };

  const removeFromCart = () => {
    setQuantity(quantity - 1);
    
  };


  const updateTotal = (id, newTotal) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, Total: newTotal };
      }
      return item;
    });
    Object.assign(data, updatedData);
  };



  useEffect(()=>{
    updateTotal(id,quantity);
  },[quantity]);



  return (
    <div className=" relative max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10 shadow_outer hover:bg-richblack-25 hover:scale-110 transition-all duration-300">
      <img src={image} alt={title} className="w-full h-48 object-contain" style={{ background: 'rgba(255, 255, 255, 0.5)' }}/>
      <div className="py-4 px-6">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {showFullDescription ? description : `${description.substring(0, 100)}...`}
        </p>
        {description.length > 100 && (
          <button
            className="text-blue-500 hover:underline"
            onClick={toggleDescription}
          >
            {showFullDescription ? 'Read Less' : 'Read More'}
          </button>
        )}
        <p className="mt-2 text-sm text-gray-600">{category}</p>
        <p className="mt-2 text-lg text-gray-900">${price}</p>
        <div className="mt-2 flex items-center">
          <p className="text-sm text-gray-700">Rating: {rating.rate}</p>
          <p className="ml-2 text-sm text-gray-700">Count: {rating.count}</p>
        </div>
        <div className="absolute z-10 top-2 right-2">
          {(quantity === 0 && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 flex gap-4 justify-center items-center"
              onClick={addToCart}
            >
           <IoMdAdd/>   Add
            </button>
          )) || (
            
            <div className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 flex gap-5'>
                  <button
                    onClick={removeFromCart}
                    className='border-r border-white pr-2'
                  >
                    <MdDelete />
                  </button>
                  <span className="text-sm text-gray-600 mr-2">{quantity}</span>
                  <button
                    onClick={addToCart}
                    className='border-l border-white pl-2'
                  >
                    <IoMdAdd />
                  </button>
            </div>

    
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
