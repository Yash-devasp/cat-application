import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-111',
  email: 'yash@email.com',
  image: {
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    alt: 'cute cat',
  },
  favoured: false,
};

describe('Card', () => {
  test('should show name of the cat', () => {
    render(<Card {...cardProps} />);
    expect(
      screen.getByRole('heading', {
        name: /sydney/i,
      }),
    ).toBeInTheDocument();
  });

  test('should show phone number of the cat', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/111-111-111/i)).toBeInTheDocument();
  });

  test('should show email of the cat', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/yash@email.com/i)).toBeInTheDocument();
  });

  test('should show image with correct source', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test('should show outlined heart', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  test('should show filled heart', () => {
    render(<Card {...cardProps} favoured={true} />);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test('should toggle heart status', () => {
    render(<Card {...cardProps} />);
    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});
