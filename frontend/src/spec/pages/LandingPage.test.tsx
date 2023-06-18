import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';

import useFetchCareRecipients from '../../hooks/useFetchCareRecipients';

jest.mock("../../hooks/useFetchCareRecipients");

describe("LandingPage", () => {
  beforeEach(() => {
    useFetchCareRecipients.mockReturnValue({
      loading: false,
      careRecipients: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" }
      ]
    })
  });

  test('renders a header', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
      );
    const title = screen.getByText(/Welcome to the birde care observations portal!/i);
    expect(title).toBeInTheDocument();
  });


});