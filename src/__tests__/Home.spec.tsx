import { render, screen } from '@testing-library/react';
import Home from '@src/pages/index';
import { BookQuestionsProvider } from '@src/contexts/BookQuestions.context';

describe('Home page', () => {
  it('should be rendered correctly', () => {
    render(
      <BookQuestionsProvider>
        <Home />
      </BookQuestionsProvider>
    );

    expect(
      screen.getByText('Mostrar apenas questões não respondidas')
    ).toBeInTheDocument();
  });
});
