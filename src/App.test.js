import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is React Testing Tutorial/i);
  expect(linkElement).toBeInTheDocument();
});

test("render login component in document", () => {
  // const component = render(<App />);
  const { getByLabelText} = render(<App/>);
  // const childElement = component.getByLabelText("Email");
  const childElement = getByLabelText("Email")
  expect(childElement).toBeTruthy();
})
