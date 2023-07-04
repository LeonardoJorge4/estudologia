import { render, screen } from '@testing-library/react';
import Questions from '@src/pages/questions/[id]';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { NextRouter } from 'next/router';

export const mockNextRouter = (router: Partial<NextRouter>): NextRouter => ({
  basePath: '',
  pathname: '',
  route: '',
  query: {},
  asPath: '/',
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  forward: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...router,
});

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
