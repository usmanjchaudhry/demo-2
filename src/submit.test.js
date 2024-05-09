import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('submit a recipe and check its status', () => {
  render(<App />);
  
  // Fill out the recipe submission form
  fireEvent.change(screen.getByPlaceholderText('Recipe Name'), { target: { value: 'Spaghetti Carbonara' } });
  fireEvent.change(screen.getByPlaceholderText('Recipe Type'), { target: { value: 'Main Course' } });
  fireEvent.change(screen.getByPlaceholderText('Recipe Ingredients (comma-separated)'), { target: { value: 'Spaghetti, Eggs, Pancetta, Parmesan Cheese, Black Pepper' } });
  fireEvent.click(screen.getByText('Submit Recipe'));
  
  // Check if the submitted recipe is displayed with status "Pending Approval"
  expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
  expect(screen.getByText('Type: Main Course')).toBeInTheDocument();
  expect(screen.getByText('Ingredients: Spaghetti, Eggs, Pancetta, Parmesan Cheese, Black Pepper')).toBeInTheDocument();
  expect(screen.getByText('Status: Pending Approval')).toBeInTheDocument();
});
