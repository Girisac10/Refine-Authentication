import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Sample from '../pages/Login/Sample';

test('renders the app component', () => {
  render(<Sample />);
  const linkElement = screen.getByText(/hello world/i); 
  expect(linkElement).toBeInTheDocument();
});