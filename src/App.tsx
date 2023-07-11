import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import Favorites from './components/Favorite/Favorites';
import Authentication from './components/Auth/Authentication';
import Home from './components/Home/Home';
import NotFoundPage from './components/Common/Welcome';
import { AgeMinContext, AgeMaxContext, BreedsContext, FavDogsContext, UserNameContext } from './Context';
import Welcome from './components/Common/Welcome';

const App: React.FC = () => {
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(100);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [favDogs, setFavDogs] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("Guest");

  return (

    <AgeMinContext.Provider value={[ageMin, setAgeMin]}>
      <AgeMaxContext.Provider value={[ageMax, setAgeMax]}>
        <BreedsContext.Provider value={[breeds, setBreeds]}>
          <FavDogsContext.Provider value={[favDogs, setFavDogs]}>
            <UserNameContext.Provider value={[userName, setUserName]}>

              <Header />
              <Routes>
                <Route path="/pawfetchMatch" element={<Welcome />} />
                <Route path="/login" element={<Authentication />} />
                <Route path="/home" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </UserNameContext.Provider>
          </FavDogsContext.Provider>
        </BreedsContext.Provider>
      </AgeMaxContext.Provider>
    </AgeMinContext.Provider>

  );
};

export default App;
