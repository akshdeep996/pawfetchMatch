import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BreedsContext, AgeMinContext, AgeMaxContext } from '../../Context';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Home', () => {
  test('renders the component with dog data', () => {
    const mockBreeds = ['breed1', 'breed2']; // Mock the breeds data
    const mockAgeMin = 0; // Mock the minimum age
    const mockAgeMax = 100; // Mock the maximum age

    render(
        <Router>
      <BreedsContext.Provider value={[mockBreeds, jest.fn()]}>
        <AgeMinContext.Provider value={[mockAgeMin, jest.fn()]}>
          <AgeMaxContext.Provider value={[mockAgeMax, jest.fn()]}>
            <Home />
          </AgeMaxContext.Provider>
        </AgeMinContext.Provider>
      </BreedsContext.Provider>
      </Router>
    );

    const dogDataElements = screen.getAllByText(/paws/i); 
    expect(dogDataElements.length).toBeGreaterThan(0);
  });
});
