import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { BookQuestionsProvider } from '@src/contexts/BookQuestions.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BookQuestionsProvider>
      <Header />
      <Component {...pageProps} />
    </BookQuestionsProvider>
  );
}
