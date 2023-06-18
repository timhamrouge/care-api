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

  test('renders a blurb', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
      );
    const blurb = screen.getByText(/Stay connected with your elderly relative/i);
    expect(blurb).toBeInTheDocument();
  });

  test('renders a select with care recipients', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
      );
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    select.click();

    const john = screen.getByText(/John/i);
    const jane = screen.getByText(/Jane/i);
    expect(john).toBeInTheDocument();
    expect(jane).toBeInTheDocument();
  });
});