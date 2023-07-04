import { render, screen } from '@testing-library/react';
import Thanks from '@src/pages/thanks';

describe('Thanks page', () => {
  it('should be rendered correctly', () => {
    render(<Thanks answeredQuestions={[]} />);

    expect(screen.getByText('Obrigado por enviar!')).toBeInTheDocument();
  });
});
