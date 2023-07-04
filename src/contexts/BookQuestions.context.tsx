import { BookQuestionsProps } from '@src/@types/bookQuestion';
import { api } from '@src/services/api';
import {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from 'react';

interface BookQuestionsType {
  bookQuestions: BookQuestionsProps[];
}

interface BookQuestionsProviderProps {
  children: ReactNode;
}

export const BookQuestionsContext = createContext({} as BookQuestionsType);

export function BookQuestionsProvider({
  children,
}: BookQuestionsProviderProps) {
  const [bookQuestions, setBookQuestions] = useState<BookQuestionsProps[]>([]);

  const fetchBookQuestions = useCallback(async () => {
    try {
      const response = await api.get('/bookQuestions');

      setBookQuestions(response.data);
    } catch (error) {
      alert('Erro ao buscar cadernos de questões');
    }
  }, []);

  useEffect(() => {
    fetchBookQuestions();
  }, [fetchBookQuestions]);

  return (
    <BookQuestionsContext.Provider value={{ bookQuestions }}>
      {children}
    </BookQuestionsContext.Provider>
  );
}

export function useBookQuestions() {
  return useContext(BookQuestionsContext);
}
