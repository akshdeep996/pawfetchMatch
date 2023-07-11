import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/Common/Header', () => () => <div>Header Component</div>);
jest.mock('./components/Favorite/Favorites', () => () => <div>Favorites Component</div>);
jest.mock('./components/Auth/Authentication', () => () => <div>Authentication Component</div>);
jest.mock('./components/Home/Home', () => () => <div>Home Component</div>);
jest.mock('./components/Common/NotFoundPage', () => () => <div>NotFoundPage Component</div>);

describe('App', () => {
  test('renders Header component', () => {
    render(
      <BrowserRouter>
                  <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  test('renders Authentication component at the root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Authentication Component')).toBeInTheDocument();
  });

  test('renders Home component at the "/home" route', () => {
    window.history.pushState({}, '', '/home');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  test('renders Favorites component at the "/favorites" route', () => {
    window.history.pushState({}, '', '/favorites');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    
    expect(screen.getByText('Favorites Component')).toBeInTheDocument();
  });

  test('renders NotFoundPage component for unknown routes', () => {
    window.history.pushState({}, '', '/unknown');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    
    expect(screen.getByText('NotFoundPage Component')).toBeInTheDocument();
  });
});
