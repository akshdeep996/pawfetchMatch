import React, { useContext, useEffect, useState } from 'react';
import { DogCard } from '../Common/DogCard';
import { FavDogsContext } from '../../Context';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [favDogs] = useContext(FavDogsContext);
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dogs/match`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favDogs),
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          await fetchMatchDogData([data.match]);
        } else {
          console.error('Error fetching match data');
        }
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    const fetchMatchDogData = async (matchDogIds: string[]) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(matchDogIds),
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setDogList(data);
        } else {
          console.error('Error fetching match dog data');
        }
      } catch (error) {
        console.error('Error fetching match dog data:', error);
      }
    };

    if (isOpen && favDogs.length > 0) {
      fetchData();
    }
  }, [isOpen, favDogs]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-10 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="bg-color4 rounded-lg">
        <div className="flex justify-between">
          <div className="text-center ml-24 mt-4 text-3xl text-color3">Match</div>
          <div className="ml-auto">
            <button className="text-2xl text-color2 mr-2" onClick={onClose}>
              x
            </button>
          </div>
        </div>
        <DogCard dogList={dogList} />
        <div className="flex items-center justify-center mb-8">
          <button className="rounded p-2 text-color4 bg-color5" onClick={onClose}>
            Start Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};
