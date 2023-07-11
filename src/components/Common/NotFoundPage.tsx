import React from 'react';
import dogImage from '../../assets/img/logo/404dog.jpeg';
import { NavLink } from "react-router-dom";


const NotFoundPage: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-50">
      <img src={dogImage} alt="dogImage" className="w-screen h-screen object-cover blur-sm" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-6xl font-bold text-color4">404</h1>
        <p className="text-2xl text-color4">Page Not Found</p>
        <p className='text-xl text-color1'>
          <NavLink to="/"> Click here to go to Login Page</NavLink>
        </p>
      </div>
    </div>




  );
};

export default NotFoundPage;
