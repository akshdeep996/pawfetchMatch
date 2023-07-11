import React, { useEffect, useState, useContext } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import {AgeMinContext, AgeMaxContext } from "../../Context";


const Filter = () => {
  const [breedOptions, setBreedOptions] = useState([]);
  const [ageMin,setAgeMin] = useContext(AgeMinContext);
  const [ageMax,setAgeMax] = useContext(AgeMaxContext);


  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds',{credentials: 'include',});
        if (response.ok) {
          const data = await response.json();
          const formattedOptions = data.map((breed: string) => ({
            value: breed,
            label: breed,
          }));
          setBreedOptions(formattedOptions);
        } else {
          console.error('Error fetching breed data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold text-color1 flex justify-center mt-4 mb-4">
          Filters
        </div>
        <div className="ml-4 mr-4">
          <div className="text-lg text-color2 font-semibold">Breed</div>
          <MultiSelectDropdown
            options={breedOptions}
            
          />
        </div>
      
        <div className="m-4">
          <div className="text-lg text-color2 font-semibold">Min Age:</div>
          <input
            className="w-full p-2 placeholder-italic placeholder-slate-400 block bg-color4 border border-slate-300 rounded-md shadow-sm focus:outline-none ring-color2 focus:border-color2 focus:ring-color2 focus:ring-1 md:text-md"
            placeholder="Min Age"
            type="number"
            name="minAge"
            value={ageMin}
            onChange={(e) => setAgeMin(parseInt(e.target.value))}
          />
        </div>
        <div className="m-4">
          <div className="text-lg text-color2 font-semibold">Max Age:</div>
          <input
            className="w-full p-2 placeholder-italic placeholder-slate-400 block bg-color4 border border-slate-300 rounded-md shadow-sm focus:outline-none ring-color2 focus:border-color2 focus:ring-color2 focus:ring-1 md:text-md"
            placeholder="Max Age"
            type="number"
            name="maxAge"
            value={ageMax}
            onChange={(e) => setAgeMax(parseInt(e.target.value))}
          />
        </div>
       
      </div>
    </div>
  );
};

export default Filter;
