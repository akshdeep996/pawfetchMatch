import React, { useState, useContext, useEffect } from 'react';
import { DogCard } from '../Common/DogCard';
import { MatchModal } from './MatchModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavDogsContext } from '../../Context';
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [favDogs, ] = useContext(FavDogsContext);
  const [dogList, setDogList] = useState([]);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);

  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const FavData = async (favDogs: string[]) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(favDogs),
          credentials: "include",
        });

        if (response.ok) {
          const responseFavData = await response.json();
          console.log(responseFavData);
          setDogList(responseFavData);
        }
        else {
          navigate('/');
          console.error("Error fetching Fav data")
        }
      } catch (error) {
        navigate('/');
        console.error('Error posting dog Fav data:', error);
      }
    }
    FavData(favDogs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favDogs]);

  return (
    <>
      <div className="ml-36 mr-36 mt-14">
        <div className='relative flex flex-wrap justify-between pt-4'>
          <div className='items-start pl-8 text-4xl font-bold text-color1'>

            My Favorites {" "}
            <FontAwesomeIcon className="text-color5" icon={faHeart} /> {favDogs.length}
          </div>



        </div>
        <div className={`${modalOpen ? "blur-lg" : ""}`}>
          <DogCard dogList={dogList} />
        </div>
        {
          favDogs.length > 0 ? <div className="text-lg font-bold flex items-center justify-center m-8">
            <button
              className={`${modalOpen ? "blur-lg" : ""} p-2 mr-4 text-lg text-color4 bg-color1 hover:text-color1 hover:bg-color3 rounded`}
              onClick={handleOpenModal}
            >
              Generate a Match
            </button>
            <MatchModal isOpen={modalOpen} onClose={handleCloseModal} />
          </div> : ""
        }


      </div>
    </>
  );
};

export default Favorites;
