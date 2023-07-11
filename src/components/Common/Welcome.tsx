import React from 'react';
import dogImage from '../../assets/img/logo/404dog.jpeg';
import { NavLink } from "react-router-dom";


const Welcome: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-50">
      <img src={dogImage} alt="dogImage" className="w-screen h-screen object-cover blur-md" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-6xl font-bold text-color4">Welcome to PawfetchMatch</h1>
        <p className="text-xl text-color4">Where dogs find their homes</p>
        <h2 className='text-2xl text-color1 text-semibold'>
          <NavLink to="/login"> Please Click here to go to Login Page</NavLink>
        </h2>
      </div>
    </div>




  );
};

export default Welcome;
