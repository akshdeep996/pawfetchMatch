import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

import { FavDogsContext } from '../../Context';

interface Dog {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

interface DogCardProps {
  dogList: Dog[];
}

export const DogCard: React.FC<DogCardProps> = ({ dogList }) => {
  const [favDogs, setFavDogs] = useContext(FavDogsContext);
  const isFavorite = (dogId: string) => favDogs.includes(dogId);

  const handleFavClick = (dog: string) => {
    const newdogs = [...favDogs];
    const index = newdogs.indexOf(dog);

    if (index !== -1) {
      newdogs.splice(index, 1);
    } else {
      newdogs.push(dog);
    }
    setFavDogs(newdogs);
  };

  return (
    <div className="border-solid flex flex-wrap justify-between px-4 py-2 z-1">
      {dogList.map((dog: Dog) => (
        <div className="relative rounded overflow-hidden shadow-xl m-4 mb-6 flex flex-col transition-transform duration-300 transform-gpu hover:scale-105" key={dog.id}>
          <img className="h-44 w-56" src={dog.img} alt={dog.name} />
          <FontAwesomeIcon
            className="absolute top-2 right-2 h-7 bg-color4 rounded-full p-2 text-color5 hover:text-color3"
            icon={isFavorite(dog.id) ? faSolidHeart : faRegularHeart}
            onClick={() => handleFavClick(dog.id)}
          />
          <div className="text-center min-w-full mt-5 mb-5 whitespace-normal break-words">
            <div className="text-color2 font-bold text-xl mb-2">{dog.name}</div>
            <p className="text-color5 font-semibold">{dog.breed}</p>
            <p className="text-color5 font-semibold">{dog.age} yrs</p>
            <p className="text-color1 text-base">{dog.zip_code}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
