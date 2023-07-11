import React, { FC, useEffect, useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { DogCard } from '../Common/DogCard';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BreedsContext, AgeMinContext, AgeMaxContext } from '../../Context';

interface Query {
    size: number;
    from: number;
    sort: string;
}

const Home: FC = (fetchData) => {
    const blockStyle = 'py-2 px-4 block whitespace-no-wrap hover:bg-color3 hover:text-color1';
    const navigate = useNavigate();
    const [dogList, setDogList] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [query, setQuery] = useState<Query>({
        size: 25,
        from: 0,
        sort: 'breed:asc',
    });
    const [breeds, setBreeds] = useContext(BreedsContext);
    const [ageMin, setAgeMin] = useContext(AgeMinContext);
    const [ageMax, setAgeMax] = useContext(AgeMaxContext);
    const [applyFilter, setApplyFilter] = useState<boolean>(true);
    const [activePage, setActivePage] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            try {
                let queryParams = `&ageMin=${ageMin}&ageMax=${ageMax}&size=${query.size}&from=${query.from}&sort=${query.sort}`;

                if (breeds.length > 0) {
                    queryParams += `&breeds=${breeds.join('&breeds=')}`;
                }

                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dogs/search?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });


                if (response.ok) {
                    const data = await response.json();
                    setTotal(data.total);
                    await postDogData(data.resultIds);
                } else if (!response.ok) {
                    
                    alert("Please login first and try again");
                    navigate('/login');
                } else {
                    alert("Logging out as data failed to Load. Due to: "+ response.status);
                    console.error('Error Fetching data:', response.status);
                }
            } catch (error) {
                console.log('Not working');
                navigate('/login');
                console.error('Error fetching dog data', error);
            }
        };

        const postDogData = async (resultIds: string[]) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dogs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resultIds),
                    credentials: 'include',
                });

                if (response.ok) {
                    console.log('Dog data posted successfully');
                    const responseData = await response.json();
                    setDogList(responseData);
                } else {
                    alert("Logging out as data failed to Load");
                    navigate('/login');

                    console.error('Error posting dog data:', response.status);
                }
            } catch (error) {

                navigate('/login');
                console.error('Error posting dog data:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applyFilter, query]);

    const handlePageClick = (event: any) => {

        const newOffset = (event.selected * 25);
        setQuery((prevQuery) => ({
            ...prevQuery,
            from: newOffset,
        }));
        setActivePage(event.selected);
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            sort: event.target.value,
        }));
    };

    const handleApplyFilter = () => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            size: 25,
            from: 0
        }));
        setApplyFilter(!applyFilter);
    };

    const handleResetFilter = () => {
        setBreeds([]);
        setAgeMax(100);
        setAgeMin(0);
        setActivePage(0);
        setApplyFilter(!applyFilter);
    }
    return (
        <div className="flex ml-40 mr-40 mt-20 mb-20 bg-color4">
            <div className="border-solid rounded-lg bg-color4 w-1/4">
                <Filter />
                <div className="mt-6 ml-4 mr-4 flex justify-center">
                    <button
                        className="p-3 text-md rounded-md text-color4 bg-color2 hover:text-color2 hover:bg-color3"
                        onClick={handleApplyFilter}
                    >
                        Apply Filters
                    </button>
                    <button
                        className="ml-2 p-3 text-md rounded-md text-color4 bg-color2 hover:text-color2 hover:bg-color3"
                        onClick={handleResetFilter}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="w-3/4 ml-2">
                <div className="border-solid rounded-lg bg-color4 h-20">
                    <div className="w-full flex flex-wrap">
                        <div className="w-3/4">

                            <div className="relative">
                                <div className="text-3xl m-8 text-color5font-semibold">We found {total} paws <FontAwesomeIcon icon={faPaw} /> for you:</div>
                            </div>
                        </div>
                        <div className="w-1/4 z-20">
                            <div className="flex mt-8">
                                <div className="group inline-block relative bg-color1">
                                    <button className="py-2 px-4 ml-2 rounded text-color4 text-left items-center flex">
                                        <select
                                            className="rounded group-hover:block bg-color1 text-color4 mt-0.5"
                                            value={query.sort}
                                            onChange={handleDropdownChange}
                                        >
                                            <option className={blockStyle} value="breed:asc">
                                                Breed (a-z)
                                            </option>
                                            <option className={blockStyle} value="breed:desc">
                                                Breed (z-a)
                                            </option>
                                            <option className={blockStyle} value="name:asc">
                                                Name (a-z)
                                            </option>
                                            <option className={blockStyle} value="name:desc">
                                                Name (z-a)
                                            </option>
                                            <option className={blockStyle} value="age:asc">
                                                Age (0-100)
                                            </option>
                                            <option className={blockStyle} value="age:desc">
                                                Age (100-0)
                                            </option>
                                        </select>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DogCard dogList={dogList} />

                {dogList.length ? (
                    <ReactPaginate
                        initialPage={activePage}
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(total / 25)}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="flex items-center justify-center m-4 p-4"
                        pageClassName="px-4 py-2 border-solid bg-color1 text-color4 hover:bg-color3 hover:text-color2"
                        activeClassName="font-bold text-color5 bg-color4"
                        disabledClassName="cursor-not-allowed bg-color6"
                        previousClassName="rounded-l-md px-4 py-2 border-solid bg-color5 text-color4 hover:bg-color3 hover:text-color2"
                        nextClassName="rounded-r-md px-4 py-2 border-solid bg-color5 text-color4 hover:bg-color3 hover:text-color2"
                        breakClassName="px-4 py-2 bg-color1 text-color4 hover:bg-color3 hover:text-color2"
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Home;