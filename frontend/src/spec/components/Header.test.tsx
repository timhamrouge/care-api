import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe("Header", () => {
  test('renders a birdie logo image', () => {
    render(<Header />);
    const image = screen.getByAltText(/birdie-logo/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://assets-global.website-files.com/5d80c03f1edd7bd68fcdb623/633ead0f172e7255f4ce0395_logo-white.svg")
  });

  test('renders a link that naviagtes to "/"', () => {
    render(<Header />);
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "/")
  });
});
