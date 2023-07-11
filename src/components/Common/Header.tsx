import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/img/logo/logo_png.png';
import dog from '../../assets/img/logo/dog.png';
import { UserNameContext, AgeMaxContext,AgeMinContext, BreedsContext,FavDogsContext } from '../../Context';
import logout from '../API/AuthAPI/logout';


const Header = () => {
  const blockStyle = 'py-2 px-4 block whitespace-no-wrap hover:bg-color3 hover:text-color1';
  const location = useLocation();
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [userName, setUserName] = useContext(UserNameContext);
  const [, setBreeds] = useContext(BreedsContext);
  const [, setAgeMin] = useContext(AgeMinContext);
  const [, setAgeMax] = useContext(AgeMaxContext);
  const [,setFavDogs] = useContext(FavDogsContext);

  useEffect(() => {
    setIsFavoritesActive(location.pathname === '/favorites');
    setIsLoginActive(location.pathname === '/login');
  }, [location.pathname]);

  
  const handleLogout = async () => {
    try {
      const response = await logout();
      if(response.success){
        setAgeMin(0);
        setAgeMax(100);
        setBreeds([]);
        setFavDogs([]);
        setUserName('');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <div className="relative z-10 flex items-center justify-between bg-color4 shadow-lg">
      <NavLink to="/home">
        <img src={logo} alt="pawFetchMatch" className="h-24 w-auto sm:flex-shrink-0 pl-40" />
      </NavLink>

      <div className={`flex pr-40 ${isLoginActive ? 'hidden' : ''}`}>
        {!isLoginActive && (
          <div className="text-xl py-3 px-2">
            <NavLink to="/favorites">
              <FontAwesomeIcon
                className={`text-5xl ${isFavoritesActive ? 'text-color5' : 'text-color3'} hover:text-color5`}
                icon={faHeart}
              />
            </NavLink>
          </div>
        )}

        {!isLoginActive && (
          <div className="group inline-block relative text-md">
            <button className="font-semibold py-2 px-4 rounded inline-flex items-center">
              <img className="w-14 h-14 object-cover rounded-full" src={dog} alt="Current profile" />
            </button>
            <ul className="absolute rounded hidden group-hover:block bg-color1 text-color4 z-50">
              {location.pathname !== '/home' && (
                <NavLink to="/home">
                  <li className={blockStyle}>Home</li>
                </NavLink>
              )}

              <li className={blockStyle}>{userName}</li>
              <NavLink to="/login" onClick={handleLogout}>
                <li className={blockStyle} >Log out</li>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;