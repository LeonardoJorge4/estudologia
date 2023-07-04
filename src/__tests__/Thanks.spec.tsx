import { render, screen } from '@testing-library/react';
import Thanks from '@src/pages/thanks';
import { mockNextRouter } from '@src/utils/mockNextRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Thanks page', () => {
  it('should be rendered correctly', () => {
    const router = mockNextRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Thanks answeredQuestions={[]} />
      </RouterContext.Provider>
    );

    expect(screen.getByText('Obrigado por enviar!')).toBeInTheDocument();
  });
});
