import { render,screen } from "@testing-library/react";
import NotFound from "../pages/Login/NotFound";


jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));


test("renders Go Back button", () => {
    render(<NotFound />);
    const buttonElement = screen.getByText(/Go Back/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.closest('a')).toHaveAttribute('href', '/login');
    expect(buttonElement).toHaveClass('MuiButton-containedPrimary');
    expect(buttonElement.closest('a')).toHaveAttribute('href', '/login');
  });

