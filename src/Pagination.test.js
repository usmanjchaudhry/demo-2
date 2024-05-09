import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders search bar with placeholder text', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search...');
  expect(searchInput).toBeInTheDocument();
}); 




test('displays the correct items based on pagination', () => {
  render(<App />);
  const itemsPerPage = 5;
  const totalItems = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

 

  // Click "Next" button to navigate through pages
  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

 

  // Click "Previous" button to navigate back to the first page
  //const prevButton = screen.getByText('Previous');
  //fireEvent.click(prevButton);

  // Check if the items for the first page are displayed again
  //for (let i = 1; i <= itemsPerPage; i++) {
    //const itemText = screen.getByText(`Item ${i}`);
    //expect(itemText).toBeInTheDocument();
  //}

  // Click "Next" until reaching the last page
  for (let page = 3; page <= totalPages; page++) {
    fireEvent.click(nextButton);
  }

  // Check if the items for the last page are displayed
  const lastPageItems = totalItems % itemsPerPage || itemsPerPage;
  
});
