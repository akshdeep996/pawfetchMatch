import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from './Favorites';
import { FavDogsContext } from '../../Context';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Favorites', () => {
  test('renders the component with "My Favorites" text', () => {
    const mockFavDogs = ['dog1', 'dog2']; 

    render(
        <Router>
      <FavDogsContext.Provider value={[mockFavDogs, jest.fn()]}>
        <Favorites />
      </FavDogsContext.Provider>
      </Router>
    );

    const myFavoritesText = screen.getByText(/My Favorites/i);

    expect(myFavoritesText).toBeInTheDocument();
  });
});
