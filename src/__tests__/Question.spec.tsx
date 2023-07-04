import { render, screen } from '@testing-library/react';
import Questions from '@src/pages/questions/[id]';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { NextRouter } from 'next/router';
import { mockNextRouter } from '@src/utils/mockNextRouter';

describe('Question page', () => {
  it('should be rendered correctly', () => {
    const router = mockNextRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Questions />
      </RouterContext.Provider>
    );

    expect(screen.getByText('Enviar resposta')).toBeInTheDocument();
  });
});
