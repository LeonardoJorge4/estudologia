import { render, screen } from '@testing-library/react';
import Home from '@src/pages/index';

describe('Home page', () => {
  it('should be rendered correctly', () => {
    render(<Home />);

    expect(
      screen.getByText('Mostrar apenas questões não respondidas')
    ).toBeInTheDocument();
  });
});
